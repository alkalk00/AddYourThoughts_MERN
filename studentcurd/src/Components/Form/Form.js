import { React, useState, useEffect } from "react";
import useStyle from "./style";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({curId, setcurId}) => {

  const post  = useSelector((state)=> curId ? state.posts.find((p)=> p._id === curId) : null)
  const user = JSON.parse(localStorage.getItem('profile'));

  const [postData, setpostData] = useState({
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
      dispatch(updatePost(curId, { ...postData, name: user?.result?.name }))
    }else{
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  const clear = () => {
    setcurId(null);
    setpostData({title: "", message: "", tags: "", selectFile: "",})
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }
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
