import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../../redux/actions/profileAction";

import Button from "@material-ui/core/Button";

const FollowBtn = ({ user, size }) => {
  const [followed, setFollowed] = useState(false);

  const { auth, profile, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth.user.following, user._id]);

  const handleFollow = async () => {
    if (load) return;

    setFollowed(true);
    setLoad(true);
    await dispatch(follow({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  const handleUnFollow = async () => {
    if (load) return;

    setFollowed(false);
    setLoad(true);
    await dispatch(unfollow({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  return (
    <>
      {followed ? (
        <Button
          variant="outlined"
          color="secondary"
          size={size}
          onClick={handleUnFollow}
        >
          UnFollow
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          size={size}
          onClick={handleFollow}
        >
          Follow
        </Button>
      )}
    </>
  );
};

export default FollowBtn;
