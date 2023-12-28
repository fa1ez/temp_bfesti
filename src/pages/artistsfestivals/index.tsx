// ** React Imports
import { useEffect, useState } from "react";

//** Next imports */
// import Link from 'next/link'

// ** MUI Imports
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";import Typography from "@mui/material/Typography";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";

// ** Demo Components Imports
import { GetArtistFestivalById } from "src/Client/request";
import TableColumns from "src/views/table/data-grid/AllArtistsFestivalsTableColumns";
import { TextField } from "@mui/material";

const DataGrid = () => {
  const [allFestivals, setAllFestivals] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    GetArtistFestivalById(search || 0).then((res: any) => {
      if (!res.error) {
        let data:any = [{
            ...res.data,
            id: 1
        }]
        setAllFestivals(data);
      } else {
        setAllFestivals([]);
      }
    });
  }, [trigger,search]);

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant="h5">
            <MuiLink>Artists Festivals</MuiLink>
          </Typography>
        }
        subtitle={
          <Typography variant="body2">
            This page shows all the Festivals of the artists in the system.
          </Typography>
        }
      />
      <div style={{marginLeft:"20px",marginTop:"40px"}}>
        <TextField
            value={search}
            label="Artist ID"
            placeholder="Enter artist Id"
            type="number"
            aria-describedby="validation-basic-name"
            onChange={(event) => {
                setSearch(event.target.value);
            }}
        />
      </div>
      <Grid item xs={12}>
        <TableColumns
          row={allFestivals}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      </Grid>
    </Grid>
  );
};

export default DataGrid;
