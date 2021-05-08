import React from "react";
import ImagesGrid from "./ImagesGrid";
import Moment from "react-moment";

// Material UI Components
import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";

const PostBody = ({ post }) => {
  return (
    <>
      {post.images.length > 0 && (
        <ImagesGrid images={post.images} id={post._id} />
      )}
      <CardContent>
        {/* <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography> */}
        <p>
          <strong>Date/Time: </strong>
          <Moment>{post.dateTime}</Moment>
        </p>
        <p>
          <strong>Weather: </strong>
          {post.weather}
        </p>
        <p>
          <strong>Lot Occupied? </strong>
          {post.lotOccupied}
        </p>
        <p>
          <strong>OSDS Found? </strong>
          {post.osdsFound}
        </p>
        <p>
          <strong>Access Port Provided? </strong>
          {post.accessPortProvided}
        </p>
        <p>
          <strong>Number of Access Ports: </strong>
          {post.numOfAccessPorts}
        </p>
        <p>
          <strong>Port Size (in): </strong>
          {post.portSize}
        </p>
        <p>
          <strong>OSDS is: </strong>
          {post.osdsIs}
        </p>
        <p>
          <strong>Inlet Piping Found: </strong>
          {post.inletPipingFound}
        </p>
        <p>
          <strong>Inlet Piping Distance to finished ground (ft): </strong>
          {post.inletPipingDistance}
        </p>
        <p>
          <strong>Outlet Piping Found: </strong>
          {post.outletPipingFound}
        </p>
        <p>
          <strong>Outlet Piping Distance to finished ground (ft): </strong>
          {post.outletPipingDistance}
        </p>
        <p>
          If <strong>{post.liquid}</strong> found in OSDS, its distance to
          finished grade: {""}
          {post.liquidDistanceToFinishedGrade} ft
        </p>
        <p>
          <strong>OSDS Location: </strong>
          {post.osdsLocation}
        </p>
        <p>
          <strong>Right of Entry Issue: </strong>
          {post.rightOfEntryIssue}
        </p>
      </CardContent>
    </>
  );
};

export default PostBody;
