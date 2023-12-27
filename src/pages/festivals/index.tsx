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
import { GetFestivals } from "src/Client/request";
import TableColumns from "src/views/table/data-grid/AllFestivalsTableColumns";

const DataGrid = () => {
  const [allFestivals, setAllFestivals] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    GetFestivals().then((res: any) => {
      if (!res.error) {
        setAllFestivals(res.data);
      } else {
        setAllFestivals([]);
      }
    });
  }, [trigger]);

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant="h5">
            <MuiLink>Festivals</MuiLink>
          </Typography>
        }
        subtitle={
          <Typography variant="body2">
            This page shows all the Festivals in the system.
          </Typography>
        }
      />
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
