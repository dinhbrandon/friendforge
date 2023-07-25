import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import Signup from "./screens/Signup";
import AdminPannel from "./screens/AdminPannel";
import SelectInterests from "./components/authorization/SelectInterests";
import AdminFocus from "./components/adminpages/AdminFocus";
import AdminGroups from "./components/adminpages/AdminGroups";
import AdminInterests from "./components/adminpages/AdminInterests";
import AdminUsers from "./components/adminpages/AdminUsers";
import CreateProfile from "./screens/CreateProfile";
import Forge from "./screens/Forge";
import GroupHome from "./screens/GroupHome";
import "./App.css";
import GetProfile from "./screens/GetProfile";
import MyGroups from "./screens/MyGroups";
import Friends from "./screens/Friends";
import InterestDropdown from './components/interestDropdown'

import LoginPage from "./screens/LoginPage";

function App() {
    const domain = /https:\/\/[^/]+/;
    //VERIFY IF CORRECT???
    const basename = process.env.PUBLIC_URL.replace(domain, "");

    return (
        <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
            <div className="flex flex-col min-h-screen justify-between">
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
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/interestdropdown" element={<InterestDropdown />} />
                        <Route path="/forge" element={<Forge />} />
                        <Route path="/group/:id" element={<GroupHome />} />
                        <Route path="/profile/:username" element={<GetProfile />} />
                        <Route path="/mygroups" element={<MyGroups />} />
                        <Route path="/friends" element={<Friends />} />
                        {/* routes for admin AdminPannel pages */}
                        <Route path="/admin" element={<AdminPannel />} />
                        <Route path="/admin/focus" element={<AdminFocus />} />
                        <Route path="/admin/groups" element={<AdminGroups />} />
                        <Route
                            path="/admin/interests"
                            element={<AdminInterests />}
                        />
                        <Route path="/admin/users" element={<AdminUsers />} />
                        {/* <Route path="/room/:id" element={<ChatRoom />} /> */}
                        {/* end edmin pannel routes */}
                    </Routes>
                </BrowserRouter>
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
