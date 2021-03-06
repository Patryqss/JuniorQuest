import React, { useState } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import './Views/style.css';
import Home from './Views/Home';
import Login from './Views/Login';
import Store from './Views/Store';
import CreateQuest from './Views/CreateQuest';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Drawer from './Views/Drawer';
import TreeTest from './Components/Tree/Test';

export const me = gql`
  query me {
    me {
      email
      fullName
      mentor {
        fullName
      }
      gold
      exp
    }
  }
`;

export const log_out = gql`
  mutation {
    signOut {
      message
    }
  }
`;

const App = () => {
  const { data, loading, error } = useQuery(me);
  const [logOut] = useMutation(log_out, { refetchQueries: () => [{ query: me }] });
  const [drawer, setDrawer] = useState(false);

 
  
  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message}`;

  if (!data.me && window.location.pathname !== '/login') return <Redirect to="/login" />;
  if (
    data.me &&
    (window.location.pathname !== '/' &&
      window.location.pathname !== '/store' &&
      window.location.pathname !== '/createQuest' &&
      window.location.pathname !== '/nodeTree')
  )
    return <Redirect to="/store" />;

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Drawer logOut={logOut} drawer={drawer} props={data.me}>
        <>
          <Home toggleDrawer={toggleDrawer}>
            <Route path="/store" component={Store} />
            <Route path="/createQuest" component={CreateQuest} />
            <Route path="/nodeTree" component={TreeTest} />
          </Home>
        </>
      </Drawer>
    </Switch>
  );
};

export default withRouter(App);
