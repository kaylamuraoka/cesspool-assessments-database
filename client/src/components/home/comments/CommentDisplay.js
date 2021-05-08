import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";

import Typography from "@material-ui/core/Typography";

const CommentDisplay = ({ comment, post, replyCm }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);

  return (
    <CommentCard comment={comment} post={post} commentId={comment._id}>
      <div style={{ marginLeft: 15 }}>
        {showRep.map(
          (item, index) =>
            item.reply && (
              <CommentCard
                key={index}
                comment={item}
                post={post}
                commentId={comment._id}
              />
            )
        )}

        {replyCm.length - next > 0 ? (
          <Typography
            variant="caption"
            color="secondary"
            style={{ paddingLeft: 15, fontWeight: "bold", cursor: "pointer" }}
            onClick={() => setNext(next + 10)}
          >
            See more replies...
          </Typography>
        ) : (
          replyCm.length > 1 && (
            <Typography
              variant="caption"
              color="secondary"
              style={{ paddingLeft: 15, fontWeight: "bold", cursor: "pointer" }}
              onClick={() => setNext(1)}
            >
              Hide replies...
            </Typography>
          )
        )}
      </div>
    </CommentCard>
  );
};

export default CommentDisplay;
