import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './Components/Landing'
import Home from './Components/Home';
import CreateGame from './Components/CreateGame';
import Details from './Components/Details';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/home'>
          <Home />
        </Route>
        <Route exact path='/create'>
          <CreateGame />
        </Route>
        <Route exact path='/videogames/:id'>
          <Details />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
