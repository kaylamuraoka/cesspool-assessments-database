import React, { useState, useEffect } from "react";
import OsdsForm from "../components/form/OsdsForm";
import { getDataAPI } from "../utils/fetchData";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadIcon from "../images/loading.gif";
import { postDataInitialState } from "../utils/formData";
import { updatePost } from "../redux/actions/postAction";
// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  layout: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  title: {
    padding: theme.spacing(3, 0, 5),
  },
}));

const EditPost = () => {
  const classes = useStyles();

  const { auth, status } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const [postData, setPostData] = useState(postDataInitialState);

  const [images, setImages] = useState([]);
  const [tracks, setTracks] = useState("");

  const { id } = useParams();

  const fetchPost = async () => {
    setLoad(true);
    const res = await getDataAPI(`post/${id}`, auth.token);

    const data = res.data.post;

    setPostData(data);
    setImages(data.images);

    setLoad(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updatePost({ postData, images, auth, status }));
    if (tracks) tracks.stop();
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            className={classes.title}
          >
            Existing On-Site Sewer Disposal System (OSDS) Field Survey
          </Typography>
          <OsdsForm
            postData={postData}
            setPostData={setPostData}
            images={images}
            setImages={setImages}
            tracks={tracks}
            setTracks={setTracks}
          />
        </form>

        {load && <img src={LoadIcon} alt="Loading..." />}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Update
        </Button>
      </Paper>
    </main>
  );
};

export default EditPost;
