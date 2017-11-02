import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";

const App = () =>
  <Router>
    <div>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/createprofile" component={CreateProfile} />
    </div>
  </Router>;

export default App;
