// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";

// ** MUI Imports
import MenuItem from "@mui/material/MenuItem";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Utils Import
import { deleteArtist, deleteFestival } from "src/Client/request";
import toast from "react-hot-toast";
import { IconButton, Menu } from "@mui/material";
import EditFestivalValidationForm from "src/views/forms/form-validation/EditFestivalValidationForm";

const TableColumns = ({ row, setTrigger, trigger }: any) => {
  
  const columns = [
    {
      flex: 0.15,
      minWidth: 150,
      headerName: "Name",
      field: "Name",
    },
    {
      flex: 0.15,
      minWidth: 150,
      headerName: "Location",
      field: "Locatie",
    },
    {
      flex: 0.15,
      minWidth: 130,
      headerName: "Land",
      field: "Land",
    },
    {
      flex: 0.15,
      minWidth: 130,
      headerName: "Time",
      field: "Time",
    },
    {
      flex: 0.15,
      minWidth: 130,
      headerName: "Time Category",
      field: "TimeCategory",
    }
  ];

  return (
    <>
      <Card>
        <CardHeader title="All Artists Festivals" />
        <DataGrid
          autoHeight
          rows={row || []}
          getRowId={(row) => row.id}
          columns={columns}
          disableSelectionOnClick
          components={{
            LoadingOverlay: LinearProgress,
          }}
          loading={!row} // Set loading state for the entire table when deleting
        />
      </Card>
    </>
  );
};

export default TableColumns;
