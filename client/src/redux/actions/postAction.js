import { GLOBALTYPES } from "./globalTypes";
import { postImageUpload } from "../../utils/imageUpload";
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from "../../utils/fetchData";
import { validPost } from "../../utils/valid";
import { createNotify, removeNotify } from "./notifyAction";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST: "LOADING_POST",
  GET_POSTS: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
  GET_POST: "GET_POST",
  DELETE_POST: "DELETE_POST",
};

export const createPost = ({ postData, images, auth, socket }) => async (
  dispatch
) => {
  const check = validPost(postData);
  if (check.errLength > 0)
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });

  let media = [];
  try {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: true,
      },
    });

    if (images.length > 0) media = await postImageUpload(images);

    const res = await postDataAPI(
      "posts",
      {
        ...postData,
        images: media,
      },
      auth.token
    );

    dispatch({
      type: POST_TYPES.CREATE_POST,
      payload: { ...res.data.newPost, user: auth.user },
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
        loading: false,
      },
    });

    // Notify
    const msg = {
      id: res.data.newPost._id,
      text: "added a new post.",
      recipients: res.data.newPost.user.followers,
      url: `/post/${res.data.newPost._id}`,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
    const res = await getDataAPI("posts", token);

    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: 2 },
    });

    dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const updatePost = ({ postData, images, auth, status }) => async (
  dispatch
) => {
  let media = [];
  const imgNewUrl = images.filter((img) => !img.url);
  const imgOldUrl = images.filter((img) => img.url);

  if (
    status.postData === postData &&
    imgNewUrl.length === 0 &&
    imgOldUrl.length === status.images.length
  )
    return;

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    if (imgNewUrl.length > 0) media = await postImageUpload(imgNewUrl);

    const res = await patchDataAPI(
      (`post/${status._id}`,
      {
        ...postData,
        images: [...imgOldUrl, ...media],
      },
      auth.token)
    );

    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: res.data.newPost,
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.msg, loading: false },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const likePost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, likes: [...post.likes, auth.user] };
  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

  socket.emit("likePost", newPost);

  try {
    await patchDataAPI(`post/${post._id}/like`, null, auth.token);

    // Notify
    const msg = {
      id: auth.user._id,
      text: "liked your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
    };

    dispatch(createNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const unlikePost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = {
    ...post,
    likes: post.likes.filter((like) => like._id !== auth.user._id),
  };
  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

  socket.emit("unlikePost", newPost);

  try {
    await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);

    // Notify
    const msg = {
      id: auth.user._id,
      text: "liked your post.",
      recipients: [post.user._id],
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const getPost = ({ detailPost, id, auth }) => async (dispatch) => {
  if (detailPost.every((post) => post._id !== id)) {
    try {
      const res = await getDataAPI(`post/${id}`, auth.token);
      dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  }
};

export const deletePost = ({ post, auth, socket }) => async (dispatch) => {
  dispatch({
    type: POST_TYPES.DELETE_POST,
    payload: post,
  });

  socket.emit("deletePost", post);

  try {
    const res = await deleteDataAPI(`post/${post._id}`, auth.token);

    // Notify
    const msg = {
      id: post._id,
      text: "added a new post.",
      recipients: res.data.newPost.user.followers,
      url: `/post/${post._id}`,
    };

    dispatch(removeNotify({ msg, auth, socket }));
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const savePost = ({ post, auth }) => async (dispatch) => {
  const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] };
  dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

  try {
    await patchDataAPI(`/savePost/${post._id}`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const unsavePost = ({ post, auth }) => async (dispatch) => {
  const newUser = {
    ...auth.user,
    saved: auth.user.saved.filter((id) => id !== post._id),
  };
  dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

  try {
    await patchDataAPI(`/unsavePost/${post._id}`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
