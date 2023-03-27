import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllVideos from "./components/AllVideos";
import VideoDetails from "./components/VideoDetails";
import VideoForm from "./components/VideoForm";
import Channel from "./components/Channel";
import VideoEdit from "./components/VideoEdit";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path="/login" >
            <LoginFormPage />
          </Route>

          <Route exact path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path='/'>
            <AllVideos/>
          </Route>

          <Route exact path='/video/:videoId'>
            <VideoDetails />
          </Route>

          <Route exact path='/create'>
            <VideoForm />
          </Route>

          <Route exact path='/channel' >
            <Channel />
          </Route>

          <Route exact path='/video/:videoId/edit' >
            <VideoEdit />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
