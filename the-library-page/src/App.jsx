import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPage from "./MyPage";
import Menu from "./Menu";
import BookInfoPage from "./BookInfoPage";
import Register from "./Register";
import Login from "./Login";
import AboutUs from "./AboutUs";
import Home from "./Home";
import BookDetails from "./BookDetails";
import SavedBookDetails from "./SavedBookDetails";
import MyLibrary from "./MyLibrary";
import EditProfile from "./EditProfile";

import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bokinfopage" element={<BookInfoPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/bookdetails/:id" element={<BookDetails />} />
        <Route path="/savedbookdetails/:id" element={<SavedBookDetails />} />

        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/mylibrary"
          element={
            <PrivateRoute>
              <MyLibrary />
            </PrivateRoute>
          }
        />

        <Route
          path="/editprofile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
