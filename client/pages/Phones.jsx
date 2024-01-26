import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SERVER_URL = 'http://localhost:4000';

const Phones = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get all the phones from the server
  const getPhones = () => {
    axios
      .get(`${SERVER_URL}/phones`)
      .then((response) => {
        console.log(response.data);
        setPhones(response.data);
      })
      .catch((error) => console.log(error));

    setLoading(false);
  };

  useEffect(() => {
    getPhones();
  }, []);

  // Get the path for phone images
  const getImagePath = (imageName) => `../assets/images/${imageName}` || '';

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
      <h1>Most Popular Phones</h1>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="cardContainer" style={{ display: "flex", flexWrap: "wrap",justifyContent: "space-between", marginLeft:"0%" }}>
          {phones &&
            phones.map((phone, index) => (
              <div key={index} className="card" style={{ width: "23%", marginBottom: "1rem", display: "flex", flexDirection: "column", borderRadius: "10px" }}>
                <Link to={`/phones/${phone.id}`} style={{ flex: 1 }}>
                  <div className="card-img-container">
                    <img
                      src={getImagePath(phone.imageFileName)}
                      alt={phone.name}
                      className="card-img-top"
                    />
                  </div>
                </Link>
                <div className="card-body" style={{ flex: 1 }}>
                  <h5 className="card-title">{phone.name}</h5>
                  <p className="card-text">Manufacturer: {phone.manufacturer}</p>
                  <p className="card-text">Price: ${phone.price}</p>
                  <Link to={`/phones/${phone.id}`} className="btn btn-primary" style={{ alignSelf: "flex-end" }}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Phones;
