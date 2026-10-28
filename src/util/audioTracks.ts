import type {SanityClient} from '@sanity/client'

import {getAsset} from '../actions/assets'
import type {MuxAudioTrack} from './types'

/**
 * Alternative audio tracks are every audio track that wasn't ingested from the asset's main input.
 * Mux flags the ingested one with `primary: true`.
 */
export function isAlternativeAudioTrack(track: MuxAudioTrack) {
  return track.primary !== true
}

export function getAudioTracks(tracks: {type: string}[] | undefined): MuxAudioTrack[] {
  return (tracks || []).filter((track): track is MuxAudioTrack => track.type === 'audio')
}

/**
 * The primary audio track has no `status` — treat it, and any track Mux doesn't
 * report a status for, as ready.
 */
export function getAudioTrackStatus(track: MuxAudioTrack): 'preparing' | 'ready' | 'errored' {
  return track.status || 'ready'
}

export interface PollAudioTrackStatusOptions {
  client: SanityClient
  assetId: string
  trackName: string
  trackLanguageCode: string
  /** Ids of the audio tracks that existed before the new one was added */
  knownTrackIds?: string[]
  maxAttempts?: number
  onTrackFound?: (track: MuxAudioTrack) => void
  onTrackErrored?: (track: MuxAudioTrack) => void
  onTrackReady?: (track: MuxAudioTrack) => void
}

export interface PollAudioTrackStatusResult {
  track: MuxAudioTrack | undefined
  found: boolean
  status: 'ready' | 'preparing' | 'errored' | 'not-found'
}

/**
 * Polls Mux API to find and track the status of a newly added alternative audio track.
 * The track may be in "preparing" state initially, then become "ready" or "errored".
 *
 * @param options - Configuration options for polling
 * @returns Promise resolving to the poll result
 */
export async function pollAudioTrackStatus(
  options: PollAudioTrackStatusOptions
): Promise<PollAudioTrackStatusResult> {
  const {
    client,
    assetId,
    trackName,
    trackLanguageCode,
    knownTrackIds = [],
    maxAttempts = 10,
    onTrackFound,
    onTrackErrored,
    onTrackReady,
  } = options

  const trimmedName = trackName.trim()
  const trimmedLanguageCode = trackLanguageCode.trim()
  let newTrack: MuxAudioTrack | undefined
  let attempts = 0
  let trackFound = false

  const findTrack = (audioTracks: MuxAudioTrack[]): MuxAudioTrack | undefined => {
    const candidates = audioTracks.filter(
      (track) => isAlternativeAudioTrack(track) && !knownTrackIds.includes(track.id)
    )

    let foundTrack = candidates.find(
      (track) => track.name === trimmedName && track.language_code === trimmedLanguageCode
    )

    if (!foundTrack) {
      foundTrack = candidates.find((track) => track.language_code === trimmedLanguageCode)
    }

    if (!foundTrack && candidates.length > 0) {
      foundTrack = candidates[candidates.length - 1]
    }

    return foundTrack
  }

  while (attempts < maxAttempts) {
    try {
      if (attempts > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      const assetData = await getAsset(client, assetId)
      const foundTrack = findTrack(getAudioTracks(assetData.data.tracks))

      if (!foundTrack) {
        attempts++
        continue
      }

      trackFound = true
      newTrack = foundTrack

      if (onTrackFound) {
        onTrackFound(foundTrack)
      }

      const status = getAudioTrackStatus(foundTrack)

      if (status === 'ready') {
        if (onTrackReady) {
          onTrackReady(foundTrack)
        }
        break
      }

      if (status === 'errored') {
        if (onTrackErrored) {
          onTrackErrored(foundTrack)
        }
        return {
          track: foundTrack,
          found: true,
          status: 'errored',
        }
      }
    } catch (error) {
      console.error('Failed to fetch updated asset:', error)
    }

    attempts++
  }

  if (!newTrack || !trackFound) {
    return {
      track: undefined,
      found: false,
      status: 'not-found',
    }
  }

  if (getAudioTrackStatus(newTrack) === 'preparing') {
    return {
      track: newTrack,
      found: true,
      status: 'preparing',
    }
  }

  return {
    track: newTrack,
    found: true,
    status: 'ready',
  }
}
