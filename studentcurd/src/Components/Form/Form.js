import { React, useState, useEffect } from "react";
import useStyle from "./style";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({curId, setcurId}) => {

  const post  = useSelector((state)=> curId ? state.posts.find((p)=> p._id === curId) : null)

  const [postData, setpostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectFile: "",
  });
  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(post) setpostData(post)
    console.log('post founded')
  }, [post])

  const handleEvent = (e) => {
    e.preventDefault();

    if(curId){
      dispatch(updatePost(curId, postData))
    }else{
      dispatch(createPost(postData));
    }
    clear();
  };

  const clear = () => {
    setcurId(null);
    setpostData({creator: "", title: "", message: "", tags: "", selectFile: "",})
  };

  return (
    <>
      <Paper className={classes.paper}>
        <form
          autoCapitalize="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleEvent}
        >
          <Typography variant="h6"> {curId ? 'Editing' : 'Capturing'} Memories</Typography>
          <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            value={postData.creator}
            onChange={(e) =>
              setpostData({ ...postData, creator: e.target.value })
            }
          />
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setpostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setpostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) => setpostData({ ...postData, tags: e.target.value })}
          />

          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setpostData({ ...postData, selectFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>

          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
