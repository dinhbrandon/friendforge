import React, { useState, useEffect } from "react";
import CreateFocus from "./createpages/CreateFocus";
import "./adminpages.css";

function AdminFocus() {
  const [focus, setFocus] = useState([]);

  // load the list of focuses
  async function loadFocus() {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/group_focus`
    );
    if (response.ok) {
      const data = await response.json();
      setFocus(data);
    }
  }

  useEffect(() => {
    loadFocus();
  }, []);

  return (
    <>
      <div className="admin-top">
        <h2>Group Focuses</h2>
        <a href="/admin">Back to admin pannel</a>
      </div>

      <div className="admin-body">
        <div className="admin-list">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Focus ID</th>
                <th scope="col">Focus Name</th>
              </tr>
            </thead>
            <tbody>
              {focus.map((type) => (
                <tr key={type.id}>
                  <th>{type.id}</th>
                  <td>{type.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-create">
          <CreateFocus />
        </div>
      </div>
    </>
  );
}

export default AdminFocus;
