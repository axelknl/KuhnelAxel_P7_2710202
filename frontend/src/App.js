import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/account" exact component={Account}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;