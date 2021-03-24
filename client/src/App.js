import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Register from './components/Register';

import PrivateRoute from './routing/PrivateRoute';
import Profile from './components/Profile';

import { fetchUser } from './actions/auth';

function App() {
  useEffect(() => {
    store.dispatch(fetchUser());
  });
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Welcome} />
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
