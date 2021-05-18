import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  unlikePost,
  savePost,
  unsavePost,
} from "../../../redux/actions/postAction";
import LikeButton from "../../buttons/LikeButton";
import { BASE_URL } from "../../../utils/config";
import { EmailShareButton } from "react-share";

// Material UI Components
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Box from "@material-ui/core/Box";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  iconButton: {
    paddingTop: theme.spacing(2),
  },
}));

const PostFooter = ({ post }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  // Likes
  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnlike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(unlikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  // Saved
  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnsavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(unsavePost({ post, auth }));
    setSaveLoad(false);
  };

  return (
    <>
      <CardActions disableSpacing>
        <LikeButton
          isLike={isLike}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
        />
        <Link
          component="a"
          href={`/post/${post._id}`}
          underline="none"
          variant="inherit"
          color="textSecondary"
        >
          <IconButton aria-label="comment">
            <ChatBubbleOutlineIcon />
          </IconButton>
        </Link>

        <IconButton aria-label="send email">
          <EmailShareButton
            url={`${BASE_URL}/post/${post._id}`}
            subject={"Sharing a post with you"}
            style={{ padding: 0, margin: 0 }}
          >
            <EmailOutlinedIcon />
          </EmailShareButton>
        </IconButton>

        {saved ? (
          <IconButton aria-label="bookmark" onClick={handleUnsavePost}>
            <BookmarkIcon color="primary" />
          </IconButton>
        ) : (
          <IconButton aria-label="bookmark" onClick={handleSavePost}>
            <BookmarkBorderIcon />
          </IconButton>
        )}
      </CardActions>

      <div style={{ width: "100%" }}>
        <Box display="flex" style={{ paddingBottom: 10 }}>
          <Box flexGrow={1} style={{ paddingLeft: 15 }}>
            <Typography
              variant="caption"
              color="textSecondary"
              style={{ cursor: "pointer", fontWeight: 600 }}
            >
              {post.likes.length} likes
            </Typography>
          </Box>
          <Box style={{ paddingRight: 15 }}>
            <Typography
              variant="caption"
              color="textSecondary"
              style={{
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {post.comments.length} comments
            </Typography>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default PostFooter;
