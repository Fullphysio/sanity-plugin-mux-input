import {TranslateIcon, UploadIcon} from '@sanity/icons'
import {
  Autocomplete,
  Button,
  Card,
  Dialog,
  Flex,
  Label,
  Spinner,
  Stack,
  Text,
  TextInput,
  useToast,
} from '@sanity/ui'
import LanguagesList from 'iso-639-1'
import {useId, useRef, useState} from 'react'

import {addAudioTrackFromUrl} from '../actions/assets'
import {useClient} from '../hooks/useClient'
import {pollAudioTrackStatus} from '../util/audioTracks'
import {extractErrorMessage} from '../util/textTracks'
import type {MuxAudioTrack, VideoAssetDocument} from '../util/types'

const LANGUAGE_OPTIONS = LanguagesList.getAllCodes().map((code) => ({
  value: code,
  label: LanguagesList.getNativeName(code),
}))

export const AUDIO_FILE_ACCEPT = '.m4a,.mp3,.wav,.aac,.flac,.ogg,audio/*'

export interface Props {
  asset: VideoAssetDocument
  /** Ids of the audio tracks already on the asset, so the new one can be told apart */
  knownTrackIds?: string[]
  onAdd: (track: MuxAudioTrack) => void
  onClose: () => void
}

export default function AddAudioTrackDialog({asset, knownTrackIds = [], onAdd, onClose}: Props) {
  const client = useClient()
  const toast = useToast()
  const dialogId = `AddAudioTrackDialog${useId()}`

  const [audioUrl, setAudioUrl] = useState('')
  const [languageCode, setLanguageCode] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<{value: string; label: string} | null>(
    null
  )
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadAudioFile = async (file: File): Promise<string> => {
    const assetDocument = await client.assets.upload('file', file, {
      filename: file.name,
    })
    return assetDocument.url
  }

  const handleAddTrackFromUrl = async () => {
    if (!asset.assetId) {
      throw new Error('Asset ID is required')
    }

    const trimmedName = name.trim()
    const trimmedLanguageCode = languageCode.trim()

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

    await addAudioTrackFromUrl(client, asset.assetId, audioUrlToUse, {
      language_code: trimmedLanguageCode,
      name: trimmedName,
    })

    const result = await pollAudioTrackStatus({
      client,
      assetId: asset.assetId,
      trackName: trimmedName,
      trackLanguageCode: trimmedLanguageCode,
      knownTrackIds,
      onTrackErrored: (track) => {
        const errorMessage =
          track.error?.messages?.[0] ||
          track.error?.type ||
          'The track failed to download from the provided URL'
        toast.push({
          title: 'Audio track failed',
          status: 'error',
          description: errorMessage,
        })
        onAdd(track)
        onClose()
      },
    })

    if (!result.found || !result.track) {
      toast.push({
        title: 'Audio track may have been added',
        status: 'warning',
        description:
          'The track was created but its status could not be determined. It may still be processing. Please refresh the page to see if it appears.',
      })
      onClose()
      return
    }

    if (result.status === 'errored') {
      return
    }

    if (result.status === 'preparing') {
      toast.push({
        title: 'Audio track is processing',
        status: 'info',
        description:
          'The track was created and is being processed. It will appear in the list shortly.',
      })
      onAdd(result.track)
      onClose()
      return
    }

    toast.push({
      title: 'Audio track added',
      status: 'success',
      description: 'Audio track added successfully',
    })

    onAdd(result.track)
    onClose()
  }

  const handleSubmit = async () => {
    if (!selectedFile && !audioUrl.trim()) {
      toast.push({
        title: 'Audio file or URL required',
        status: 'error',
        description: 'Please select an audio file or enter an audio file URL',
      })
      return
    }

    if (audioUrl.trim() && !selectedFile) {
      try {
        void new URL(audioUrl.trim())
      } catch {
        toast.push({
          title: 'Invalid URL',
          status: 'error',
          description: 'Please enter a valid URL (e.g., https://example.com/audio.m4a)',
        })
        return
      }
    }

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
      await handleAddTrackFromUrl()
    } catch (error) {
      toast.push({
        title: 'Failed to add audio track',
        status: 'error',
        description: extractErrorMessage(error, 'Failed to add audio track'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      id={dialogId}
      header="Add Audio Track"
      onClose={onClose}
      width={1}
      onClickOutside={onClose}
    >
      <Stack padding={4} space={4}>
        <Stack space={2}>
          <Card padding={3} marginBottom={2} tone="transparent" border radius={2}>
            <Flex align="center" justify="space-between">
              <Text size={1} muted>
                {selectedFile ? `Selected: ${selectedFile.name}` : 'No file selected'}
              </Text>
              <Button
                icon={UploadIcon}
                text="Select File"
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
                  setSelectedFile(e.target.files[0])
                  setAudioUrl('')
                }
              }}
            />
          </Card>
          <Text size={1} muted style={{textAlign: 'center'}}>
            Or enter the audio file URL
          </Text>
          <Stack space={2}>
            <Label htmlFor="audio-url">Audio File URL</Label>
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
              M4A, MP3 and WAV files are supported
            </Text>
          </Stack>
        </Stack>

        <Stack space={2}>
          <Label htmlFor="audio-name">Track name</Label>
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

        <Stack space={2}>
          <Label htmlFor="audio-language">Language Code</Label>
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
            text="Add Audio Track"
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
                <UploadIcon />
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
