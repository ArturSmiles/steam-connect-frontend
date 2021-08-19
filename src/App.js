import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NewsletterHome from './Sites/Newsletter/NewsletterHome';
import TestCard from './Sites/Newsletter/Components/GameCards/TestCard';
require('dotenv').config()

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <NewsletterHome/>
        </Route>
        <Route exact path="/Test">
          <TestCard/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
