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
import { deleteArtist } from "src/Client/request";
import toast from "react-hot-toast";
import { IconButton, Menu } from "@mui/material";
import EditArtistsValidationForm from "src/views/forms/form-validation/EditArtistsValidationForm";

const TableColumns = ({ row, setTrigger, trigger }: any) => {
  const [selectedArtists, setselectedArtists] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setEditOpenDialog] = useState<boolean | any>(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [clickedRowId, setClickedRowId] = useState(null);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleEditDialogOpen = (id: any) => {
    setEditOpenDialog(id);
  };

  const handleEditDialogClose = () => {
    setEditOpenDialog(false);
  };

  const [isLoadingDelete, setIsLoadingDelete] = useState(false); // Add loading state

  const handleDeleteartists = (id: any) => {
    if (id) {
      setIsLoadingDelete(true); // Set loading state to true
      deleteArtist(id).then((res: any) => {
        if (!res.error) {
          handleDialogClose();
          toast.success(`artists deleted successfully`, {
            position: "top-right",
          });
        } else {
          handleDialogClose();
          toast.error(`Failed to delete artists`, {
            position: "top-right",
          });
        }
        setTrigger(!trigger);
        setIsLoadingDelete(false); // Set loading state back to false
      });
    }
  };

  const columns = [
    {
      flex: 0.1,
      minWidth: 50,
      headerName: "Id",
      field: "ArtistID",
    },
    {
      flex: 0.15,
      minWidth: 130,
      headerName: "Name",
      field: "Name",
    },
    {
      flex: 0.15,
      minWidth: 150,
      headerName: "Genre",
      field: "Genre",
    },
    {
      flex: 0.15,
      minWidth: 130,
      headerName: "Birth Place",
      field: "Birthplace",
    },
    {
      flex: 0.15,
      minWidth: 130,
      headerName: "Website",
      field: "Website",
    },
    {
      flex: 0.15,
      minWidth: 130,
      headerName: "Facebook",
      field: "Facebook",
    },
    {
      flex: 0.15,
      minWidth: 130,
      headerName: "Instagram",
      field: "Instagram",
    },
    {
      flex: 0.15,
      minWidth: 130,
      headerName: "Youtube",
      field: "Youtube",
    },
    {
      flex: 0.15,
      minWidth: 130,
      headerName: "Soundcloud",
      field: "Soundcloud",
    },
    {
      flex: 0.15,
      minWidth: 130,
      headerName: "Spotify",
      field: "Spotify",
    },

    {
      flex: 0.3,
      minWidth: 130,
      field: "Description",
      renderCell: (params: any) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.Description}
        </Typography>
      ),
    },
    {
      flex: 0.15,
      minWidth: 130,
      headerName: "IsDeleted",
      field: "IsDeleted",
    },
    {
      flex: 0.2,
      minWidth: 130,
      field: "Date",
      renderCell: (params: any) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {new Date(params.row.CreatedAt).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: "Actions",
      renderCell: (params: any) => (
        <>
          <IconButton
            id="demo-positioned-button"
            aria-controls={menuOpen ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={clickedRowId === params.id ? "true" : undefined}
            onClick={(event) => handleMenuOpen(event, params.id)}
          >
            <Icon icon="tabler:dots" fontSize={20} />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            anchorReference="anchorPosition"
            anchorPosition={menuPosition}
            open={menuOpen && clickedRowId === params.id}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "longIcon",
            }}
          >
            <MenuItem
              onClick={() => {
                // router.push(`artistss/page/${params.row.id}/`)
                handleEditDialogOpen(params.row);
                handleMenuClose();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setselectedArtists(params.row.ArtistID);
                handleDialogOpen();
                handleMenuClose();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const handleMenuOpen = (event: any, id: any) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: buttonRect.bottom,
      left: buttonRect.left + window.scrollX,
    });
    setMenuOpen(true);
    setClickedRowId(id);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setClickedRowId(null);
  };

  return (
    <>
      <Card>
        <CardHeader title="All Artists" />
        <DataGrid
          autoHeight
          rows={row || []}
          getRowId={(row) => row.ArtistID}
          columns={columns}
          disableSelectionOnClick
          components={{
            LoadingOverlay: LinearProgress,
          }}
          loading={isLoadingDelete || !row} // Set loading state for the entire table when deleting
        />
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Deletion"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this artist?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button
              size="medium"
              variant="contained"
              onClick={() => {
                handleDeleteartists(selectedArtists);
                handleDialogClose();
              }}
              autoFocus
              disabled={isLoadingDelete} // Disable the button while loading
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEditDialog}
          onClose={handleEditDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Edit Artist"}</DialogTitle>
          <DialogContent>
            <EditArtistsValidationForm
              artist={openEditDialog}
              id={openEditDialog.ArtistID}
              handleEditDialogClose={handleEditDialogClose}
              setTrigger={setTrigger}
            />
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
};

export default TableColumns;
