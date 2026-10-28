import {AddIcon} from '@sanity/icons/Add'
import {ChevronDownIcon} from '@sanity/icons/ChevronDown'
import {ChevronUpIcon} from '@sanity/icons/ChevronUp'
import {EditIcon} from '@sanity/icons/Edit'
import {ErrorOutlineIcon} from '@sanity/icons/ErrorOutline'
import {TrashIcon} from '@sanity/icons/Trash'
import {Box, Button, Card, Dialog, Flex, Heading, Spinner, Stack, Text} from '@sanity/ui'
import {useToast} from '@sanity/ui/toast'
import {useEffect, useId, useState} from 'react'

import {deleteAudioTrack} from '../actions/assets'
import {useClient} from '../hooks/useClient'
import {useResyncAsset} from '../hooks/useResyncAsset'
import {getAudioTracks, getAudioTrackStatus, isAlternativeAudioTrack} from '../util/audioTracks'
import type {MuxAudioTrack, VideoAssetDocument} from '../util/types'
import AddAudioTrackDialog from './AddAudioTrackDialog'
import EditAudioTrackDialog from './EditAudioTrackDialog'

function withoutTrackIds(tracks: MuxAudioTrack[], trackIds: string[]) {
  return tracks.filter((track) => !trackIds.includes(track.id))
}

interface TrackCardProps {
  track: MuxAudioTrack
  iconOnly: boolean
  deletingTrackId: string | null
  trackToEdit: MuxAudioTrack | null
  setTrackToEdit: (track: MuxAudioTrack) => void
  setTrackToDelete: (track: MuxAudioTrack) => void
}

function TrackCard({
  track,
  iconOnly,
  deletingTrackId,
  trackToEdit,
  setTrackToEdit,
  setTrackToDelete,
}: TrackCardProps) {
  const status = getAudioTrackStatus(track)
  const isPrimary = !isAlternativeAudioTrack(track)

  const isDisabled = (action: 'edit' | 'delete') => {
    if (action === 'edit') {
      return deletingTrackId === track.id || trackToEdit?.id === track.id
    }
    return deletingTrackId !== null || trackToEdit?.id === track.id
  }

  const renderActionButtons = () => {
    if (status === 'preparing') {
      return (
        <Flex align="center" gap={2}>
          <Spinner
            muted
            style={{
              width: '0.75em',
              height: '0.75em',
              verticalAlign: 'middle',
              display: 'inline-block',
              marginBottom: '-2px',
            }}
          />
          <Text size={1} muted>
            Processing...
          </Text>
        </Flex>
      )
    }

    // Mux ingests the primary audio track from the video itself — it can't be replaced or deleted
    if (isPrimary) {
      return null
    }

    return (
      <Flex gap={2}>
        <Button
          icon={<EditIcon />}
          text={iconOnly ? undefined : 'Edit'}
          mode="ghost"
          tone="primary"
          fontSize={1}
          padding={2}
          disabled={isDisabled('edit')}
          onClick={() => setTrackToEdit(track)}
          title="Edit"
        />
        <Button
          icon={
            deletingTrackId === track.id ? (
              <Spinner
                style={{
                  verticalAlign: 'middle',
                  display: 'inline-block',
                  marginTop: '-2px',
                  width: '0.5em',
                  height: '0.5em',
                }}
              />
            ) : (
              <TrashIcon />
            )
          }
          text={iconOnly ? undefined : 'Delete'}
          mode="ghost"
          tone="critical"
          fontSize={1}
          padding={2}
          disabled={isDisabled('delete')}
          onClick={() => setTrackToDelete(track)}
          title="Delete"
        />
      </Flex>
    )
  }

  return (
    <Card padding={3} radius={2} tone={status === 'errored' ? 'caution' : 'transparent'} border>
      <Flex align="center" justify="space-between" gap={3}>
        <Stack gap={2} flex={1}>
          <Flex align="center" gap={2}>
            {/* Mux only sets a name on the primary track when one was given at asset creation */}
            <Text weight="semibold">{track.name || (isPrimary ? 'Default' : 'Untitled')}</Text>
            <Text size={1} muted>
              ({isPrimary ? 'Primary' : 'Alternative'})
            </Text>
            {status === 'errored' && (
              <ErrorOutlineIcon
                style={{color: 'var(--card-critical-color)'}}
                aria-label="Error"
                fontSize={20}
              />
            )}
          </Flex>
          {track.language_code && (
            <Text size={1} muted>
              Language: {track.language_code}
            </Text>
          )}
          {status === 'errored' && track.error && (
            <Text size={1} style={{color: 'var(--card-critical-color)'}}>
              {track.error.messages?.[0] || track.error.type || 'Failed to process track'}
            </Text>
          )}
        </Stack>
        {renderActionButtons()}
      </Flex>
    </Card>
  )
}

interface AudioTracksManagerProps {
  asset: VideoAssetDocument
  iconOnly?: boolean
  tracks?: MuxAudioTrack[]
  collapseTracks?: boolean
}

export default function AudioTracksManager({
  asset,
  iconOnly = false,
  tracks: propTracks,
  collapseTracks = false,
}: AudioTracksManagerProps) {
  const client = useClient()
  const toast = useToast()
  const dialogId = `DeleteAudioTrackDialog${useId()}`
  const {resyncAsset} = useResyncAsset()
  const [deletingTrackId, setDeletingTrackId] = useState<string | null>(null)
  const [addedTracks, setAddedTracks] = useState<MuxAudioTrack[]>([])
  const [trackActivityOrder, setTrackActivityOrder] = useState<Map<string, number>>(new Map())
  const [trackToDelete, setTrackToDelete] = useState<MuxAudioTrack | null>(null)
  const [trackToEdit, setTrackToEdit] = useState<MuxAudioTrack | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const MAX_VISIBLE_TRACKS = 4

  const activeTracks: MuxAudioTrack[] = (
    propTracks ? propTracks : getAudioTracks(asset.data?.tracks)
  ).filter((track) => Boolean(track.id))

  const allTracks = [
    ...activeTracks,
    ...addedTracks.filter(
      (addedTrack) =>
        addedTrack.id && !activeTracks.some((realTrack) => realTrack.id === addedTrack.id)
    ),
  ]

  const knownTrackIds = allTracks.map((track) => track.id)
  const hasPreparingTracks = allTracks.some((track) => getAudioTrackStatus(track) === 'preparing')

  useEffect(() => {
    if (!hasPreparingTracks || !asset.assetId || !asset._id) {
      return undefined
    }

    const interval = setInterval(async () => {
      try {
        const muxData = await resyncAsset(asset)
        if (!muxData) return

        const fetchedTrackIds = getAudioTracks(muxData.tracks).map((track) => track.id)

        // Once Mux reports the track, the optimistic copy isn't needed anymore
        setAddedTracks((prev) => withoutTrackIds(prev, fetchedTrackIds))
      } catch (error) {
        console.error('Failed to refresh asset data:', error)
      }
    }, 3000) // Poll every 3 seconds

    return () => clearInterval(interval)
  }, [hasPreparingTracks, asset, resyncAsset])

  const visibleTracks = [...allTracks].sort((a, b) => {
    const orderA = trackActivityOrder.get(a.id) || 0
    const orderB = trackActivityOrder.get(b.id) || 0

    if (orderA > 0 && orderB > 0) {
      return orderB - orderA
    }

    if (orderA > 0) return -1
    if (orderB > 0) return 1

    const aIsPreparing = getAudioTrackStatus(a) === 'preparing'
    const bIsPreparing = getAudioTrackStatus(b) === 'preparing'
    if (aIsPreparing && !bIsPreparing) return -1
    if (!aIsPreparing && bIsPreparing) return 1

    return 0
  })

  const confirmDelete = async () => {
    if (!trackToDelete || !trackToDelete.id) return

    const track = trackToDelete
    setTrackToDelete(null)
    setDeletingTrackId(track.id)
    try {
      if (!asset.assetId) {
        throw new Error('Asset ID is required')
      }
      await deleteAudioTrack(client, asset.assetId, track.id)

      // Refresh asset data after deletion
      await resyncAsset(asset)

      toast.push({
        title: 'Successfully deleted audio track',
        status: 'success',
      })

      setAddedTracks((prev) => prev.filter((t) => t.id !== track.id))
      setTrackActivityOrder((prev) => {
        const newMap = new Map(prev)
        newMap.delete(track.id)
        return newMap
      })
    } catch (error) {
      toast.push({
        title: 'Failed to delete audio track',
        status: 'error',
        description: error instanceof Error ? error.message : 'Please try again',
      })
    } finally {
      setDeletingTrackId(null)
    }
  }

  const handleAddTrack = async (track: MuxAudioTrack) => {
    setAddedTracks((prev) => [...prev, track])
    setTrackActivityOrder((prev) => {
      const newMap = new Map(prev)
      newMap.set(track.id, prev.size + 1)
      return newMap
    })
    setShowAddDialog(false)

    // Persist the new track on the asset document — a track that is ready right
    // away never goes through the polling below
    await resyncAsset(asset)
  }

  const handleUpdateTrack = async (updatedTrack: MuxAudioTrack, oldTrackId?: string) => {
    if (oldTrackId) {
      setAddedTracks((prev) => prev.filter((t) => t.id !== oldTrackId))
      setTrackActivityOrder((prev) => {
        const newMap = new Map(prev)
        newMap.delete(oldTrackId)
        return newMap
      })
    }

    const isAddedTrack = addedTracks.some((t) => t.id === updatedTrack.id)

    if (isAddedTrack) {
      setAddedTracks((prev) => prev.map((t) => (t.id === updatedTrack.id ? updatedTrack : t)))
    } else {
      setAddedTracks((prev) => [...prev, updatedTrack])
    }

    setTrackActivityOrder((prev) => {
      const newMap = new Map(prev)
      newMap.set(updatedTrack.id, prev.size + 1)
      return newMap
    })

    setTrackToEdit(null)

    // Refresh asset data after update
    await resyncAsset(asset)
  }

  if (visibleTracks.length === 0 && !showAddDialog) {
    return (
      <Stack gap={3}>
        <Flex justify="flex-end">
          <Button
            icon={AddIcon}
            text="Add Audio Track"
            tone="primary"
            onClick={() => setShowAddDialog(true)}
          />
        </Flex>
        <Card padding={4} radius={2} tone="transparent" border>
          <Text size={1} muted>
            No audio tracks available. Add an alternative audio track to offer this video in another
            language.
          </Text>
        </Card>
        {showAddDialog && (
          <AddAudioTrackDialog
            asset={asset}
            knownTrackIds={knownTrackIds}
            onAdd={handleAddTrack}
            onClose={() => setShowAddDialog(false)}
          />
        )}
      </Stack>
    )
  }

  const displayedTracks =
    collapseTracks && !isExpanded ? visibleTracks.slice(0, MAX_VISIBLE_TRACKS) : visibleTracks
  const hasMoreTracks = collapseTracks && visibleTracks.length > MAX_VISIBLE_TRACKS

  return (
    <Stack gap={3}>
      <Flex justify="flex-end">
        <Button
          icon={AddIcon}
          text="Add Audio Track"
          tone="primary"
          onClick={() => setShowAddDialog(true)}
        />
      </Flex>

      {displayedTracks.map((track) => (
        <TrackCard
          key={track.id}
          track={track}
          iconOnly={iconOnly}
          deletingTrackId={deletingTrackId}
          trackToEdit={trackToEdit}
          setTrackToEdit={setTrackToEdit}
          setTrackToDelete={setTrackToDelete}
        />
      ))}

      {hasMoreTracks && (
        <Flex justify="center">
          <Button
            icon={isExpanded ? ChevronUpIcon : ChevronDownIcon}
            text={
              isExpanded ? 'Show less' : `Show ${visibleTracks.length - MAX_VISIBLE_TRACKS} more`
            }
            mode="ghost"
            tone="primary"
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </Flex>
      )}

      {trackToDelete && (
        <Dialog
          animate
          id={dialogId}
          header="Delete track"
          onClose={() => setTrackToDelete(null)}
          onClickOutside={() => setTrackToDelete(null)}
          width={1}
        >
          <Card
            padding={3}
            style={{
              minHeight: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Stack gap={3}>
              <Heading size={2}>
                Are you sure you want to delete &quot;
                {trackToDelete.name || trackToDelete.language_code || 'Untitled'}&quot;?
              </Heading>
              <Text size={2}>This action is irreversible</Text>
              <Stack gap={4} marginY={4}>
                <Box>
                  <Button
                    icon={
                      deletingTrackId === trackToDelete.id ? (
                        <Spinner
                          style={{
                            verticalAlign: 'middle',
                            display: 'inline-block',
                            marginTop: '-2px',
                            width: '0.5em',
                            height: '0.5em',
                          }}
                        />
                      ) : (
                        <TrashIcon />
                      )
                    }
                    fontSize={2}
                    padding={3}
                    text="Delete track"
                    tone="critical"
                    onClick={confirmDelete}
                    disabled={deletingTrackId !== null}
                  />
                </Box>
              </Stack>
            </Stack>
          </Card>
        </Dialog>
      )}

      {showAddDialog && (
        <AddAudioTrackDialog
          asset={asset}
          knownTrackIds={knownTrackIds}
          onAdd={handleAddTrack}
          onClose={() => setShowAddDialog(false)}
        />
      )}

      {trackToEdit && (
        <EditAudioTrackDialog
          asset={asset}
          track={trackToEdit}
          knownTrackIds={knownTrackIds}
          onUpdate={handleUpdateTrack}
          onClose={() => setTrackToEdit(null)}
        />
      )}
    </Stack>
  )
}
