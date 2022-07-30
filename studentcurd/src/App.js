import { React } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route exact path='/'  element={<Home/>} />
          <Route exact path='/auth'  element={<Auth/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
