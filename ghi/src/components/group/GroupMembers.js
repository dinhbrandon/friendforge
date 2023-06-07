import React, { useState, useEffect } from "react";

function GroupMembers({ token, groupId }) {
  const [members, setMembers] = useState([]);

  async function loadMembers() {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/group/${groupId}/members`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setMembers(data);
      console.log(data);
    }
  }

  useEffect(() => {
    if (token) {
      loadMembers();
    }
  }, [token]);

  return (
    <div className="bg-base-100 text-center p-100 w-1/5">
      <h1 className="text-2xl text-primary text-accent font-bold">Members</h1>
      {members.map((member) => (
        <div
          className="flex flex-col justify-center items-center m-5"
          key={member.id}
        >
          <div className="avatar m-2 ">
            <div className="w-16 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
              <img src={member.profile_photo} />
            </div>
          </div>

          <div className="dropdown">
            <label tabIndex={1} className="link link-hover font-bold m-1">
              {member.first_name}
            </label>
            <div
              tabIndex={0}
              className="dropdown-content card card-compact w-64 p-2 shadow bg-neutral z-[1]"
            >
              <div className="card-body">
                <h3 className="text-center text-lg font-bold text-secondary">
                  {member.first_name} LAST NAME
                </h3>
                member bio goes here
                <a className="link link-accent">View Full Profile</a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupMembers;