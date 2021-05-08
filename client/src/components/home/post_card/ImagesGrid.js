import React from "react";

import CardMedia from "@material-ui/core/CardMedia";

const ImagesGrid = ({ images, id }) => {
  return (
    <div id={`image${id}`}>
      {images.map((img, index) => (
        <div key={index} data-target={`#images${id}`}>
          <CardMedia
            style={{ height: "0", paddingTop: "56.25%" }}
            image={img.url}
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesGrid;
