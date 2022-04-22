import { Switch, Route } from "react-router-dom";


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
          {/* <SkipEffectOnFirstRender /> */}
        </Route>

        {/* <Route path="/pokemon">
          <PokemonView />
        </Route>

        <Route path="/counter">
          <Counter />
        </Route>

        <Route path="/notes">
          <Friends />
        </Route> */}
      </Switch>
    </div>
  );
}
