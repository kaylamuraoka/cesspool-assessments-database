import React from "react";

// Material UI Components
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Typography from "@material-ui/core/Typography";

const PostThumb = ({ posts, result }) => {
  if (result === 0)
    return (
      <Typography
        color="textSecondary"
        variant="h6"
        align="center"
        style={{ fontWeight: "bold" }}
      >
        No posts yet
      </Typography>
    );

  return (
    <div className="">
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post._id}`}>
          {post.images.length && (
            <div>
              <img src={post.images[0].url} alt={post.images[0].url} />
            </div>
          )}

          <div className="post_thumb_menu">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <ThumbUpOutlinedIcon />
              {post.likes.length}
            </IconButton>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <ChatBubbleOutlineIcon />
              {post.comments.length}
            </IconButton>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default PostThumb;
