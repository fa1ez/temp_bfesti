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

import { GetEmailSubscribers } from 'src/Client/request'
import TableColumns from 'src/views/table/data-grid/AllEmailSubscribersTableColumns'

const DataGrid = () => {
  const [data, setData] = useState<any>()
  const [trigger, setTrigger] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (trigger) {
      setLoading(true)
      GetEmailSubscribers().then((res: any) => {
        if (!res.error) {
          const blogs = res.data.map((blog: any) => {
            return { id: blog.Id, ...blog }
          })
          setTrigger(false)
          setLoading(false)
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
            <MuiLink>Email Subscribers</MuiLink>
          </Typography>
        }
        subtitle={<Typography variant='body2'>This page shows all users who have subscribed to email.</Typography>}
      />
      <Grid item xs={12}>
        <TableColumns row={data} setTrigger={setTrigger} loading={loading} />
      </Grid>
    </Grid>
  )
}

export default DataGrid
