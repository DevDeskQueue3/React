import React, { useEffect } from 'react';
import { Route, useHistory } from "react-router-dom";
import HelperLogin from "./components/helper/Login";
import HelperRegister from "./components/helper/Register";
import StudentLogin from './components/student/Login';
import StudentRegister from './components/student/Register';

import './App.css';
import PrivateRoute from './components/PrivateRoute';
import TicketDashboard from './components/ticket/TicketDashboard';
import TicketForm from './components/ticket/TicketForm';

const App = () => {
  const { location, push } = useHistory();

  useEffect(() => {
    if(location.pathname === "/") {
      push("/student/login");
    }
  }, [location.pathname, push]);

  return (
    <div className="App">
      <Route path="/helper/login" component={HelperLogin} />
      <Route path="/helper/signup" component={HelperRegister} />
      <Route path="/student/login" component={StudentLogin} />
      <Route path="/student/signup" component={StudentRegister} />
      <PrivateRoute path = "/tickets" component = {TicketDashboard} />
      <Route path="/tickets/create" component={TicketForm} />
    </div>
  );
};

export default App;
