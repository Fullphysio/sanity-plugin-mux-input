import {TranslateIcon} from '@sanity/icons/Translate'
import {UploadIcon} from '@sanity/icons/Upload'
import {Button, Card, Dialog, Flex, Label, Spinner, Stack, Text, TextInput} from '@sanity/ui'
import {Autocomplete} from '@sanity/ui/autocomplete'
import {useToast} from '@sanity/ui/toast'
import LanguagesList from 'iso-639-1'
import {useEffect, useId, useRef, useState} from 'react'

import {addAudioTrackFromUrl, deleteAudioTrack, getAsset} from '../actions/assets'
import {useClient} from '../hooks/useClient'
import {pollAudioTrackStatus} from '../util/audioTracks'
import {extractErrorMessage} from '../util/textTracks'
import type {MuxAudioTrack, VideoAssetDocument} from '../util/types'
import {AUDIO_FILE_ACCEPT} from './AddAudioTrackDialog'

const LANGUAGE_OPTIONS = LanguagesList.getAllCodes().map((code) => ({
  value: code,
  label: LanguagesList.getNativeName(code),
}))

export interface Props {
  asset: VideoAssetDocument
  track: MuxAudioTrack
  /** Ids of the audio tracks already on the asset, so the replacement can be told apart */
  knownTrackIds?: string[]
  onUpdate: (track: MuxAudioTrack, oldTrackId?: string) => void
  onClose: () => void
}

export default function EditAudioTrackDialog({
  asset,
  track,
  knownTrackIds = [],
  onUpdate,
  onClose,
}: Props) {
  const client = useClient()
  const toast = useToast()
  const dialogId = `EditAudioTrackDialog${useId()}`

  const [audioUrl, setAudioUrl] = useState('')
  const [languageCode, setLanguageCode] = useState(track.language_code || '')
  const [selectedLanguage, setSelectedLanguage] = useState<{value: string; label: string} | null>(
    () => {
      const baseCode = track.language_code?.split('-')[0]
      const found = LANGUAGE_OPTIONS.find(
        (opt) => opt.value === track.language_code || opt.value === baseCode
      )
      if (found) return found
      if (track.name) {
        const foundByName = LANGUAGE_OPTIONS.find((opt) => opt.label === track.name)
        if (foundByName) return foundByName
      }
      return null
    }
  )
  const [name, setName] = useState(track.name || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLanguageCode(track.language_code || '')
    setName(track.name || '')
    setAudioUrl('')
    const baseCode = track.language_code?.split('-')[0]
    const foundByCode = LANGUAGE_OPTIONS.find(
      (opt) => opt.value === track.language_code || opt.value === baseCode
    )
    const foundByName = track.name ? LANGUAGE_OPTIONS.find((opt) => opt.label === track.name) : null
    setSelectedLanguage(foundByCode || foundByName || null)
  }, [track, asset, client])

  const uploadAudioFile = async (file: File): Promise<string> => {
    const assetDocument = await client.assets.upload('file', file, {
      filename: file.name,
    })
    return assetDocument.url
  }

  const refreshAssetData = async () => {
    if (!asset._id || !asset.assetId) return
    try {
      const latestAssetData = await getAsset(client, asset.assetId)
      await client
        .patch(asset._id)
        .set({data: latestAssetData.data, status: latestAssetData.data.status})
        .commit()
    } catch (refreshError) {
      console.error('Failed to refresh asset data:', refreshError)
    }
  }

  const handleUpdateTrackWithNewUrl = async () => {
    if (!asset.assetId) {
      throw new Error('Asset ID is required')
    }

    const trimmedName = name.trim()
    const trimmedLanguageCode = languageCode.trim()

    const oldTrackId = track.id

    try {
      await deleteAudioTrack(client, asset.assetId, oldTrackId)
    } catch (deleteError) {
      toast.push({
        title: 'Failed to delete old track',
        status: 'error',
        description: 'Could not delete the old track. Please try again or delete it manually.',
      })
      setIsSubmitting(false)
      throw deleteError
    }

    let audioUrlToUse = audioUrl.trim()

    if (selectedFile) {
      try {
        audioUrlToUse = await uploadAudioFile(selectedFile)
      } catch (uploadError) {
        toast.push({
          title: 'Failed to upload audio file',
          status: 'error',
          description: 'Could not upload the audio file to Sanity. Please try again.',
        })
        setIsSubmitting(false)
        throw uploadError
      }
    }

    try {
      await addAudioTrackFromUrl(client, asset.assetId, audioUrlToUse, {
        language_code: trimmedLanguageCode,
        name: trimmedName,
      })
    } catch (error: unknown) {
      toast.push({
        title: 'Failed to update audio track',
        status: 'error',
        description: extractErrorMessage(error, 'Failed to update audio track'),
      })
      setIsSubmitting(false)
      throw error
    }

    const result = await pollAudioTrackStatus({
      client,
      assetId: asset.assetId,
      trackName: trimmedName,
      trackLanguageCode: trimmedLanguageCode,
      knownTrackIds: knownTrackIds.filter((id) => id !== oldTrackId),
      onTrackErrored: async (erroredTrack) => {
        const errorMessage =
          erroredTrack.error?.messages?.[0] ||
          erroredTrack.error?.type ||
          'The track failed to download from the provided URL'
        toast.push({
          title: 'Audio track failed',
          status: 'error',
          description: errorMessage,
        })
        await refreshAssetData()
        onUpdate(erroredTrack, oldTrackId)
        setIsSubmitting(false)
      },
    })

    if (!result.found || !result.track) {
      toast.push({
        title: 'Audio track may have been updated',
        status: 'warning',
        description:
          'The track was updated but its status could not be determined. It may still be processing. Please refresh the page to see if it appears.',
      })
      setIsSubmitting(false)
      return
    }

    if (result.status === 'errored') {
      return
    }

    await refreshAssetData()

    if (result.status === 'preparing') {
      toast.push({
        title: 'Audio track is processing',
        status: 'info',
        description:
          'The track was updated and is being processed. It will appear in the list shortly.',
      })
    } else {
      toast.push({
        title: 'Audio track updated',
        status: 'success',
        description: 'Audio track updated successfully',
      })
    }

    onUpdate(result.track, oldTrackId)
    setIsSubmitting(false)
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.push({
        title: 'Track name required',
        status: 'error',
        description: 'Please enter a name for this audio track',
      })
      return
    }

    if (!languageCode.trim()) {
      toast.push({
        title: 'Language code required',
        status: 'error',
        description: 'Please enter a language code (e.g., en, es, fr)',
      })
      return
    }

    setIsSubmitting(true)

    try {
      if (!asset.assetId) {
        throw new Error('Asset ID is required')
      }

      if (!selectedFile && !audioUrl.trim()) {
        toast.push({
          title: 'No changes',
          status: 'info',
          description:
            'Please provide a new audio file or URL using the "Replace" button or URL field to update the track.',
        })
        setIsSubmitting(false)
        return
      }

      if (!selectedFile && audioUrl.trim()) {
        try {
          void new URL(audioUrl.trim())
        } catch {
          toast.push({
            title: 'Invalid URL',
            status: 'error',
            description: 'Please enter a valid URL (e.g., https://example.com/audio.m4a)',
          })
          setIsSubmitting(false)
          return
        }
      }

      await handleUpdateTrackWithNewUrl()

      onClose()
    } catch (error) {
      toast.push({
        title: 'Failed to update audio track',
        status: 'error',
        description: error instanceof Error ? error.message : 'Please try again',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      id={dialogId}
      header="Edit Audio Track"
      onClose={onClose}
      width={1}
      onClickOutside={onClose}
    >
      <Stack padding={4} gap={4}>
        <Stack gap={2}>
          <Card padding={3} marginBottom={2} tone="transparent" border radius={2}>
            <Flex align="center" justify="space-between">
              <Text>{track.name || track.language_code || 'Untitled audio track'}</Text>
              <Button
                icon={UploadIcon}
                text="Replace"
                mode="ghost"
                tone="primary"
                fontSize={1}
                padding={2}
                onClick={() => fileInputRef.current?.click()}
                disabled={isSubmitting}
              />
            </Flex>
            <input
              ref={fileInputRef}
              type="file"
              accept={AUDIO_FILE_ACCEPT}
              style={{display: 'none'}}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0 && !isSubmitting) {
                  setSelectedFile(e.target.files[0] ?? null)
                  setAudioUrl('')
                }
              }}
            />
            {selectedFile && (
              <Text size={1} muted style={{marginTop: 8}}>
                Selected: {selectedFile.name}
              </Text>
            )}
          </Card>
          <Stack gap={2}>
            <Label as="label" htmlFor="audio-url">Audio File URL</Label>
            <TextInput
              id="audio-url"
              placeholder="https://example.com/audio.m4a"
              value={audioUrl}
              onChange={(e) => {
                setAudioUrl(e.currentTarget.value)
                setSelectedFile(null)
              }}
              disabled={isSubmitting}
            />
            <Text size={1} muted>
              Mux can&apos;t change an existing track, so the track is replaced with a new audio
              file
            </Text>
          </Stack>
        </Stack>

        <Stack gap={2}>
          <Label as="label" htmlFor="audio-name">Track name</Label>
          <Autocomplete
            id="audio-name"
            value={selectedLanguage?.value || ''}
            onChange={(newValue) => {
              const selected = LANGUAGE_OPTIONS.find((opt) => opt.value === newValue)
              if (selected) {
                setSelectedLanguage(selected)
                setLanguageCode(selected.value)
                setName(selected.label)
              }
            }}
            options={LANGUAGE_OPTIONS}
            icon={TranslateIcon}
            placeholder="Select language"
            filterOption={(query, option) =>
              option.label.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
              option.value.toLowerCase().indexOf(query.toLowerCase()) > -1
            }
            openButton
            renderValue={(value) => LANGUAGE_OPTIONS.find((l) => l.value === value)?.label || value}
            renderOption={(option) => (
              <Card data-as="button" padding={3} radius={2} tone="inherit">
                <Text size={2} textOverflow="ellipsis">
                  {option.label} ({option.value})
                </Text>
              </Card>
            )}
            disabled={isSubmitting}
          />
        </Stack>

        <Stack gap={2}>
          <Label as="label" htmlFor="audio-language">Language Code</Label>
          <TextInput
            id="audio-language"
            placeholder="en-US"
            value={languageCode}
            onChange={(e) => {
              setLanguageCode(e.currentTarget.value)
              if (selectedLanguage && selectedLanguage.value !== e.currentTarget.value) {
                setSelectedLanguage(null)
                if (!name || name === selectedLanguage.label) {
                  setName('')
                }
              }
            }}
            disabled={isSubmitting}
          />
        </Stack>

        <Flex gap={2} justify="flex-end" marginTop={2}>
          <Button text="Cancel" mode="ghost" onClick={onClose} disabled={isSubmitting} />
          <Button
            text="Update Audio Track"
            tone="primary"
            icon={
              isSubmitting ? (
                <Spinner
                  style={{
                    verticalAlign: 'middle',
                    display: 'inline-block',
                    marginBottom: '-3px',
                    width: '1em',
                    height: '1em',
                    marginRight: '-6px',
                  }}
                />
              ) : (
                UploadIcon
              )
            }
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
        </Flex>
      </Stack>
    </Dialog>
  )
}
