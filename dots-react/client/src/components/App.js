import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';

import Home from './Home/Home.js';
import Wizard from './Wizard/Wizard.js';

function App() {
  const setHeight = () => {
    var height = window.innerHeight

    document.body.style.height = height + "px";
  }
  
  useEffect(() => {
    window.addEventListener('resize', setHeight);
    setHeight();
  }, []) 

  return (
    <Router>
      <Switch>
        <Route path="/wizard">
          <Redirect to="/wizard/0" />
          <Route
            path="/wizard/:id"
            render= {() => <Wizard/>}
          />
        </Route>
        <Route
          path="*"
          render= {() => <Home/>}
        />
      </Switch>
    </Router>
    
  );
}

export default App;
