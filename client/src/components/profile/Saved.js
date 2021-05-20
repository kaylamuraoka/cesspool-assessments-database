import React, { useState, useEffect } from "react";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../buttons/LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Typography from "@material-ui/core/Typography";
import PostCard from "../PostCard";
import Link from "@material-ui/core/Link";

const Saved = ({ auth, dispatch }) => {
  const [savePosts, setSavePosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    getDataAPI("getSavePosts", auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        setResult(res.data.result);
        setLoad(false);
      })
      .catch((err) => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            error: err.response.data.msg,
          },
        });
      });
    return () => setSavePosts([]);
  }, [auth.token, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token);
    setSavePosts(res.data.savePosts);
    setResult(res.data.result);
    setPage(page + 1);
    setLoad(false);
  };

  if (result === 0)
    return (
      <Typography
        color="textSecondary"
        variant="h6"
        align="center"
        style={{ fontWeight: "bold" }}
      >
        No posts yet
      </Typography>
    );

  return (
    <div>
      {savePosts.map((post) => (
        <Link key={post._id} href={`/post/${post._id}`}>
          <PostCard post={post} />
        </Link>
      ))}

      {load && <img src={LoadIcon} alt="Loading..." />}

      <LoadMoreBtn
        result={result}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Saved;
