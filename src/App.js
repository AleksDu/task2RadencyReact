import { Switch, Route } from "react-router-dom";
import './App.scss'
import Entitys from "./components/entytys/Entitys";
import Form from "./components/forms/Form";
import Table from "./components/table/Table";
const containerStyles = {
  maxWidth: 1170,
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: 15,
  paddingRight: 15,
};

export default function App() {
  return (
    <div style={containerStyles}>

      <Switch>
        <Route path="/skip-first-render">
          <Entitys />
        </Route>

        <hr />
        <Table />
      </Switch>
    </div>
  );
}
