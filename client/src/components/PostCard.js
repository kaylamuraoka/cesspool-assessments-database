import React from "react";
import PostHeader from "./home/post_card/PostHeader";
import PostBody from "./home/post_card/PostBody";
import PostFooter from "./home/post_card/PostFooter";
import Comments from "./home/Comments";
import InputComment from "./home/InputComment";

// Material UI Components
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  postCard: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const PostCard = ({ post }) => {
  const classes = useStyles();

  return (
    <Card className={classes.postCard}>
      <PostHeader post={post} />
      <PostBody post={post} />
      <PostFooter post={post} />

      <Comments post={post} />
      <InputComment post={post} />
    </Card>
  );
};

export default PostCard;
