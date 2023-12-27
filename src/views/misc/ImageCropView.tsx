import React, { useState, useCallback } from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import Cropper from 'react-easy-crop'

import getCroppedImg from './cropImage'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    minHeight: '400px',
    minWidth: '400px'
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export default function ImageCropView({ open, setOpen, img, setCroppedImg, setTrigger }: any) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const showCroppedImage = useCallback(async () => {
    try {
      handleClose()
      const croppedImage = await getCroppedImg(img, croppedAreaPixels, rotation)
      console.log('donee', { croppedImage })
      setCroppedImg(croppedImage)
      if (setTrigger) {
        setTrigger(true)
      }
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedAreaPixels, rotation])

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle sx={{ m: 0, p: 4, borderBottom: '1px solid #ccc' }} id='customized-dialog-title'>
          <Typography variant='h6'>Image Cropper</Typography>
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          dividers
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <div className='crop-container' style={{ width: '100%', maxHeight: '400px', marginBottom: '16px' }}>
            <Cropper
              image={img}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className='controls'>
            <input
              type='range'
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby='Zoom'
              onChange={(e: any) => {
                setZoom(e.target.value)
              }}
              style={{
                width: '90%'
              }}
              className='zoom-range'
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid #ccc' }}>
          <Button autoFocus variant='contained' sx={{ m: 4 }} onClick={showCroppedImage}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
