import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";

function App() {
  const [date_info, setDateInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/date-details`;
      console.log("FastAPI URL: ", url);
      let response = await fetch(url);
      console.log("------- Hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("Got date data!");
        setDateInfo(data.date_details);
      } else {
        console.log("Drat! Something happened!");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <ErrorNotification error={error} />
      <Construct info={date_info} />
    </div>
  );
}

export default App;
