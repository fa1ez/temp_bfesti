// ** React Imports
import { useEffect, useState } from 'react'

//** Next imports */
// import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports

import { GetBlogSubscribers } from 'src/Client/request'
import TableColumns from 'src/views/table/data-grid/AllBlogSubscribersTableColumns'

const DataGrid = () => {
  const [data, setData] = useState<any>()
  const [trigger, setTrigger] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (trigger) {
      setLoading(true)
      GetBlogSubscribers().then((res: any) => {
        if (!res.error) {
          const blogs = res.data.map((blog: any) => {
            return { id: blog.Id, ...blog }
          })
          setLoading(false)
          setTrigger(false)
          setData(blogs)
        } else {
          setLoading(false)
          setTrigger(false)
          setData([])
        }
      })
    }
  }, [trigger])

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <MuiLink>Blog Subscribers</MuiLink>
          </Typography>
        }
        subtitle={<Typography variant='body2'>This page shows all users who have subscribed to blogs.</Typography>}
      />
      <Grid item xs={12}>
        <TableColumns row={data} setTrigger={setTrigger} loading={loading} />
      </Grid>
    </Grid>
  )
}

export default DataGrid
