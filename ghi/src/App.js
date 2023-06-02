import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import Signup from "./screens/Signup";
import AdminPannel from "./screens/AdminPannel";
import SelectInterests from "./components/authorization/SelectInterests";
import AdminFocus from "./components/adminpages/AdminFocus";
import AdminGroups from "./components/adminpages/AdminGroups";
import AdminIcons from "./components/adminpages/AdminIcons";
import AdminInterests from "./components/adminpages/AdminInterests";
import AdminNames from "./components/adminpages/AdminNames";
import AdminUsers from "./components/adminpages/AdminUsers";
import CreateProfile from "./screens/CreateProfile";
import Forge from "./screens/Forge";
// import ChatRoom from "./components/chat/ChatRoom";

function App() {
  const domain = /https:\/\/[^/]+/;
  //VERIFY IF CORRECT???
  const basename = process.env.PUBLIC_URL.replace(domain, "/friendforge");

  return (
    <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
      <BrowserRouter basename={basename}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/profile" element={<CreateProfile />} />
          <Route
            path="/signup/profile/interests"
            element={<SelectInterests />}
          />
          <Route path="/forge" element={<Forge />} />
          {/* routes for admin AdminPannel pages */}
          <Route path="/admin" element={<AdminPannel />} />
          <Route path="/admin/focus" element={<AdminFocus />} />
          <Route path="/admin/groups" element={<AdminGroups />} />
          <Route path="/admin/icons" element={<AdminIcons />} />
          <Route path="/admin/interests" element={<AdminInterests />} />
          <Route path="/admin/names" element={<AdminNames />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          {/* <Route path="/room/:id" element={<ChatRoom />} /> */}
          {/* end edmin pannel routes */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
