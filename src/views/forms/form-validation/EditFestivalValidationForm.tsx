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

// ** Icon Imports
import { GetFestivalById, updateFestival } from "src/Client/request";

import { Autocomplete, Checkbox } from "@mui/material";
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

const EditFestivalValidationForm = ({
  festival,
  id,
  handleEditDialogClose,
  setTrigger,
}: any) => {
  // ** States
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [loading, setLoading] = useState(true);

  // ** Hooks
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  useEffect(() => {
    if (festival) {
      console.log(festival);
      setValue("name", festival.Name);
      setValue("generes", festival.Generes);
      setValue("month", festival.Month);
      setValue("festival", festival.Festival);
      setValue("land", festival.Land);
      setValue("locatie", festival.Locatie);
      setValue("specials", festival.Specials);
      setValue("agecategory", festival.AgeCategory);
      setValue("pricecategory", festival.PriceCategory);
      setValue("timecategory", festival.TimeCategory);

      GetFestivalById(id).then((r: any) => {
        if (r.data) {
          const res = r.data;
          setValue("age", res.Age);
          setValue("price", res.Price);
          setValue("time", res.Time);
          setValue("metadescription", res.MetaDescription);
          setValue("xcoordinates", res.XCoordinates);
          setValue("ycoordinates", res.YCoordinates);
        } else {
          handleEditDialogClose();
        }
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //** If there are no validation errors, call the create admin api */
  const onSubmit = (data: any) => {
    setIsLoadingSubmit(true); // Set loading state to true when submitting
    const temp = {
      ...data,
      festival_Id: id,
    };
    updateFestival(temp).then((res: any) => {
      handleEditDialogClose();
      if (!res.error) {
        setTrigger(true);
        toast.success(`Festival Updated Successfully`, {
          position: "top-right",
        });
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
      {loading ? (
        <CircularProgress
          size={32}
          color="inherit"
          sx={{
            marginTop: "55px",
            marginBottom: "55px",
            marginInline: "200px",
          }}
        />
      ) : (
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
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
                        placeholder="Enter festival age "
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
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <Controller
                    name="metadescription"
                    control={control}
                    rules={{
                      validate: (value: any) => {
                        const cleanedValue = value
                          .replace(/<[^>]*>/g, "")
                          .trim();

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
              <Grid item xs={12} sm={12} style={{ position: "relative" }}>
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
      )}
    </Card>
  );
};

export default EditFestivalValidationForm;
