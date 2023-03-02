import { Container, Typography, Box, Button, Link } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyTable from "../components/MyTable";
import { getCollection } from "../requests/collectionRequests";
import NewItemDialog from "../components/NewItemDialog";
import UpdateCollectionDialog from "../components/UpdateCollectionDialog";
import { DateTime } from "luxon";
import { Context } from "..";

const Collection = () => {
  const { user } = useContext(Context);
  const [newItemModalOpen, setNewItemModalOpen] = useState(false);
  const [collection, setCollection] = useState({});
  const [updateCollectionModalOpen, setUpdateCollectionModalOpen] =
    useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const collectionId = location.pathname.split("/")[2];

  const handleNewItemDialogOpen = () => {
    setNewItemModalOpen(true);
  };

  const handleUpdateCollectionDialogOpen = () => {
    setUpdateCollectionModalOpen(true);
  };

  useEffect(() => {
    getCollection(collectionId).then((data) => setCollection(data));
    // eslint-disable-next-line
  }, []);

  return (
    <Container sx={{ marginTop: "2%", marginBottom: "2%" }}>
      <UpdateCollectionDialog
        updateCollectionModalOpen={updateCollectionModalOpen}
        setUpdateCollectionModalOpen={setUpdateCollectionModalOpen}
        collection={collection}
      />
      <NewItemDialog
        newItemModalOpen={newItemModalOpen}
        setNewItemModalOpen={setNewItemModalOpen}
        collection={collection}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold" sx={{ marginBottom: "3%" }}>
          {collection.name}
        </Typography>
        {(user.user.id === collection.owner?._id ||
          user.user.role === "admin") && (
          <Button
            variant="outlined"
            sx={{ marginBottom: "2%" }}
            onClick={handleUpdateCollectionDialogOpen}
          >
            Edit Collection
          </Button>
        )}
      </Box>
      <Typography variant="h6" fontWeight="bold">
        Owner:
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "2%" }}>
        <Link
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/users/${collection.owner?._id}`)}
        >
          {collection.owner?.name}
        </Link>
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        Created at:
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "2%" }}>
        {DateTime.fromISO(collection.createdAt)
          .setLocale("uk")
          .toLocaleString(DateTime.DATETIME_SHORT)}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: "1%" }}>
          Items
        </Typography>
        {(user.user.id === collection.owner?._id ||
          user.user.role === "admin") && (
          <Button
            variant="outlined"
            sx={{ marginBottom: "1%", marginLeft: "auto" }}
            onClick={handleNewItemDialogOpen}
          >
            Create new
          </Button>
        )}
      </Box>
      <MyTable />
    </Container>
  );
};

export default Collection;
