import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import Read from "./Components/Read";
import Connect from "./Components/Connection";
import Settings from "./Components/Settings/Settings";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Router>
      <NavBar/>
      <Route exact path="/" component={Home}/>
      <Route path="/article/:id" component={Read}/>
      <Route path="/login" component={Connect}/>
      <ProtectedRoute component={Settings} path="/settings"/>
    </Router>
  );
}

export default App;
