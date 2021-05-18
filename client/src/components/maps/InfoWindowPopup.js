import React from "react";

import PostBody from "../home/post_card/PostBody";
import Card from "@material-ui/core/Card";

const InfoWindowPopup = ({ selected }) => {
  return (
    <Card>
      <PostBody post={selected} />
    </Card>
  );
};
export default InfoWindowPopup;
