import React from "react";
import "./style/adminpannel.css";

function AdminPannel() {
    return (
        <div className="admin-pannel">
            <h1 className="center-txt extra-p60">Admin Pannel</h1>
            <a href="/friendforge/admin/groups">Groups</a>
            <br />
            <a href="/friendforge/admin/focus">Focuses</a>
            <br />
            <a href="/friendforge/admin/interests">Interests</a>
            <br />
            <a href="/friendforge/admin/users">Users</a>
            <br />
        </div>
    );
}

export default AdminPannel;
