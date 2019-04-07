import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage/HomePage.js'
import TaskEdit from './TaskView/TaskView.js'

class App extends Component {
  state = {
    objectId: null
  }

  liftingObjectId = (value) => {
    this.setState({objectId:value})
  }

  render() {
    return (
      <div className="App_container">
        <main>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/:id' exact render={props =>{
              return <TaskEdit objectID={props.match.params.id} />
            }} />
          </Switch>

        </main>
      </div>
    );
  }
}

export default App;
