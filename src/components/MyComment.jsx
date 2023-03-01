import { Card, CardContent, CardHeader } from '@mui/material';
import { DateTime } from 'luxon';
import React from 'react';

const MyComment = ({ review, style }) => {
  return (
    <Card sx={{ maxWidth: '100%', ...style }}>
      <CardHeader
        title={`From: ${review.author.name}`}
        // disableTypography="true"
        subheader={DateTime.fromISO(review.createdAt).toLocaleString()}
      />
      <CardContent>{review.body}</CardContent>
    </Card>
  );
};

export default MyComment;
