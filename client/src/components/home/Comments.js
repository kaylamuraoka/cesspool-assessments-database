import React, { useState, useEffect } from "react";
import CommentDisplay from "./comments/CommentDisplay";

import Typography from "@material-ui/core/Typography";

const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);

  const [next, setNext] = useState(2);

  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const newCm = post.comments.filter((cm) => !cm.reply);
    setComments(newCm);
    setShowComments(newCm.slice(newCm.length - next));
  }, [post.comments, next]);

  useEffect(() => {
    const newRep = post.comments.filter((cm) => cm.reply);
    setReplyComments(newRep);
  }, [post.comments]);

  return (
    <div>
      {showComments.map((comment, index) => (
        <CommentDisplay
          key={index}
          comment={comment}
          post={post}
          replyCm={replyComments.filter((item) => item.reply === comment._id)}
        />
      ))}

      {comments.length - next > 0 ? (
        <Typography
          variant="caption"
          color="secondary"
          style={{ paddingLeft: 15, fontWeight: "bold", cursor: "pointer" }}
          onClick={() => setNext(next + 10)}
        >
          See more comments...
        </Typography>
      ) : (
        comments.length > 2 && (
          <Typography
            variant="caption"
            color="secondary"
            style={{ paddingLeft: 15, fontWeight: "bold", cursor: "pointer" }}
            onClick={() => setNext(2)}
          >
            Hide comments...
          </Typography>
        )
      )}
    </div>
  );
};

export default Comments;
