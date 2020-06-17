import React from 'react';
import { Route } from "react-router-dom";
import HelperLogin from "./components/helper/Login";
import HelperRegister from "./components/helper/Register";

const App = () => {
  return (
    <div className = "App">
      <Route path = "/helper/login" component = {HelperLogin} />
      <Route path = "/helper/signup" component = {HelperRegister} />
    </div>
  );
};

export default App;
