import {React, useEffect, useState} from "react";
import {Container, Grid, Grow} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {getPosts} from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'

const Home = () => {
  const [curId, setcurId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          direction="coloum-reverse"
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setcurId={setcurId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form curId={curId} setcurId={setcurId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
