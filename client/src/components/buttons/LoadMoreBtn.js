import React from "react";

// Material UI Components
import Button from "@material-ui/core/Button";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
  return (
    <>
      {result < 9 * (page - 1)
        ? ""
        : !load && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLoadMore}
              startIcon={<ArrowDownwardIcon />}
              style={{ width: 150 }}
            >
              Load More
            </Button>
          )}
    </>
  );
};

export default LoadMoreBtn;
