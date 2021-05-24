import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deletePost } from "../../../redux/actions/postAction";
import { BASE_URL } from "../../../utils/config";

// Material UI Components
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CopyIcon from "@material-ui/icons/FileCopy";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import VisibilityIcon from "@material-ui/icons/Visibility";

const PostHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleEditPost = () => {
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: { ...post, onEdit: true },
    });

    setAnchorEl(null);
    // history.push(`/post/edit/${post._id}`);
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost({ post, auth, socket }));
      setAnchorEl(null);
      return history.push("/");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
    setAnchorEl(null);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: "Link copied" },
    });
  };

  const ViewPostMenuLink = () => {
    return (
      <Link
        component="a"
        underline="none"
        variant="inherit"
        color="textSecondary"
        href={`/post/${post._id}`}
      >
        <MenuItem>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          View Post
        </MenuItem>
      </Link>
    );
  };

  const EditPostMenuLink = () => {
    return (
      <Link
        component="a"
        underline="none"
        variant="inherit"
        color="textSecondary"
      >
        <MenuItem onClick={handleEditPost}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit Post
        </MenuItem>
      </Link>
    );
  };

  const RemovePostMenuLink = () => {
    return (
      <Link
        component="a"
        underline="none"
        variant="inherit"
        color="textSecondary"
      >
        <MenuItem onClick={handleDeletePost}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Remove Post
        </MenuItem>
      </Link>
    );
  };

  const DropdownMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <ViewPostMenuLink />
        {auth.user._id === post.user._id && <EditPostMenuLink />}
        {auth.user._id === post.user._id && <RemovePostMenuLink />}
        <Link
          component="a"
          underline="none"
          variant="inherit"
          color="textSecondary"
        >
          <MenuItem onClick={handleCopyLink}>
            <ListItemIcon>
              <CopyIcon fontSize="small" />
            </ListItemIcon>
            Copy Link
          </MenuItem>
        </Link>
      </Menu>
    );
  };

  return (
    <CardHeader
      avatar={<Avatar alt={post.user.name} src={post.user.avatar} />}
      action={
        <>
          <IconButton
            aria-label="more"
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>
          <DropdownMenu />
        </>
      }
      title={
        <Link
          component="a"
          href={`/profile/${post.user._id}`}
          underline="none"
          variant="inherit"
          color="textPrimary"
          style={{ fontWeight: "bold" }}
        >
          {post.user.name}
        </Link>
      }
      subheader={<Moment fromNow>{post.createdAt}</Moment>}
    />
  );
};

export default PostHeader;
