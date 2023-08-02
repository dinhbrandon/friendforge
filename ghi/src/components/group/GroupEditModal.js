import React, { useState, useEffect } from 'react';
import people from "../images/people.png"

function GroupEditModal(data) {

  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("");

  // useEffect will run after the component is mounted and whenever the data prop changes
  useEffect(() => {
    if(data.groupName) setNewName(data.groupName);
    if(data.groupIcon) setNewIcon(data.groupIcon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const groupData = {
      name: newName,
      icon_photo: newIcon,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/groups/id/${data.groupId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(groupData)
      }
    );
    if (response.ok) {
      data.refreshGroup()
    }
    window.my_modal_3.close();
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <p className='text-white mb-2'>
            Edit group
          </p>
          <input className='input input-md bg-white primary w-full my-1'
          type='text'
          placeholder='Group name...'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          />
          <input className='input input-md bg-white primary w-full my-1'
          type='text'
          placeholder='Photo url...'
          value={newIcon}
          onChange={(e) => setNewIcon(e.target.value)}
          />
          <p className='mt-2 text-white'>Current Group Image</p>
          <img className='mt-2 mb-2 mx-auto block mask mask-hexagon' src={data.groupIcon || people} alt='' />
            
          <button
              className="bg-primary text-white font-bold py-2 px-4 rounded"
              type="submit"
          >
              Save
          </button>
        </form>
    </div>
  );
}

export default GroupEditModal;
