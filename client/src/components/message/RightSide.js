import React, { useEffect, useState, useRef } from "react";
import UserCard from "../UserCard";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import MsgDisplay from "./MsgDisplay";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { imageUpload } from "../../utils/imageUpload";
import {
  addMessage,
  getMessages,
  loadMoreMessages,
  deleteConversation,
} from "../../redux/actions/messageAction";

// Material UI Components
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import PhotoIcon from "@material-ui/icons/Photo";
import CircularProgress from "@material-ui/core/CircularProgress";

const RightSide = () => {
  const { auth, message, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [loadImages, setLoadImages] = useState(false);

  const refDisplay = useRef();
  const pageEnd = useRef();

  const [data, setData] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const newData = message.data.find((item) => item._id === id);
    if (newData) {
      setData(newData.messages);
      setResult(newData.result);
      setPage(newData.page);
    }
  }, [message.data, id]);

  useEffect(() => {
    if (id && message.users.length > 0) {
      setTimeout(() => {
        refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 50);
      const newUser = message.users.find((user) => user._id === id);
      if (newUser) setUser(newUser);
    }
  }, [message.users, id]);

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.size > 1024 * 1024)
        return (err =
          "The file that you are trying to upload exceeds the 1 MB size limit. Please select a file less than 1 MB.");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        err = "Invalid File format. You may only upload JPG, JPEG, PNG files.";

      return newImages.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && images.length === 0) return;
    setText("");
    setImages([]);
    setLoadImages(true);

    let newArr = [];
    if (images.length > 0) newArr = await imageUpload(images);

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };

    setLoadImages(false);
    dispatch(addMessage({ msg, auth, socket }));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    const getMessagesData = async () => {
      if (message.data.every((item) => item._id !== id)) {
        await dispatch(getMessages({ auth, id }));
        setTimeout(() => {
          refDisplay.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 50);
      }
    };
    getMessagesData();
  }, [id, dispatch, auth, message.data]);

  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadMore((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setIsLoadMore]);

  useEffect(() => {
    if (isLoadMore > 1) {
      if (result >= page * 9) {
        dispatch(loadMoreMessages({ auth, id, page: page + 1 }));
        setIsLoadMore(1);
      }
    }
    // esLint-disable-next-line
  }, [isLoadMore, auth, dispatch, id, page, result]);

  const handleDeleteConversation = () => {
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      dispatch(deleteConversation({ auth, id }));
      return history.push("/messages");
    }
  };

  return (
    <>
      <div className="message_header">
        {user.length !== 0 && (
          <List
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              width: "100%",
            }}
          >
            <UserCard user={user}>
              <div>
                <IconButton
                  onClick={handleDeleteConversation}
                  style={{ padding: 4, marginRight: -2 }}
                >
                  <DeleteIcon color="error" fontSize="small" />
                </IconButton>
              </div>
            </UserCard>
          </List>
        )}
      </div>

      <div
        className="chat_container"
        style={{ height: images.length > 0 ? "calc(100% - 180px)" : "" }}
      >
        <div className="chat_display" ref={refDisplay}>
          <button style={{ marginTop: "-25px", opacity: 0 }} ref={pageEnd}>
            Load More
          </button>

          {data.map((msg, index) => (
            <div key={index}>
              {msg.sender !== auth.user._id && (
                <div className="chat_row other_message">
                  <MsgDisplay user={user} msg={msg} />
                </div>
              )}

              {msg.sender === auth.user._id && (
                <div className="chat_row my_message">
                  <MsgDisplay user={auth.user} msg={msg} data={data} />
                </div>
              )}
            </div>
          ))}

          {loadImages && (
            <div className="chat_row my_message">
              <CircularProgress style={{ margin: 10 }} />
            </div>
          )}
        </div>
      </div>

      <div
        className="show_media"
        style={{ display: images.length > 0 ? "grid" : "none" }}
      >
        {images.map((image, index) => (
          <div key={index} id="file_media">
            <img
              src={
                image.camera
                  ? image.camera
                  : image.url
                  ? image.url
                  : URL.createObjectURL(image)
              }
              alt="images"
            />
            <span onClick={() => deleteImages(index)}> &times;</span>
          </div>
        ))}
      </div>

      <form className="chat_input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="file_upload">
          <input
            type="file"
            name="file"
            id="file"
            multiple
            accept="image/*"
            onChange={handleChangeImages}
          />
          <label htmlFor="file">
            <IconButton aria-label="upload picture" component="span">
              <PhotoIcon fontSize="small" color="primary" />
            </IconButton>
          </label>
        </div>

        <IconButton
          type="submit"
          disabled={text || images.length > 0 ? false : true}
          size="small"
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </form>
    </>
  );
};

export default RightSide;
