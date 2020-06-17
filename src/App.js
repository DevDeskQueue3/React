import React from 'react';
import { Route } from "react-router-dom";
import HelperLogin from "./components/helper/Login";
import HelperRegister from "./components/helper/Register";
import StudentLogin from './components/student/Login';
import StudentRegister from './components/student/Register';

const App = () => {
  return (
    <div className="App">
      <Route path="/helper/login" component={HelperLogin} />
      <Route path="/helper/signup" component={HelperRegister} />
      <Route path="/student/login" component={StudentLogin} />
      <Route path="/student/register" component={StudentRegister} />
    </div>
  );
};

export default App;
