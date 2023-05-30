import React from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";

function SelectInterests() {
  const { token } = useToken();
  const [interest, setInterest] = useState([]);

  async function loadInterest() {
    const response = await fetch("http://localhost:8000/interests");
    if (response.ok) {
      const data = await response.json();
      setInterest(data);
    }
  }

  useEffect(() => {
    loadInterest();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const interestData = {
      interest,
    };

    const url = "http://localhost:8000/profile";
  };

  return (
    <>
      <div>
        <h1 className="text-4xl my-5">Interests</h1>
      </div>

      <div className="grid grid-cols-4 gap-5px grid-flow-row justify-center">
        {interest.map((type) => (
          <div className="flex justify-center" key={type.id}>
            <label className="justify-center label">
              <span className="label-text mx-5">{type.name}</span>
              <input
                type="checkbox"
                className="checkbox checkbox-secondary"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

export default SelectInterests;
