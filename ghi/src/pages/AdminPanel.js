import React from "react";
import "./style/adminpanel.css";

function AdminPanel() {
    return (
        <div className="admin-pannel">
            <h1 className="center-txt extra-p60">Admin Panel</h1>
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

export default AdminPanel;
