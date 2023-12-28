// ** React Imports

// ** MUI Imports
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

import Typography from "@mui/material/Typography";
import { useState } from "react";
import toast from "react-hot-toast";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";
import { AddArtistFestivals } from "src/Client/request";

const ChipsTextField = ({
  chips,
  onAddChip,
  onDeleteChip,
  label,
  placeholder,
}: any) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      onAddChip(event.target.value);
      event.target.value = "";
    }
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      variant="outlined"
      type="number"
      onKeyDown={handleKeyDown}
      InputProps={{
        startAdornment: chips.map((chip) => (
          <Chip
            key={chip.key}
            label={chip.label}
            onDelete={() => onDeleteChip(chip)}
            style={{ margin: "2px" }}
          />
        )),
        style: {
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          paddingTop: "15px",
        },
      }}
      style={{ width: "60%", display: "flex", flexWrap: "wrap" }}
    />
  );
};

const AddNewArtist = () => {
  const [artistsData, setArtistsData] = useState([]);
  const [festivalsData, setFestivalsData] = useState([]);

  const handleDeleteArtists = (chipToDelete: any) => {
    setArtistsData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleAddChipArtists = (newChipLabel: any) => {
    const newChip = { key: newChipLabel, label: newChipLabel };
    setArtistsData([...artistsData, newChip]);
  };

  const handleSave = () => {
    const payload = {
      artists_ids: artistsData.map((dt) => parseInt(dt.key)),
      festival_Id: festivalsData,
    };
    AddArtistFestivals(payload).then((res) => {
      if (!res.error) {
        toast.success(`Artists Festival added Successfully`, {
          position: "top-right",
        });
      } else if (res.error) {
        toast.error(`Something went wrong`, {
          position: "top-right",
        });
      }
      setArtistsData([]);
      setFestivalsData(null);
    });
  };

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant="h5">
            <MuiLink>Add Artists Festivals</MuiLink>
          </Typography>
        }
        subtitle={
          <Typography variant="body2">
            Add the multiple artists to the multiple festivals
          </Typography>
        }
      />
      <div style={{ margin: "40px 20px 20px 20px", width: "100%" }}>
        <ChipsTextField
          chips={artistsData}
          onAddChip={handleAddChipArtists}
          onDeleteChip={handleDeleteArtists}
          label="Artists"
          placeholder="Enter Artists ID and press Enter..."
        />
      </div>
      <div style={{ margin: "20px", width: "100%" }}>
        <TextField
          label="Festival"
          placeholder="Enter Festival ID here"
          value={festivalsData}
          type="number"
          onChange={(e) => setFestivalsData(e.target.value)}
          variant="outlined"
          style={{ width: "60%", display: "flex", flexWrap: "wrap" }}
        />
      </div>
      <div style={{ margin: "20px", width: "100%" }}>
        <Button
          onClick={handleSave}
          style={{ width: "60%", marginLeft: "auto" }}
        >
          Add
        </Button>
      </div>
    </Grid>
  );
};

export default AddNewArtist;
