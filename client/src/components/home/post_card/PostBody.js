import React from "react";
import ImagesGrid from "./ImagesGrid";
import Moment from "react-moment";

import TrueChip from "../../chips/TrueChip";

// Material UI Components
import CardContent from "@material-ui/core/CardContent";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const PostBody = ({ post }) => {
  return (
    <>
      {post.images.length > 0 && (
        <ImagesGrid images={post.images} id={post._id} />
      )}
      <CardContent>
        <p>
          <strong>Date/Time: </strong>
          <Moment format="MMM D YYYY @HH:mm a">{post.dateTime}</Moment>
        </p>
        <p>
          <strong>Record No: </strong>
          {post._id}
        </p>
        <p>
          <strong>TMK: </strong>
          {post.TMK}
        </p>
        <p>
          <strong>Location: </strong>
          {post.location}
        </p>
        <p>
          <strong>Property Owner: </strong>
          {post.propertyOwner}
        </p>
        <p>
          <strong>Contact Info: </strong>
          {post.propertyOwnerPhone && <p>Phone: {post.propertyOwnerPhone} </p>}
          {post.propertyOwnerEmail && <p>Email: {post.propertyOwnerEmail} </p>}
        </p>
        <p>
          <strong>Project Address: </strong>
          {post.projectAddress}
        </p>
        <p>
          <strong>Engineer: </strong>
          {post.engineer}
        </p>
        <p>
          <strong>Weather: </strong>
          {post.weather !== "Other" ? (
            <span>{post.weather}</span>
          ) : (
            <span>
              {post.weather}: {post.weatherOtherValue}
            </span>
          )}
        </p>
        <p>
          <strong>Lot Occupied? </strong>
          {post.lotOccupied !== "Other" ? (
            <span>{post.lotOccupied}</span>
          ) : (
            <span>
              {post.lotOccupied}: {post.lotOccupiedOtherValue}
            </span>
          )}
        </p>
        <p>
          <strong>OSDS Found? </strong>
          {post.osdsFound === "Yes" ? (
            <CheckIcon style={{ color: green[500] }} fontSize="small" />
          ) : (
            <CloseIcon style={{ color: red[500] }} fontSize="small" />
          )}
        </p>
        <p>
          <strong>Access Port Provided? </strong>
          {post.accessPortProvided && post.accessPortProvided === "Yes" ? (
            <CheckIcon style={{ color: green[500] }} fontSize="small" />
          ) : (
            <CloseIcon style={{ color: red[500] }} fontSize="small" />
          )}
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
          <strong>OSDS Is: </strong>
          {post.osdsIs.dry && <TrueChip label="Dry" />}
          {post.osdsIs.wet_water_scum && <TrueChip label="Wet (water/scum)" />}
          {post.osdsIs.wet_sludge && <TrueChip label="Wet (sludge)" />}
          {post.osdsIs.odorous && <TrueChip label="Odorous" />}
          {post.osdsIs.unknown && <TrueChip label="Unknown" />}
        </p>
        <p>
          <strong>Inlet Piping Found: </strong>
          {post.inletPipingFound === "Yes" ? (
            <CheckIcon style={{ color: green[500] }} fontSize="small" />
          ) : (
            <CloseIcon style={{ color: red[500] }} fontSize="small" />
          )}
        </p>
        <p>
          <strong>Inlet Piping Distance to finished ground (ft): </strong>
          {post.inletPipingDistance}
        </p>
        <p>
          <strong>Outlet Piping Found: </strong>
          {post.outletPipingFound === "Yes" ? (
            <CheckIcon style={{ color: green[500] }} fontSize="small" />
          ) : (
            <CloseIcon style={{ color: red[500] }} fontSize="small" />
          )}
        </p>
        <p>
          <strong>Outlet Piping Distance to finished ground (ft): </strong>
          {post.outletPipingDistance}
        </p>
        <p>
          {post.liquid && (
            <span>
              <strong>{post.liquid}</strong> found in OSDS.
            </span>
          )}
          {post.liquidDistanceToFinishedGrade && (
            <p>
              Its distance to finished grade: {""}{" "}
              <strong> {post.liquidDistanceToFinishedGrade} ft</strong>
            </p>
          )}
        </p>
        <p>
          <strong>OSDS Location: </strong>
          {post.osdsLocation.frontyard && <TrueChip label="Frontyard" />}
          {post.osdsLocation.backyard && <TrueChip label="Backyard" />}
          {post.osdsLocation.nextToBldg && <TrueChip label="Next To Bldg" />}
          {post.osdsLocation.other && (
            <TrueChip label={`Other: ${post.osdsLocation.otherValue}`} />
          )}
        </p>
        <p>
          <strong>Right of Entry Issue: </strong>
          {post.rightOfEntryIssue.none && <TrueChip label="None" />}
          {post.rightOfEntryIssue.fenced && <TrueChip label="Fenced" />}
          {post.rightOfEntryIssue.gated && <TrueChip label="Gated" />}
          {post.rightOfEntryIssue.dogs && <TrueChip label="Dogs" />}
          {post.rightOfEntryIssue.other && (
            <TrueChip label={`Other: ${post.rightOfEntryIssue.otherValue}`} />
          )}
        </p>
      </CardContent>
    </>
  );
};

export default PostBody;
