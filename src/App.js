import React, { Component } from 'react';
import {Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';

import Plants from './containers/Plants/Plants';
import Users from './containers/Users/Users';
import Home from './containers/Home/Home';

class App extends Component {
render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/users" component={Users} />
            <Route path="/plants" component={Plants} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
