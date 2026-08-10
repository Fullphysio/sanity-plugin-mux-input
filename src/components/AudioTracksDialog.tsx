import {Dialog, Stack} from '@sanity/ui'
import {useId} from 'react'

import {useDialogStateContext} from '../context/DialogStateContext'
import type {VideoAssetDocument} from '../util/types'
import AudioTracksManager from './AudioTracksManager'

export interface Props {
  asset: VideoAssetDocument
}

export default function AudioTracksDialog({asset}: Props) {
  const {setDialogState} = useDialogStateContext()
  const dialogId = `AudioTracksDialog${useId()}`

  return (
    <Dialog
      id={dialogId}
      header="Edit Audio Tracks"
      onClose={() => setDialogState(false)}
      width={1}
    >
      <Stack padding={4}>
        <AudioTracksManager asset={asset} />
      </Stack>
    </Dialog>
  )
}
