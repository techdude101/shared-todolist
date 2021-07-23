import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import TodoList from './components/TodoList';

import './App.css';

function App() {
  return (
    <main className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path={`${window.location.pathname || ''}/list/:id`} component={TodoList} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
