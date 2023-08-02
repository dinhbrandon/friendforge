import React from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import logo from "./images/logo.png";
import HeaderNoToken from "./header/HeaderNoToken";
import HeaderToken from "./header/HeaderToken";
import "./style/header.css";

export default function Header() {
    const { token } = useToken();

    if (token) {
        return (
            <nav className="bg-base-100">
                <div className="navbar bg-base-100">
                    <div className="flex-1">
                        <a className="header-logo" href="/friendforge">
                            <img src={logo} alt="logo" />
                        </a>
                    </div>
                    <div className="flex-none">
                        <HeaderToken />
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-base-100">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="header-logo" href="/friendforge">
                        <img src={logo} alt="logo" />
                    </a>
                </div>
                <div className="flex-none">
                    {!token && <HeaderNoToken />}
                    {token && <HeaderToken />}
                </div>
            </div>
        </nav>
    );
}
