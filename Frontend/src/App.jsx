import { Routes, Route } from "react-router-dom";
import {HomePage} from "./Pages/index"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App