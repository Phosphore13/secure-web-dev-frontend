import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Location = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [newLocation, setNewLocation] = useState({
     geolocation : {
		"coordinates": [
			2.348314535961912,
			48.83566000015182
		],
		"type": "Point"
	},
	filmType : "Long métrage",
    filmName: "",
    filmDirectorName: "",
    filmProducerName: "",
    year: "2020",
    startDate: "",
    endDate: "",
    district: 75013,
    sourceLocationId: "2020-404",
    address: "rue pascal, 75013 paris"
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleToggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  
  console.log(token)

  const opt = {
    method: "GET",
    url: "http://localhost:3000/locations",
    params: { offset: (currentPage - 1) * itemsPerPage, limit: itemsPerPage },
    headers: {
        Authorization: `Bearer ${token}`,
    },
  };


  useEffect(() => {
    axios
      .request(opt)
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
        if (response.data.length > 0) {
          handleLocationClick(response.data[0]._id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (selectedLocation) {
      const locationDetailsOptions = {
        method: "GET",
        url: `http://localhost:3000/locations/${selectedLocation}?offset=0&limit=10`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
      };

      axios
        .request(locationDetailsOptions)
        .then((response) => {
          console.log(response.data);
          setLocationDetails(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedLocation]);


  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleLocationClick = (id) => {
    setSelectedLocation(id);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/locations/${selectedLocation}?offset=${0}&limit=${10}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log("successfully deleted");
        setSelectedLocation(null);
  
        // Retrieve the updated list of locations after delete
        axios
          .request(opt)
          .then((response) => {
            console.log(response.data);
            setItems(response.data);
          })
          .catch((error) => {
            console.error(error);
          });alert(`Location has been deleted.`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = () => {
    axios
      .patch(`http://localhost:3000/locations/${locationDetails._id}`, {
        filmDirectorName: locationDetails.filmDirectorName,
        filmProducerName: locationDetails.filmProducerName,
        year: locationDetails.year,
        startDate: locationDetails.startDate,
        endDate: locationDetails.endDate,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setItems(
          items.map((item) =>
            item._id === selectedLocation._id ? { ...item, ...locationDetails } : item
          )
        );
        alert(`Location "${locationDetails.filmName}" has been updated.`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

const handleAdd = (e) => {
    e.preventDefault();
  
    const data = {
        "geolocation": {
            "coordinates": [
                2.348314535961912,
                48.83566000015182
            ],
            "type": "Point"
        },
        "filmType": "Long métrage",
        "filmProducerName": newLocation.filmProducerName,
        "endDate": "",
        "filmName": newLocation.filmName,
        "district": 75013,
        "sourceLocationId": "2020-404",
        "filmDirectorName": newLocation.filmDirectorName,
        "address": newLocation.address,
        "startDate": "",
        "year": newLocation.year
    };
  
    axios
      .post("http://localhost:3000/locations", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log("successfully added");
        setNewLocation({
            geolocation : {
                "coordinates": [
                    2.348314535961912,
                    48.83566000015182
                ],
                "type": "Point"
            },
            filmType : "Long métrage",
            filmName: "",
            filmDirectorName: "",
            filmProducerName: "",
            year: "2020",
            startDate: "",
            endDate: "",
            district: 75013,
            sourceLocationId: "2020-404",
            address: "rue pascal, 75013 paris"
        });


        alert(`Location "${newLocation.filmName}" has been created.`);

        // Retrieve the updated list of locations after add
        axios
          .request(opt)
          .then((response) => {
            console.log(response.data);
            setItems(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });

      handleToggleAddForm()
  };
  const handleLogin = (event) => {
    navigate("/");
  };


 return (
  <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", maxWidth: "1200px", width: "90%" }}>
      <div style={{ flex: 1, marginRight: "20px" }}>
        <h1>Locations</h1>
        {items && items.length > 0 && (
          <ul>
            {items.map((item) => (
              <li key={item._id} onClick={() => handleLocationClick(item._id)}>
                {item.address}
              </li>
            ))}
          </ul>
        )}
        <div style={{ marginTop: "20px" }}>
          <button onClick={handlePrevPage}>Previous Page</button>
          <button onClick={handleNextPage}>Next Page</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
      <div style={{ flex: 1 }}>
  {locationDetails && (
    <div>
      <h2>Details for {locationDetails.filmName}</h2>
      <div>
        <label>Director:</label>
        <input type="text" value={locationDetails.filmDirectorName} onChange={(e) => setLocationDetails({ ...locationDetails, filmDirectorName: e.target.value })} />
      </div>
      <div>
        <label>Producer:</label>
        <input type="text" value={locationDetails.filmProducerName} onChange={(e) => setLocationDetails({ ...locationDetails, filmProducerName: e.target.value })} />
      </div>
      <div>
        <label>Year:</label>
        <input type="text" value={locationDetails.year} onChange={(e) => setLocationDetails({ ...locationDetails, year: e.target.value })} />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" value={locationDetails.address} onChange={(e) => setLocationDetails({ ...locationDetails, address: e.target.value })} />
      </div>
      <div>
        <label>Start Date:</label>
        <input type="text" value={new Date(locationDetails.startDate).toLocaleDateString()}disabled />
      </div>
      <div>
        <label>End Date:</label>
        <input type="text" value={new Date(locationDetails.endDate).toLocaleDateString()}disabled/>
      </div>
 
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  )}
  {!showAddForm && (
            <div style={{ marginTop: "20px" }}>
              <button onClick={handleToggleAddForm}>Add Location</button>
            </div>
          )}
          {showAddForm && (
            <div>
       <h2>Add New Location</h2>
<form onSubmit={handleAdd}>
  <div>
    <label>filmName:</label>
    <input type="text" value={newLocation.filmName} onChange={(e) => setNewLocation({ ...newLocation, filmName: e.target.value })} />
  </div>
  <div>
    <label>filmDirectorName:</label>
    <input type="text" value={newLocation.filmDirectorName} onChange={(e) => setNewLocation({ ...newLocation, filmDirectorName: e.target.value })} />
  </div>
  <div>
    <label>filmProducerName:</label>
    <input type="text" value={newLocation.filmProducerName} onChange={(e) => setNewLocation({ ...newLocation, filmProducerName: e.target.value })} />
  </div>
  <div>
    <label>year:</label>
    <input type="text" value={newLocation.year} onChange={(e) => setNewLocation({ ...newLocation, year: e.target.value })} />
  </div>
  <div>
    <label>address:</label>
    <input type="text" value={newLocation.address} onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })} />
  </div>
  <button type="submit">Add Location</button>
</form>
    </div>
  )}
</div>
    </div>
  </div>
);


};

export default Location;