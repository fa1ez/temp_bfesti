// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'

// ** Third Party Imports
import toast from 'react-hot-toast'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import { updateBlog, getBlogByID } from 'src/Client/request'
import DynamicReactQuill from '../DynamicReactQuill'
import ImageCropView from 'src/views/misc/ImageCropView'

const schema = yup.object().shape({
  heading: yup.string().required(),
  content: yup.string().required(),
  desc: yup.string().required(),
  blog_image: yup.mixed().required(),
  read_time: yup.string().required()
})

const EditBlogValidationForm = ({ blog, id, handleEditDialogClose, setTrigger }: any) => {
  // ** States
  const [loading, setLoading] = useState(true)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [img, setImg] = useState<any>()
  const [croppedImg, setCroppedImg] = useState('')
  const [open, setOpen] = useState(false)

  // ** Hooks
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) })

  useEffect(() => {
    if (blog) {
      console.log(blog)
      setValue('heading', blog.Heading)
      setValue('desc', blog.Description)
      setValue('read_time', blog.ReadTime)

      getBlogByID(id).then((res: any) => {
        setValue('content', res.data.Content)
        setLoading(false)
      })

      // URL of the image you want to convert
      const imageUrl = blog.BlogImage
      setCroppedImg(imageUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (croppedImg) {
      fetch(croppedImg)
        .then(response => response.blob())
        .then(blob => {
          const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })
          setValue('blog_image', file)
        })
        .catch(error => console.error('Error converting Blob to File:', error))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedImg])

  // Handle file input change
  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      try {
        setOpen(true)
        setImg(URL.createObjectURL(file))
      } catch (error) {
        console.error('Error cropping image:', error)
      }
    }
  }

  //** If there are no validation errors, call the create admin api */
  const onSubmit = (data: any) => {
    setIsLoadingSubmit(true) // Set loading state to true when submitting
    updateBlog(data, id).then(res => {
      handleEditDialogClose()
      if (!res.error) {
        setTrigger(true)
        toast.success(`Blog Updated Successfully`, {
          position: 'top-right'
        })
      } else if (res.error) {
        toast.error(`Something went wrong`, {
          position: 'top-right'
        })
      }
      setIsLoadingSubmit(false) // Set loading state to true when submitting
    })
  }

  return (
    <Card>
      <ImageCropView open={open} setOpen={setOpen} img={img} setCroppedImg={setCroppedImg} />
      {/* <CardHeader title='Blog Details' /> */}
      {loading ? (
        <CircularProgress
          size={32}
          color='inherit'
          sx={{ marginTop: '55px', marginBottom: '55px', marginInline: '200px' }}
        />
      ) : (
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <Controller
                    name='heading'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Heading'
                        onChange={onChange}
                        placeholder='Enter Blog Heading'
                        type='text'
                        error={Boolean(errors.heading)}
                        aria-describedby='validation-basic-name'
                      />
                    )}
                  />
                  {errors.heading && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-name'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <Controller
                    name='desc'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Description'
                        onChange={onChange}
                        placeholder='Enter Description'
                        type='text'
                        error={Boolean(errors.desc)}
                        aria-describedby='validation-basic-description'
                      />
                    )}
                  />
                  {errors.desc && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-description'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <Controller
                    name='blog_image'
                    control={control}
                    rules={{ required: true }}
                    render={() => (
                      <div>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                          id='image-input'
                        />
                        <label htmlFor='image-input'>
                          {/* <Button variant='contained' component='span'>
                          Upload The main image file
                        </Button> */}
                          {croppedImg ? (
                            <div
                              style={{
                                marginTop: '10px',
                                width: '100%',
                                position: 'relative',
                                paddingBottom: '56.25%'
                              }}
                            >
                              <img
                                src={croppedImg}
                                alt='Preview'
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  cursor: 'pointer',
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover' // This ensures the image maintains its aspect ratio
                                }}
                              />
                            </div>
                          ) : (
                            <div
                              style={{
                                marginTop: '10px',
                                width: '100%',
                                position: 'relative',
                                paddingBottom: '56.25%'
                              }}
                            >
                              <img
                                src='/images/dummy-img.jpg'
                                alt='Preview'
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  cursor: 'pointer',
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover' // This ensures the image maintains its aspect ratio
                                }}
                              />
                            </div>
                          )}
                        </label>
                      </div>
                    )}
                  />
                  {errors.blog_image && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-file'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <Controller
                    name='read_time'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Read Time'
                        onChange={onChange}
                        placeholder='Enter Blog Reading Time'
                        type='text'
                        error={Boolean(errors.description)}
                        aria-describedby='validation-basic-read_time'
                      />
                    )}
                  />
                  {errors.read_time && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-read_time'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <Controller
                    name='content'
                    control={control}
                    rules={{
                      validate: value => {
                        const cleanedValue = value.replace(/<[^>]*>/g, '').trim()

                        return cleanedValue !== '<br>' || 'This field is required'
                      }
                    }}
                    render={({ field: { value, onChange } }) => {
                      return <DynamicReactQuill value={value} setValue={onChange} placeholder='Enter Blog Content' />
                    }}
                  />
                  {errors.content && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-title'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} style={{ position: 'relative', marginTop: '90px' }}>
                {errors.admin && (
                  <FormHelperText sx={{ color: 'error.main', fontSize: 14, marginBottom: 2 }} id=''>
                    {!!errors.admin.message}
                  </FormHelperText>
                )}
                <div style={{ position: 'relative' }}>
                  <Button onClick={handleEditDialogClose} disabled={isLoadingSubmit}>
                    Cancel
                  </Button>
                  <Button size='medium' type='submit' variant='contained' disabled={isLoadingSubmit}>
                    {isLoadingSubmit ? <CircularProgress size={24} color='inherit' /> : 'Save'}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      )}
    </Card>
  )
}

export default EditBlogValidationForm
