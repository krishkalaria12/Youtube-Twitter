import { Routes, Route } from "react-router-dom";
import {HomePage, Denied, Error, Login, Signup, SearchResultsPage} from "./Pages/index"
import NotRequireAuth from "./Components/Auth/NotRequireAuth";
import Video from "./Components/videoPage/video";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/search/:query" element={<SearchResultsPage />} />
        <Route path="/watch/:id" element={<Video />} />

        <Route element={<NotRequireAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}

export default App