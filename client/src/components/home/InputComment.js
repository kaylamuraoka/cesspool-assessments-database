import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";

// Material UI Components
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  ReplyDivSpacing: {
    marginTop: -5,
  },
  commentDivSpacing: {
    borderTop: "1px solid lightgrey",
  },
}));

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const classes = useStyles();

  const [content, setContent] = useState("");

  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    setContent("");

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ post, newComment, auth, socket }));

    if (setOnReply) return setOnReply(false);
  };

  return (
    <Box
      component="div"
      bgcolor="grey.50"
      className={onReply ? classes.ReplyDivSpacing : classes.commentDivSpacing}
    >
      <form onSubmit={handleSubmit}>
        {children}
        <TextField
          margin="dense"
          required
          fullWidth
          style={{
            paddingTop: 0,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
          }}
          multiline
          rowsMax={4}
          id="comment"
          placeholder="Add your comments..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {onReply ? (
                  <Link
                    href={`/profile/${onReply.user._id}`}
                    color="primary"
                    underline="none"
                  >
                    <Typography variant="caption" style={{ fontWeight: 600 }}>
                      @{onReply.user.name}:{" "}
                    </Typography>
                  </Link>
                ) : (
                  "Comment: "
                )}
              </InputAdornment>
            ),
            endAdornment: (
              <Button type="submit" color="primary" size="small">
                Post
              </Button>
            ),
          }}
          // helperText="Some important text"
          // error={}import { Grid } from '@material-ui/core/Grid';
        />
      </form>
    </Box>
  );
};

export default InputComment;
