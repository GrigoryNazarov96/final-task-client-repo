import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const FeaturedCard = ({ title }) => {
  const navigate = useNavigate();

  const handleMostLikedCollectionsOpen = () => {
    navigate("/featured");
  };

  return (
    <Card sx={{ maxWidth: 150, marginRight: "2%" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${title}\ncollections`}
        </Typography>
        {/* <Typography gutterBottom variant="h5" component="div">
          Collections
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small">Open</Button>
      </CardActions>
    </Card>
  );
};

export default FeaturedCard;
