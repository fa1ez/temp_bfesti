// ** React Imports
import { useEffect, useState } from "react";

// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { useRouter } from "next/router";

// ** Custom Component Imports
import CustomInput from "./PickersCustomInput";

import DatePicker from "react-datepicker";

// ** Third Party Imports
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Icon Imports

import { AddArtists, CreateBlogs } from "src/Client/request";
import { Autocomplete, Checkbox } from "@mui/material";

const GENRES_OPTIONS = [
  {
    value: "POP",
    title: "POP",
  },
  { value: "JAZZ", title: "JAZZ" },
];

const schema = yup.object().shape({
  name: yup.string().required(),
  dob: yup.string().required(),
  birthplace: yup.string().required(),
  generes: yup.array().required(),
  website: yup.string().required(),
  facebook: yup.string().required(),
  instagram: yup.string().required(),
  youtube: yup.string().required(),
  soundcloud: yup.string().required(),
  spotify: yup.string().required(),
  description: yup.string().required(),
});

const CreateArtistsValidationForm = () => {
  // ** States
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // ** Hooks
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false); // Add loading state for submit button

  // ** If there are no validation errors, call the create admin api */
  const onSubmit = (data: any) => {
    setIsLoadingSubmit(true); // Set loading state to true when submitting
    console.log(data);
    AddArtists(data).then((res) => {
      if (!res.error) {
        toast.success(`Artists added Successfully`, {
          position: "top-right",
        });
        reset();
      } else if (res.error) {
        toast.error(`Something went wrong`, {
          position: "top-right",
        });
      }
      setIsLoadingSubmit(false); // Set loading state to true when submitting
    });
  };

  return (
    <Card>
      <CardHeader title="Blog Details" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Name"
                      onChange={onChange}
                      placeholder="Enter artist name"
                      type="text"
                      error={Boolean(errors.name)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText
                    sx={{ color: "error.main" }}
                    id="validation-basic-name"
                  >
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Controller
                  name="dob"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      id="basic-input"
                      onChange={(date: Date) => onChange(date)}
                      placeholderText="Click to select a date"
                      customInput={<CustomInput label="Date of birth" />}
                    />
                  )}
                />
                {errors.dob && (
                  <FormHelperText
                    sx={{ color: "error.main" }}
                    id="validation-basic-name"
                  >
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Controller
                  name="birthplace"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Birth Place"
                      onChange={onChange}
                      placeholder="Enter artist's birthplace"
                      type="text"
                      error={Boolean(errors.birthplace)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.birthplace && (
                  <FormHelperText
                    sx={{ color: "error.main" }}
                    id="validation-basic-name"
                  >
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Controller
                  name="generes"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      multiple
                      disableCloseOnSelect
                      options={GENRES_OPTIONS}
                      id="autocomplete-checkboxes"
                      getOptionLabel={(option: any) => option.title}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Genres"
                          placeholder="Genres"
                        />
                      )}
                      onChange={(_, newValue: any) => {
                        let arr: any = [];
                        newValue.map((item: any) => arr.push(item.value));
                        onChange(arr);
                      }}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox checked={selected} sx={{ mr: 2 }} />
                          {option.title}
                        </li>
                      )}
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText
                    sx={{ color: "error.main" }}
                    id="validation-basic-name"
                  >
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Controller
                  name="website"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Website"
                      onChange={onChange}
                      placeholder="Enter artist's website"
                      type="text"
                      error={Boolean(errors.website)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.website && (
                  <FormHelperText
                    sx={{ color: "error.main" }}
                    id="validation-basic-name"
                  >
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Controller
                  name="facebook"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Facebook"
                      onChange={onChange}
                      placeholder="Enter artist's facebook"
                      type="text"
                      error={Boolean(errors.facebook)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.facebook && (
                  <FormHelperText
                    sx={{ color: "error.main" }}
                    id="validation-basic-name"
                  >
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Controller
                  name="instagram"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Instagram"
                      onChange={onChange}
                      placeholder="Enter artist's instagram"
                      type="text"
                      error={Boolean(errors.instagram)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.instagram && (
                  <FormHelperText
                    sx={{ color: "error.main" }}
                    id="validation-basic-name"
                  >
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Controller
                  name="youtube"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Youtube"
                      onChange={onChange}
                      placeholder="Enter artist's youtube"
                      type="text"
                      error={Boolean(errors.youtube)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.youtube && (
                  <FormHelperText
                    sx={{ color: "error.main" }}
                    id="validation-basic-name"
                  >
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Controller
                  name="soundcloud"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Soundcloud"
                      onChange={onChange}
                      placeholder="Enter artist's soundcloud"
                      type="text"
                      error={Boolean(errors.soundcloud)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.soundcloud && (
                  <FormHelperText
                    sx={{ color: "error.main" }}
                    id="validation-basic-name"
                  >
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Controller
                  name="spotify"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Spotify"
                      onChange={onChange}
                      placeholder="Enter artist's spotify"
                      type="text"
                      error={Boolean(errors.spotify)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.spotify && (
                  <FormHelperText
                    sx={{ color: "error.main" }}
                    id="validation-basic-name"
                  >
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Description"
                      onChange={onChange}
                      placeholder="Enter artist's description"
                      type="text"
                      error={Boolean(errors.description)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.description && (
                  <FormHelperText
                    sx={{ color: "error.main" }}
                    id="validation-basic-name"
                  >
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              style={{ position: "relative", marginTop: "90px" }}
            >
              {errors.admin && (
                <FormHelperText
                  sx={{ color: "error.main", fontSize: 14, marginBottom: 2 }}
                  id=""
                >
                  {!!errors.admin.message}
                </FormHelperText>
              )}
              <div style={{ position: "relative" }}>
                <Button
                  size="medium"
                  type="submit"
                  variant="contained"
                  disabled={isLoadingSubmit}
                >
                  {isLoadingSubmit ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateArtistsValidationForm;
