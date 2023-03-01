import { Box, Container, Typography, Button, Link, IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import MyComment from '../components/MyComment';
import { fetchItem } from '../requests/itemRequests';
import NewCommentDialog from '../components/NewCommentDialog';
import { addLike, removeLike } from '../requests/likeRequests';

const Item = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const itemId = location.pathname.split('/')[2];
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [item, setItem] = useState({});

  const handleNewCommentOpen = () => {
    setCommentDialogOpen(true);
  };

  const handleLike = async () => {
    await addLike(user.user.id, item._id);
    setIsLiked(true);
  };

  const handleLikeRemove = async () => {
    await removeLike(user.user.id, item._id);
    setIsLiked(false);
  };

  useEffect(() => {
    fetchItem(itemId).then((data) => {
      setItem(data);
      setIsLiked(data.isLiked);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container sx={{ marginTop: '2%', marginBottom: '2%' }}>
      <NewCommentDialog
        item={item}
        commentDialogOpen={commentDialogOpen}
        setCommentDialogOpen={setCommentDialogOpen}
      />
      <Box
        sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginBottom: '2%' }}
      >
        <Typography variant="h4" fontWeight="bold">
          {item?.name}
        </Typography>
        {isLiked ? (
          <IconButton sx={{ marginLeft: '2%' }} onClick={handleLikeRemove}>
            <FavoriteOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton sx={{ marginLeft: '2%' }} onClick={handleLike}>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        )}
      </Box>
      <Box sx={{ marginTop: '2%' }}>
        <Typography variant="h6">Owner: </Typography>
        <Typography variant="body1">
          <Link sx={{ cursor: 'pointer' }} onClick={() => navigate(`/users/${item.owner?._id}`)}>
            {item.owner?.name}
          </Link>
        </Typography>
      </Box>
      <Box sx={{ marginTop: '2%' }}>
        <Typography variant="h6">Collection: </Typography>
        <Typography variant="body1">
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(`/collections/${item.collectionId?._id}`)}
          >
            {item.collectionId?.name}
          </Link>
        </Typography>
      </Box>
      <Box sx={{ marginTop: '2%' }}>
        <Typography variant="h6">Description: </Typography>
        <Typography variant="body1">{item.description}</Typography>
      </Box>
      <Box sx={{ marginTop: '2%' }}>
        <Typography variant="h6">Tags: </Typography>
        {item.tags?.map((tag, i) => (
          <Typography key={i} variant="body1">
            {tag}
          </Typography>
        ))}
      </Box>
      <Typography variant="h6" sx={{ marginTop: '2%' }}>
        Likes Count:
      </Typography>
      <Typography variant="body1">{item.likes}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ marginTop: '2%' }}>
          Comments:
        </Typography>
        {user.isAuth && user.user.id !== item.owner?._id && (
          <Button sx={{ marginTop: '2%' }} variant="outlined" onClick={handleNewCommentOpen}>
            Create Comment
          </Button>
        )}
      </Box>
      {item.reviews?.length ? (
        item.reviews.map((review) => (
          <MyComment
            key={review._id}
            review={review}
            style={{ marginBottom: '1%', marginTop: '2%' }}
          />
        ))
      ) : (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '4%' }}
        >
          <Typography variant="h6">There are no comments for this item</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Item;
