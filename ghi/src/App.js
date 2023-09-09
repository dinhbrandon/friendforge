import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";
import SelectInterests from "./components/getprofile/SelectInterests";
import AdminFocus from "./components/adminpages/AdminFocus";
import AdminGroups from "./components/adminpages/AdminGroups";
import AdminInterests from "./components/adminpages/AdminInterests";
import AdminUsers from "./components/adminpages/AdminUsers";
import CreateProfile from "./pages/CreateProfile";
import Forge from "./pages/Forge";
import GroupHome from "./pages/GroupHome";
import "./App.css";
import GetProfile from "./pages/GetProfile";
import MyGroups from "./pages/MyGroups";
import Friends from "./pages/Friends";
import InterestDropdown from "./components/getprofile/interestDropdown";
import LoginPage from "./pages/LoginPage";
import EditProfile from "./components/getprofile/editProfile";
import Explore from "./pages/Explore";
import { UserProvider } from "./hooks/UserProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient();

function App() {
    const domain = /https:\/\/[^/]+/;
    const basename = process.env.PUBLIC_URL.replace(domain, "");

    return (
        <QueryClientProvider client={client}>
            <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
                <UserProvider>
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
                                <Route path="/editprofile/:username" element={<EditProfile />} />
                                <Route path="/forge" element={<Forge />} />
                                <Route path="/group/:id" element={<GroupHome />} />
                                <Route path="/explore/" element={<Explore />} />
                                <Route path="/profile/:username" element={<GetProfile />} />
                                <Route path="/mygroups" element={<MyGroups />} />
                                <Route path="/friends" element={<Friends />} />
                                <Route path="/admin" element={<AdminPanel />} />
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
                </UserProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
