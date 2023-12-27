// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'

// ** Utils Import

import { CircularProgress, FormControl, FormHelperText, Grid, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AddNewEmailSubscriber } from 'src/Client/request'

const schema = yup.object().shape({
  email: yup.string().email().required()
})

const TableColumns = ({ row, setTrigger, loading }: any) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [formLoading, setFormLoading] = useState(false)

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) })

  const onSubmit = (data: any) => {
    const { email } = data
    console.log(email)
    setFormLoading(true)
    AddNewEmailSubscriber({ email }).then((res: any) => {
      if (!res.error) {
        setTrigger(true)
        setFormLoading(false)
        handleDialogClose()
      }
    })
  }

  const handleDialogOpen = () => {
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
  }

  const columns = [
    // ... other columns
    {
      flex: 0.1,
      minWidth: 30,
      headerName: 'Id',
      field: 'Id',
      renderCell: (params: any) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.Id}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 130,
      field: 'Email',
      renderCell: (params: any) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.Email}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 130,
      field: 'Added On',
      renderCell: (params: any) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {new Date(params.row.CreatedAt).toLocaleDateString()}
        </Typography>
      )
    }
  ]

  return (
    <>
      <Card>
        <CardHeader
          title='All Email Subscribers'
          action={
            <div>
              <Button size='medium' variant='contained' onClick={() => handleDialogOpen()}>
                Add new subscriber
              </Button>
            </div>
          }
        />
        <DataGrid
          autoHeight
          rows={row || []}
          columns={columns}
          disableSelectionOnClick
          components={{
            LoadingOverlay: LinearProgress
          }}
          loading={loading} // Set loading state for the entire table when deleting
          getRowId={row => row.id}
        />
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'New Email Subscriber'}</DialogTitle>
          <DialogContent>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='email'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          autoFocus
                          label='Email'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.email)}
                          placeholder='Enter Email'
                        />
                      )}
                    />
                    {errors.email && (
                      <FormHelperText sx={{ color: 'error.main' }}>{!!errors.email.message}</FormHelperText>
                    )}
                  </FormControl>
                  <DialogActions>
                    <Button onClick={handleDialogClose} disabled={formLoading}>
                      Cancel
                    </Button>
                    <Button disabled={formLoading} size='medium' variant='contained' type={'submit'} autoFocus>
                      {formLoading ? <CircularProgress size={28} color='inherit' /> : 'Confirm'}
                    </Button>
                  </DialogActions>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </Card>
    </>
  )
}

export default TableColumns
