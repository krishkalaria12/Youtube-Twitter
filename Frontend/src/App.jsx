import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, Denied, Error, Login, Signup, SearchResultsPage, VideoPageDetail } from "./Pages/index";
import NotRequireAuth from "./Components/Auth/NotRequireAuth";
import RequireAuth from "./Components/Auth/RequireAuth";
import ChannelDetail from "./Pages/ChannelDetail";
import LikePage from "./Pages/LikePage";
import PrivacyPolicy from "./Pages/Privacy";

function RegisterLogout(){
  localStorage.clear();
  return <Signup />
}

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/search/:query" element={<SearchResultsPage />} />
        <Route path="/channel/:channelId" element={<ChannelDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route element={<NotRequireAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<RegisterLogout />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/watch/:videoId" element={<VideoPageDetail />} />
          <Route path="/liked-videos" element={<LikePage />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
