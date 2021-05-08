import React from "react";

// Material UI Components
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";

const LikeButton = ({ isLike, handleLike, handleUnlike, size }) => {
  return (
    <>
      {isLike ? (
        <IconButton
          aria-label="like"
          onClick={handleUnlike}
          style={{ paddingTop: 7 }}
        >
          <ThumbUpIcon color="primary" fontSize={size} />
        </IconButton>
      ) : (
        <IconButton
          aria-label="like"
          onClick={handleLike}
          style={{ paddingTop: 7 }}
        >
          <ThumbUpOutlinedIcon fontSize={size} />
        </IconButton>
      )}
    </>
  );
};

export default LikeButton;
