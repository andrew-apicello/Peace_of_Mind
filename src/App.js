import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import CreateProfile from "./components/pages/CreateProfile";
import Login from "./components/pages/Login";

const App = () =>
  <Router>
    <div>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/createprofile" component={CreateProfile} />
      <Route exact path="/login" component={Login} />
    </div>
  </Router>;

export default App;
