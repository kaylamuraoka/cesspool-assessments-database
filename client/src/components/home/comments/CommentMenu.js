import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../redux/actions/commentAction";

// Material UI Components
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EditIcon from "@material-ui/icons/Edit";

const CommentMenu = ({ post, comment, setOnEdit }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({ post, auth, comment, socket }));
    }
    setAnchorEl(null);
  };

  const EditLink = () => {
    return (
      <MenuItem
        onClick={() => {
          setOnEdit(true);
          setAnchorEl(null);
        }}
        dense
      >
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit" noWrap>
          Edit
        </Typography>
      </MenuItem>
    );
  };

  const DeleteLink = () => {
    return (
      <MenuItem onClick={handleRemove} dense>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit" noWrap>
          Remove
        </Typography>
      </MenuItem>
    );
  };
  const MenuItemLink = () => {
    return (
      <div>
        <EditLink />
        <DeleteLink />
      </div>
    );
  };

  return (
    <>
      {(post.user._id === auth.user._id ||
        comment.user._id === auth.user._id) && (
        <div>
          <IconButton
            aria-label="more"
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            style={{ paddingTop: 5, paddingBottom: 5 }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            aria-labelledby="more"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {post.user._id === auth.user._id ? (
              comment.user._id === auth.user._id ? (
                MenuItemLink()
              ) : (
                <MenuItem onClick={handleRemove} dense>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit" noWrap>
                    Remove
                  </Typography>
                </MenuItem>
              )
            ) : (
              comment.user._id === auth.user._id && MenuItemLink()
            )}
          </Menu>
        </div>
      )}
    </>
  );
};

export default CommentMenu;
