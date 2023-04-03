import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchLocations = async () => {
        const response = await axios.get(
          `http://localhost:3000/locations?offset=${(page - 1) * limit}&limit=${limit}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDFkYmMxNzExYWRmYTFjY2NmYjA4MjIiLCJyb2xlIjoidXNlciIsImlhdCI6MTY4MDU1MDcwN30.aUg-VHJrJvaYIyKA_ZdTBTTIpReYh0_oMT4L3xYi0bY",
            },
          }
        );
        console.log(response.data); // Check what the data returned from the API looks like
        setLocations(response.data.locations);
        console.log(locations); // Check the value of the locations state after setting it
      };

    fetchLocations();
  }, [page, limit]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <h1>Locations</h1>
            {locations && locations.length > 0 && (
        <ul>
            {locations.map((location) => (
            <li key={location._id}>{location.address}</li>
            ))}
        </ul>
        )}   
      <button onClick={handlePrevPage} disabled={page === 1}>
        Previous
      </button>
      <button onClick={handleNextPage} disabled={locations.length < limit}>
        Next
      </button>
    </div>
  );
};

export default Location;
