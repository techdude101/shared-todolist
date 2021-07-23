import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import TodoList from './components/TodoList';

import './App.css';

function App() {
  return (
    <main className="App">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route exact path="/list/:id" component={TodoList} />
      </Switch>
    </main>
  );
}

export default App;
