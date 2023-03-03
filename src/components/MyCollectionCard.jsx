import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export const MyCollectionCard = ({ collection }) => {
  const navigate = useNavigate();

  const handleCollectionOpen = () => {
    navigate(`/collections/${collection._id}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: 300,
        height: 300,
        marginRight: "2%",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5">
          {collection.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {collection.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleCollectionOpen}>
          Open
        </Button>
      </CardActions>
    </Card>
  );
};

export default MyCollectionCard;
