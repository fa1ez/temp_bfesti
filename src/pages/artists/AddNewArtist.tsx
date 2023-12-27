// ** React Imports

// ** MUI Imports
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

import Typography from "@mui/material/Typography";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";
import CreateArtistsValidationForm from "src/views/forms/form-validation/CreateArtistsValidationForm";

import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";

const AddNewArtist = () => {
  return (
    <DatePickerWrapper
      sx={{ "& .react-datepicker-wrapper": { width: "auto" } }}
    >
      <Grid container spacing={6}>
        <PageHeader
          title={
            <Typography variant="h5">
              <MuiLink>Add a New Artist</MuiLink>
            </Typography>
          }
          subtitle={
            <Typography variant="body2">
              Specify the details of the artist
            </Typography>
          }
        />
        <Grid item xs={12}>
          <CreateArtistsValidationForm />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default AddNewArtist;
