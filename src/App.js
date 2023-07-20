import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import General from "./General/General";
import Home from "./Home/Home";
import NewPost from "./NewPost/NewPost";
import Single from "./Single/Single";
import AddAdmin from "./AddAdmin/AddAdmin";
import ViewAdmin from "./ViewAdmin/ViewAdmin";
import SingleAdmin from "./Single/SingleAdmin";

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/:id" element={<Home />} />
        <Route path="/create" element={<NewPost />} />
        <Route path="/create/admin" element={<AddAdmin />} />
        <Route path="/view/admin/:id" element={<ViewAdmin />} />
        <Route path="/single/:postId" element={<Single />} />
        <Route path="/single/admin/:adminId" element={<SingleAdmin />} />
        <Route path="/general" element={<General />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
