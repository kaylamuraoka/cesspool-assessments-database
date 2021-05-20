import React from "react";
import Moment from "react-moment";

import TrueChip from "../chips/TrueChip";

import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const DataTable = ({ posts, load }) => {
  let newPostsArr = [];
  for (let i = 0; i < posts.length; i++) {
    let weather = "";
    let lotOccupied = "";

    if (posts[i].weather === "Other") {
      weather = `${posts[i].weather}: ${posts[i].weatherOtherValue}`;
    } else {
      weather = posts[i].weather;
    }

    if (posts[i].lotOccupied === "Other") {
      lotOccupied = `${posts[i].lotOccupied}: ${posts[i].lotOccupiedOtherValue}`;
    } else {
      lotOccupied = posts[i].lotOccupied;
    }

    // if (posts[i].osdsFound === "Yes") {
    //   osdsFound = <CheckIcon style={{ color: green[500] }} />;
    // } else {
    //   osdsFound = <CloseIcon style={{ color: red[500] }} />;
    // }

    newPostsArr.push({
      id: i + 1,
      dateTime: posts[i].dateTime,
      recordNum: posts[i]._id,
      TMK: posts[i].TMK,
      location: posts[i].location,
      propertyOwner: posts[i].propertyOwner,
      contactInfo: `Phone: ${posts[i].propertyOwnerPhone} Email: ${posts[i].propertyOwnerPhone}`,
      projectAddress: posts[i].projectAddress,
      engineer: posts[i].engineer,
      contractor: posts[i].contractor,
      weather: weather,
      lotOccupied: lotOccupied,
      osdsFound: posts[i].osdsFound,
      accessPortProvided: posts[i].accessPortProvided,
      numOfAccessPorts: posts[i].numOfAccessPorts,
      portSize: posts[i].portSize,
      osdsIs: posts[i].osdsIs,
      inletPipingFound: posts[i].inletPipingFound,
    });
  }

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    {
      field: "dateTime",
      headerName: "Date/Time",
      width: 100,
    },
    {
      field: "recordNum",
      headerName: "Record No",
      width: 160,
    },
    {
      field: "TMK",
      headerName: "TMK",
      width: 170,
    },
    {
      field: "location",
      headerName: "Location",
      width: 140,
    },
    {
      field: "propertyOwner",
      headerName: "Property Owner",
      width: 200,
    },
    {
      field: "contactInfo",
      headerName: "Contact Info",
      width: 200,
    },
    {
      field: "projectAddress",
      headerName: "Project Address",
      width: 200,
    },
    {
      field: "city",
      headerName: "City",
      width: 200,
    },
    {
      field: "engineer",
      headerName: "Engineer",
      width: 200,
    },
    {
      field: "contractor",
      headerName: "Contractor",
      width: 200,
    },
    {
      field: "weather",
      headerName: "Weather",
      width: 150,
    },
    {
      field: "lotOccupied",
      headerName: "Lot Occupied?",
      width: 150,
    },
    {
      field: "osdsFound",
      headerName: "OSDS Found?",
      width: 150,
    },
    {
      field: "accessPortProvided",
      headerName: "Access Port Provided?",
      width: 150,
    },
    {
      field: "numOfAccessPorts",
      headerName: "Num of Access Ports",
      width: 150,
    },
    {
      field: "portSize",
      headerName: "Port Size (in)",
      width: 150,
    },
    {
      field: "osdsIs",
      headerName: "OSDS Is:",
      width: 150,
    },
    {
      field: "inletPipingFound",
      headerName: "Inlet Piping Found?",
      width: 150,
    },
  ];

  // <TableCell align="right">
  //   Distance to finished ground&nbsp;(ft)
  // </TableCell>
  // <TableCell>Outlet Piping Found?</TableCell>
  // <TableCell>Distance to finished ground&nbsp;(ft)</TableCell>
  // <TableCell>Sentence&nbsp;(ft)</TableCell>
  // <TableCell>OSDS Location</TableCell>
  // <TableCell>Right of Entry Issue</TableCell>
  // <TableCell>Property is on...</TableCell>
  // <TableCell>OSDS is still in Service?</TableCell>
  // <TableCell>Number of Bedrooms</TableCell>
  // <TableCell>Number of OSDS Units</TableCell>
  // <TableCell>Total Volume</TableCell>
  // <TableCell>Solids pumped out every</TableCell>
  // <TableCell>
  //   Does the OSDS unit have an overflow pipe to public sewer?
  // </TableCell>
  // <TableCell>OSDS Type</TableCell>
  // <TableCell>Best Day/Time for Future Visit</TableCell>
  // <TableCell>Contact Name</TableCell>
  // <TableCell>Contact Phone</TableCell>
  // <TableCell>Contact Email</TableCell>
  // <TableCell>Mailing Address</TableCell>
  // <TableCell>Additional Notes</TableCell>

  //     <TableCell align="right">
  //       {post.accessPortProvided &&
  //       post.accessPortProvided === "Yes" ? (
  //         <CheckIcon style={{ color: green[500] }} />
  //       ) : (
  //         <CloseIcon style={{ color: red[500] }} />
  //       )}
  //     </TableCell>
  //     <TableCell align="right">{post.numOfAccessPorts}</TableCell>
  //     <TableCell align="right">{post.portSize}</TableCell>
  //     <TableCell align="right">
  //       {post.osdsIs.dry && <TrueChip label="Dry" />}
  //       {post.osdsIs.wet_water_scum && (
  //         <TrueChip label="Wet (water/scum)" />
  //       )}
  //       {post.osdsIs.wet_sludge && <TrueChip label="Wet (sludge)" />}
  //       {post.osdsIs.odorous && <TrueChip label="Odorous" />}
  //       {post.osdsIs.unknown && <TrueChip label="Unknown" />}
  //     </TableCell>
  //     <TableCell align="right">
  //       {post.inletPipingFound === "Yes" ? (
  //         <CheckIcon style={{ color: green[500] }} />
  //       ) : (
  //         <CloseIcon style={{ color: red[500] }} />
  //       )}
  //     </TableCell>
  //     <TableCell align="right">{post.inletPipingDistance}</TableCell>
  //     <TableCell align="right">
  //       {post.outletPipingFound === "Yes" ? (
  //         <CheckIcon style={{ color: green[500] }} />
  //       ) : (
  //         <CloseIcon style={{ color: red[500] }} />
  //       )}
  //     </TableCell>
  //     <TableCell align="right">{post.outletPipingDistance}</TableCell>
  //     <TableCell align="right">
  //       {post.liquid && (
  //         <span>
  //           <strong>{post.liquid}</strong> found in OSDS.
  //         </span>
  //       )}
  //       {post.liquidDistanceToFinishedGrade && (
  //         <p>
  //           Its distance to finished grade: {""}{" "}
  //           <strong> {post.liquidDistanceToFinishedGrade} ft</strong>
  //         </p>
  //       )}
  //     </TableCell>
  //     <TableCell align="right">
  //       {post.osdsLocation.frontyard && (
  //         <TrueChip label="Frontyard" />
  //       )}
  //       {post.osdsLocation.backyard && <TrueChip label="Backyard" />}
  //       {post.osdsLocation.nextToBldg && (
  //         <TrueChip label="Next To Bldg" />
  //       )}
  //       {post.osdsLocation.other && (
  //         <TrueChip
  //           label={`Other: ${post.osdsLocation.otherValue}`}
  //         />
  //       )}
  //     </TableCell>
  //     <TableCell align="right">
  //       {post.rightOfEntryIssue.none && <TrueChip label="None" />}
  //       {post.rightOfEntryIssue.fenced && <TrueChip label="Fenced" />}
  //       {post.rightOfEntryIssue.gated && <TrueChip label="Gated" />}
  //       {post.rightOfEntryIssue.dogs && <TrueChip label="Dogs" />}
  //       {post.rightOfEntryIssue.other && (
  //         <TrueChip
  //           label={`Other: ${post.rightOfEntryIssue.otherValue}`}
  //         />
  //       )}
  //     </TableCell>
  //     <TableCell align="right">{post.propertyLocation}</TableCell>
  //     <TableCell align="right">{post.osdsInService}</TableCell>
  //     <TableCell align="right">{post.numOfBedrooms}</TableCell>
  //     <TableCell align="right">{post.numOfOsdsUnits}</TableCell>
  //     <TableCell align="right">{post.totalVolume}</TableCell>
  //     <TableCell align="right">
  //       {post.solidPumpInterval !== "Other" ? (
  //         <span>{post.solidPumpInterval}</span>
  //       ) : (
  //         <span>
  //           {post.solidPumpInterval}:{" "}
  //           {post.solidPumpIntervalOtherValue}
  //         </span>
  //       )}
  //     </TableCell>
  //     <TableCell align="right">{post.overflowPipeToSewer}</TableCell>
  //     <TableCell align="right">
  //       {post.osdsType !== "Other" ? (
  //         <span>{post.osdsType}</span>
  //       ) : (
  //         <span>
  //           {post.osdsType}: {post.osdsTypeOtherValue}
  //         </span>
  //       )}
  //     </TableCell>
  //     <TableCell align="right">{post.bestDayTimeForVisit}</TableCell>
  //     <TableCell align="right">{post.contactName}</TableCell>
  //     <TableCell align="right">{post.contactPhone}</TableCell>
  //     <TableCell align="right">{post.email}</TableCell>
  //     <TableCell align="right">{post.mailingAddress}</TableCell>
  //     <TableCell align="right">{post.additionalNotes}</TableCell>
  //   </TableRow>
  // ))}

  const rows = newPostsArr;

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          loading={load}
          rows={rows}
          columns={columns}
          pagination
          pageSize={10}
          components={{
            Toolbar: GridToolbar,
          }}
          checkboxSelection
        />
      </div>
      {/* <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date/Time</TableCell>
              <TableCell>Record No</TableCell>
              <TableCell>TMK</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Property Owner</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>Project Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Engineer</TableCell>
              <TableCell>Contractor</TableCell>
              <TableCell align="right">Weather</TableCell>
              <TableCell align="right">Lot Occupied?</TableCell>
              <TableCell align="right">OSDS Found?</TableCell>
              <TableCell align="right">Access Port Provided?</TableCell>
              <TableCell align="right">Num of Access Ports</TableCell>
              <TableCell align="right">Port Size&nbsp;(in)</TableCell>
              <TableCell align="right">OSDS Is:</TableCell>
              <TableCell align="right">Inlet Piping Found?</TableCell>
              <TableCell align="right">
                Distance to finished ground&nbsp;(ft)
              </TableCell>
              <TableCell>Outlet Piping Found?</TableCell>
              <TableCell>Distance to finished ground&nbsp;(ft)</TableCell>
              <TableCell>Sentence&nbsp;(ft)</TableCell>
              <TableCell>OSDS Location</TableCell>
              <TableCell>Right of Entry Issue</TableCell>
              <TableCell>Property is on...</TableCell>
              <TableCell>OSDS is still in Service?</TableCell>
              <TableCell>Number of Bedrooms</TableCell>
              <TableCell>Number of OSDS Units</TableCell>
              <TableCell>Total Volume</TableCell>
              <TableCell>Solids pumped out every</TableCell>
              <TableCell>
                Does the OSDS unit have an overflow pipe to public sewer?
              </TableCell>
              <TableCell>OSDS Type</TableCell>
              <TableCell>Best Day/Time for Future Visit</TableCell>
              <TableCell>Contact Name</TableCell>
              <TableCell>Contact Phone</TableCell>
              <TableCell>Contact Email</TableCell>
              <TableCell>Mailing Address</TableCell>
              <TableCell>Additional Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {load && <img src={LoadIcon} alt="Loading..." />} */}
    </>
  );
};

export default DataTable;
