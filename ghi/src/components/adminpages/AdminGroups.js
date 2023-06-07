import React, { useState, useEffect } from "react";
import CreateGroup from "./createpages/CreateGroup";
import "./adminpages.css";

function AdminGroups() {
  const [group, setGroup] = useState([]);

  async function loadGroup() {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/groups`);
    if (response.ok) {
      const data = await response.json();
      setGroup(data);
    }
  }

  useEffect(() => {
    loadGroup();
  }, []);

  return (
    <>
      <div className="admin-top">
        <h2>Groups</h2>
        <a href="/admin">Back to admin pannel</a>
      </div>

      <div className="admin-body">
        <div className="admin-list">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Group ID</th>
                <th scope="col">Group Focus ID</th>
                <th scope="col">Group Name</th>
                <th scope="col">Group Icon Photo</th>
              <th scope="col">Group Members</th>
              </tr>
            </thead>
            <tbody>
              {group.map((groups) => (
                <tr key={groups.id}>
                  <th>{groups.id}</th>
                  <th>{groups.focus}</th>
                  <td>{groups.name ? groups.name : "no group name"}</td>
                  <td>{groups.icon_photo ? groups.icon_photo: "no group photo"}</td>
                  <td>{groups.number_of_members ? groups.number_of_members: "no members"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-create">
          <CreateGroup />
        </div>
      </div>
    </>
  );
}

export default AdminGroups;
