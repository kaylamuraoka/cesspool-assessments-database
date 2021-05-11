import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import LoadIcon from "../../images/loading.gif";
import { getAllPosts } from "../../redux/actions/postAction";
import { POST_TYPES } from "../../redux/actions/postAction";
import { getDataAPI } from "../../utils/fetchData";
import TrueChip from "../chips/TrueChip";

// Material UI Components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import TablePagination from "@material-ui/core/TablePagination";

const DataTable = () => {
  const { homePosts, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  // const handleLoadMore = async () => {
  //   setLoad(true);
  //   const res = await getDataAPI(
  //     `posts?limit=${homePosts.page * 9}`,
  //     auth.token
  //   );

  //   dispatch({
  //     type: POST_TYPES.GET_POSTS,
  //     payload: { ...res.data, page: homePosts.page + 1 },
  //   });

  //   setLoad(false);
  // };

  useEffect(async () => {
    const totalRows = await getDataAPI(`posts`, auth.token);
    console.log(totalRows);

    const res = await getDataAPI(`posts?limit=${page * limit}`, auth.token);
    console.log(res);
    // if (auth.token) {
    //   dispatch(getAllPosts(auth.token, page, limit));
    // }
  }, [auth.token, page, limit]);

  // useEffect(() => {
  //   setLoad(true);

  //   const res = getDataAPI(`posts?limit=${page * limit}`, auth.token);

  //   console.log(res);

  //   setLoad(false);
  // }, [page, limit]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date/Time</TableCell>
              <TableCell>Record No</TableCell>
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
              <TableCell align="right">Outlet Piping Found?</TableCell>
              <TableCell align="right">
                Distance to finished ground&nbsp;(ft)
              </TableCell>
              <TableCell align="right">Sentence&nbsp;(ft)</TableCell>
              <TableCell align="right">OSDS Location</TableCell>
              <TableCell align="right">Right of Entry Issue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {load && <img src={LoadIcon} alt="Loading..." />}

            {homePosts.posts.map((post) => (
              <TableRow key={post._id}>
                <TableCell component="th" scope="row">
                  <Moment format="MM-DD-YYYY h:mm:ss">{post.dateTime}</Moment>
                </TableCell>
                <TableCell component="th" scope="row">
                  {post.recordNum}
                </TableCell>
                <TableCell component="th" scope="row">
                  {post.weather !== "Other" ? (
                    <span>{post.weather}</span>
                  ) : (
                    <span>
                      {post.weather}: {post.weatherOtherValue}
                    </span>
                  )}
                </TableCell>
                <TableCell align="right">
                  {post.lotOccupied !== "Other" ? (
                    <span>{post.lotOccupied}</span>
                  ) : (
                    <span>
                      {post.lotOccupied}: {post.lotOccupiedOtherValue}
                    </span>
                  )}
                </TableCell>
                <TableCell align="right">
                  {post.osdsFound === "Yes" ? (
                    <CheckIcon style={{ color: green[500] }} />
                  ) : (
                    <CloseIcon style={{ color: red[500] }} />
                  )}
                </TableCell>
                <TableCell align="right">
                  {post.accessPortProvided &&
                  post.accessPortProvided === "Yes" ? (
                    <CheckIcon style={{ color: green[500] }} />
                  ) : (
                    <CloseIcon style={{ color: red[500] }} />
                  )}
                </TableCell>
                <TableCell align="right">{post.numOfAccessPorts}</TableCell>
                <TableCell align="right">{post.portSize}</TableCell>
                <TableCell align="right">
                  {post.osdsIs.dry && <TrueChip label="Dry" />}
                  {post.osdsIs.wet_water_scum && (
                    <TrueChip label="Wet (water/scum)" />
                  )}
                  {post.osdsIs.wet_sludge && <TrueChip label="Wet (sludge)" />}
                  {post.osdsIs.odorous && <TrueChip label="Odorous" />}
                  {post.osdsIs.unknown && <TrueChip label="Unknown" />}
                </TableCell>
                <TableCell align="right">
                  {post.inletPipingFound === "Yes" ? (
                    <CheckIcon style={{ color: green[500] }} />
                  ) : (
                    <CloseIcon style={{ color: red[500] }} />
                  )}
                </TableCell>
                <TableCell align="right">{post.inletPipingDistance}</TableCell>
                <TableCell align="right">
                  {post.outletPipingFound === "Yes" ? (
                    <CheckIcon style={{ color: green[500] }} />
                  ) : (
                    <CloseIcon style={{ color: red[500] }} />
                  )}
                </TableCell>
                <TableCell align="right">{post.outletPipingDistance}</TableCell>
                <TableCell align="right">
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
                </TableCell>
                <TableCell align="right">
                  {post.osdsLocation.frontyard && (
                    <TrueChip label="Frontyard" />
                  )}
                  {post.osdsLocation.backyard && <TrueChip label="Backyard" />}
                  {post.osdsLocation.nextToBldg && (
                    <TrueChip label="Next To Bldg" />
                  )}
                  {post.osdsLocation.other && (
                    <TrueChip
                      label={`Other: ${post.osdsLocation.otherValue}`}
                    />
                  )}
                </TableCell>
                <TableCell align="right">
                  {post.rightOfEntryIssue.none && <TrueChip label="None" />}
                  {post.rightOfEntryIssue.fenced && <TrueChip label="Fenced" />}
                  {post.rightOfEntryIssue.gated && <TrueChip label="Gated" />}
                  {post.rightOfEntryIssue.dogs && <TrueChip label="Dogs" />}
                  {post.rightOfEntryIssue.other && (
                    <TrueChip
                      label={`Other: ${post.rightOfEntryIssue.otherValue}`}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[
          10,
          25,
          50,
          { label: "All", value: homePosts.result },
        ]}
        component="div"
        count={homePosts.result}
        rowsPerPage={limit}
        page={page}
        onChangePage={(newPage) => setPage(newPage)}
        onChangeRowsPerPage={(event) => {
          setLimit(parseInt(event.target.value, 10));
          setPage(1);
        }}
      />
    </>
  );
};

export default DataTable;
