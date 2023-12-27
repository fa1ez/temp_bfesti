// ** React Imports
import { useState, useEffect } from "react";

// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";

// ** Third Party Imports
import toast from "react-hot-toast";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Custom Component Imports
import CustomInput from "./PickersCustomInput";

import DatePicker from "react-datepicker";

// ** Icon Imports
import { AddFestival } from "src/Client/request";

import { Autocomplete, CardHeader, Checkbox } from "@mui/material";
import moment from "moment";
import DynamicReactQuill from "../DynamicReactQuill";

const GENRES_OPTIONS = [
  {
    value: "POP",
    title: "POP",
  },
  { value: "JAZZ", title: "JAZZ" },
];

const schema = yup.object().shape({
  name: yup.string().required(),
  genre: yup.array().required(),
  month: yup.string().required(),
  festival: yup.string().required(),
  land: yup.string().required(),
  locatie: yup.string().required(),
  specials: yup.string().required(),
  agecategory: yup.string().required(),
  pricecategory: yup.string().required(),
  timecategory: yup.string().required(),
  age: yup.string().required(),
  price: yup.string().required(),
  time: yup.string().required(),
  metadescription: yup.string().required(),
  xcoordinates: yup.string().required(),
  ycoordinates: yup.string().required(),
});

const defaultValues = {
  name: "",
  genre: "",
  month: "",
  festival: "",
  land: "",
  locatie: "",
  specials: "",
  agecategory: "",
  pricecategory: "",
  timecategory: "",
  age: "",
  price: "",
  time: "",
  metadescription: "",
  xcoordinates: "",
  ycoordinates: "",
};

const CreateFestivalValidationForm = () => {
  // ** States
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [time, settime] = useState(new Date());

  // ** Hooks
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onBlur", resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    setIsLoadingSubmit(true);
    AddFestival(data).then((res: any) => {
      if (!res.error) {
        toast.success(`Festival Added Successfully`, {
          position: "top-right",
        });
        reset();
      } else if (res.error) {
        toast.error(`Something went wrong`, {
          position: "top-right",
        });
      }
      setIsLoadingSubmit(false);
    });
  };

  return (
    <Card>
      <CardHeader title="Festival Details" />
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
                      placeholder="Enter festival name"
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
                  name="genre"
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
                {errors.genre && (
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
                  name="month"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Month"
                      onChange={onChange}
                      placeholder="Enter festival month"
                      type="text"
                      error={Boolean(errors.month)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.month && (
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
                  name="festival"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Festival"
                      onChange={onChange}
                      placeholder="Enter festival"
                      type="text"
                      error={Boolean(errors.festival)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.festival && (
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
                  name="land"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="land"
                      onChange={onChange}
                      placeholder="Enter festival land"
                      type="text"
                      error={Boolean(errors.land)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.land && (
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
                  name="locatie"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Locatie"
                      onChange={onChange}
                      placeholder="Enter festival locatie"
                      type="text"
                      error={Boolean(errors.locatie)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.locatie && (
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
                  name="specials"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Specials"
                      onChange={onChange}
                      placeholder="Enter festival specials"
                      type="text"
                      error={Boolean(errors.specials)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.specials && (
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
                  name="agecategory"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Age Category"
                      onChange={onChange}
                      placeholder="Enter festival age category"
                      type="text"
                      error={Boolean(errors.agecategory)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.agecategory && (
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
                  name="pricecategory"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Price Category"
                      onChange={onChange}
                      placeholder="Enter festival price category"
                      type="text"
                      error={Boolean(errors.pricecategory)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.pricecategory && (
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
                  name="timecategory"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Time Category"
                      onChange={onChange}
                      placeholder="Enter festival time category"
                      type="text"
                      error={Boolean(errors.timecategory)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.timecategory && (
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
                  name="age"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Age"
                      onChange={onChange}
                      placeholder="Enter festival accepted age"
                      type="text"
                      error={Boolean(errors.age)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.age && (
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
                  name="price"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Price"
                      onChange={onChange}
                      placeholder="Enter festival price"
                      type="text"
                      error={Boolean(errors.price)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.price && (
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
                  name="time"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      showTimeInput
                      selected={time}
                      id="basic-input"
                      onChange={(date: Date) => {
                        onChange(moment(date).format("YYYY-MM-DD:HH:MM:SS"));
                        settime(date);
                      }}
                      placeholderText="Click to select a date"
                      customInput={<CustomInput label="Time" />}
                    />
                  )}
                />
                {errors.time && (
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
                  name="xcoordinates"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="X Coordinates"
                      onChange={onChange}
                      placeholder="Enter festival x coordinates"
                      type="text"
                      error={Boolean(errors.xcoordinates)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.xcoordinates && (
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
                  name="ycoordinates"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Y Coordinates"
                      onChange={onChange}
                      placeholder="Enter festival y coordinates"
                      type="text"
                      error={Boolean(errors.ycoordinates)}
                      aria-describedby="validation-basic-name"
                    />
                  )}
                />
                {errors.ycoordinates && (
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
                  name="metadescription"
                  control={control}
                  rules={{
                    validate: (value: any) => {
                      const cleanedValue = value.replace(/<[^>]*>/g, "").trim();

                      return (
                        cleanedValue !== "<br>" || "This field is required"
                      );
                    },
                  }}
                  render={({ field: { value, onChange } }) => (
                    <DynamicReactQuill
                      value={value}
                      setValue={onChange}
                      placeholder="Enter meta description"
                    />
                  )}
                />
                {errors.metadescription && (
                  <FormHelperText
                    sx={{ color: "error.main" }}
                    id="validation-basic-title"
                  >
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8} style={{ position: "relative" }}>
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

export default CreateFestivalValidationForm;
