import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import gql from 'graphql-tag';

import Home from './Views/Home';
import Login from './Views/Login';
import Store from './Views/Store';
import CreateQuest from './Views/CreateQuest';
import { useQuery } from '@apollo/react-hooks';
import { Container } from 'semantic-ui-react';
import Drawer from './Views/Drawer';

export const me = gql`
  query me {
    me {
      email
      fullName
    }
  }
`;

const App = () => {
  const { data, loading, error } = useQuery(me);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message}`;

  if (!data.me && window.location.pathname !== '/login') return <Redirect to="/login" />;
  // if (data.me && window.location.pathname !== '/') return <Redirect to="/" />;
  const {email, name, mentor, gold, level} = data.me;
  console.log("Data me:");
  console.log(data.me);
  console.log(email);

  return (
    <Switch>
      {/* <Container> */}
        <Route path="/login" component={Login} />
      {/* </Container> */}
      <Drawer email={email} name={name} mentor={mentor} gold={gold} level={level}>
        <Container>
          <Route path="/store" component={Store} />
          <Route path="/createQuest" component={CreateQuest} />
          <Route path="/" component={Home} />
        </Container>
      </Drawer>
    </Switch>
  );
};

export default withRouter(App);
