import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useProfile from "../components/useProfile";
import grouppic from "../screens/images/grouppic.png";
import people from "../screens/images/people.png";

function MyGroups() {
  const [groups, setGroups] = useState([]);
  const { token } = useToken();
  const { profile } = useProfile(token);

  const loadGroups = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/profile/${id}/groups`,
      {
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.ok) {
      const data = await response.json();
      setGroups(data);
    }
  };
  useEffect(() => {
    if (profile && profile.id) {
      const id = profile.id;
      loadGroups(id);
    }
  }, [profile]);
  console.log(groups);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-15 py-24 mx-auto">
          <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded overflow-hidden">
              <div className="w-24 h-full bg-primary"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
              <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
                My Groups
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-2 -mx-2 -mb-6 -mt-4">
            {groups.map((group) => {
              return (
                <div key={group.id}>
                  <div className="p-6 rounded-lg h-64 overflow-hidden">
                    <img
                      alt="content"
                      className="object-cover object-center h-full w-full"
                      src={group.photo || people}
                    />
                  </div>
                  <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                    {group.name}
                  </h2>
                  <a
                    className="text-indigo-500 inline-flex items-center mt-3"
                    href=""
                  >
                    See Group
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              );
            })}
          </div>
          <button className="btn btn-secondary my-10">
            <a href="/forge">Find a Group!</a>
          </button>
        </div>
      </section>
    </>
  );
}

export default MyGroups;
