import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import LikeButton from "../../LikeButton";
import { useSelector, useDispatch } from "react-redux";
import CommentMenu from "./CommentMenu";
import {
  updateComment,
  likeComment,
  unlikeComment,
} from "../../../redux/actions/commentAction";
import InputComment from "../InputComment";

// Material UI Components
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  smallAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const CommentCard = ({ children, comment, post, commentId }) => {
  const classes = useStyles();

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);

    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUnlike = async () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unlikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  return (
    <div
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 12,
        paddingBottom: 12,
      }}
    >
      <div style={{ width: "100%" }}>
        <Box display="flex" flexDirection="row">
          <Box>
            <Link color="inherit" href={`/profile/${comment.user._id}`}>
              <Avatar
                className={classes.smallAvatar}
                alt={comment.user.name}
                src={comment.user.avatar}
              />
            </Link>
          </Box>
          <Box style={{ paddingLeft: 0, marginLeft: 5, marginTop: 6 }}>
            <Typography variant="subtitle2" color="textPrimary">
              {comment.user.name}{" "}
            </Typography>
          </Box>
        </Box>
      </div>

      <div
        style={{
          width: "100%",

          paddingTop: 2,
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          bgcolor="grey.200"
          style={{ borderRadius: "0px 8px 0px 0px" }}
        >
          <Box
            flexGrow={1}
            style={{
              paddingLeft: 10,
              paddingTop: 6,
              paddingRight: 10,
              paddingBottom: 5,
            }}
          >
            {onEdit ? (
              <TextField
                rows={4}
                multiline
                rowsMax={4}
                variant="outlined"
                size="small"
                type="text"
                label="Comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                style={{ background: "#eee" }}
              />
            ) : (
              <>
                {comment.tag && comment.tag._id !== comment.user._id && (
                  <Link
                    href={`/profile/${comment.tag._id}`}
                    color="primary"
                    underline="none"
                  >
                    <Typography variant="caption" style={{ fontWeight: 600 }}>
                      @{comment.tag.name}:{" "}
                    </Typography>
                  </Link>
                )}
                <Typography variant="caption">
                  {content.length < 100
                    ? content
                    : readMore
                    ? content + " "
                    : content.slice(0, 100) + "...."}
                </Typography>

                {content.length > 100 && (
                  <Typography
                    variant="caption"
                    color="secondary"
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? "Hide content" : "Read more"}
                  </Typography>
                )}
              </>
            )}
          </Box>
          <Box>
            <LikeButton
              isLike={isLike}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              size="small"
            />
          </Box>
        </Box>
      </div>

      <div style={{ width: "100%" }}>
        <Box
          display="flex"
          flexDirection="row"
          bgcolor="grey.200"
          style={{ borderRadius: "0px 0px 8px 8px", paddingBottom: 5 }}
        >
          <Box style={{ paddingLeft: 10, paddingRight: 5 }}>
            <Typography variant="caption" color="textSecondary">
              <Moment fromNow>{comment.createdAt}</Moment>
            </Typography>
          </Box>
          <Box style={{ paddingLeft: 10, paddingRight: 5, cursor: "pointer" }}>
            <Typography
              variant="caption"
              color="textPrimary"
              style={{ fontWeight: "bold" }}
            >
              {comment.likes.length} likes
            </Typography>
          </Box>
          {onEdit ? (
            <>
              <Box style={{ paddingLeft: 10, cursor: "pointer" }}>
                <Typography
                  variant="caption"
                  color="textPrimary"
                  style={{ fontWeight: "bold" }}
                  onClick={handleUpdate}
                >
                  update
                </Typography>
              </Box>
              <Box style={{ paddingLeft: 10, cursor: "pointer" }} flexGrow={1}>
                <Typography
                  variant="caption"
                  color="textPrimary"
                  style={{ fontWeight: "bold" }}
                  onClick={() => setOnEdit(false)}
                >
                  cancel
                </Typography>
              </Box>
            </>
          ) : (
            <Box style={{ paddingLeft: 10, cursor: "pointer" }} flexGrow={1}>
              <Typography
                variant="caption"
                color="textPrimary"
                style={{ fontWeight: "bold" }}
                onClick={handleReply}
              >
                {onReply ? "cancel" : "reply"}
              </Typography>
            </Box>
          )}

          <Box style={{ paddingLeft: 10, marginTop: -13 }}>
            <CommentMenu
              post={post}
              comment={comment}
              auth={auth}
              setOnEdit={setOnEdit}
            />
          </Box>
        </Box>
      </div>
      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply} />
      )}
      {children}
    </div>
  );
};

export default CommentCard;
