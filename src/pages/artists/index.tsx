// ** React Imports
import { useEffect, useState } from "react";

//** Next imports */
// import Link from 'next/link'

// ** MUI Imports
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";

// ** Demo Components Imports
import TableColumns from "src/views/table/data-grid/AllBogsTableColumns";
import { GetArtists } from "src/Client/request";
import { AnyARecord } from "dns";

const DataGrid = () => {
  const [allArtists, setAllArtists] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    GetArtists().then((res: any) => {
      if (!res.error) {
        setAllArtists(res.data);
      } else {
        setAllArtists([]);
      }
    });
  }, [trigger]);

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant="h5">
            <MuiLink>Artists</MuiLink>
          </Typography>
        }
        subtitle={
          <Typography variant="body2">
            This page shows all the artists in the system.
          </Typography>
        }
      />
      <Grid item xs={12}>
        <TableColumns
          row={allArtists}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      </Grid>
    </Grid>
  );
};

export default DataGrid;
