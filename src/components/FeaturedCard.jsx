import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

const FeaturedCard = ({ title }) => {
  return (
    <Card sx={{ maxWidth: 245, marginRight: '2%' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Collections
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae iste maxime, a eum unde
          nisi doloremque inventore neque fuga ullam distinctio dolorem Commodi autem, itaque
          quibusdam hic iure minima obcaecati
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small">Open</Button>
      </CardActions>
    </Card>
  );
};

export default FeaturedCard;
