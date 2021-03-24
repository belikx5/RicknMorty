import "./styles/app.scss";
import React from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./services/history";
import store from "./store";

import Navbar from "./components/UI/Navbar";
import CharactersPage from "./components/charactersPage";
import EpisodesPage from "./components/episodesPage";
import LocationsPage from "./components/locationsPage";
import WatchlistPage from "./components/watchlistPage";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Navbar />
        <div className="app-container">
          <Switch>
            <Redirect exact from="/" to="/characters" />
            <Route path="/characters" component={CharactersPage} />
            <Route path="/episodes" component={EpisodesPage} />
            <Route path="/locations" component={LocationsPage} />
            <Route path="/watchlist" component={WatchlistPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
