import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

const SERVER_URL = 'http://localhost:4000';

const PhonesInfo = () => {
  const [phone, setPhone] = useState([]);
  const { phoneId } = useParams();
  const navigate = useNavigate();

  // It will get the phone info based on its id
  const getPhone = () => {
    axios
      .get(`${SERVER_URL}/phones/${phoneId}`)
      .then((response) => {
        console.log(response.data);
        setPhone(response.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getPhone();
  }, [phoneId]);

  const getImagePath = (imageName) => `../assets/images/${imageName}` || ''; 

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    {phone && (
      <div className="card" style={{ width: "60%", textAlign: "center" }}>
        <img
           src={getImagePath(phone.imageFileName)}
           alt={phone.name}
           className="card-img-top"
           style={{ objectFit: "contain", width: "100%", height: "200px" }}
        />
          <div className="card-body">
            <h5 className="card-title">{phone.name}</h5>
            <p className="card-text">Manufacturer: {phone.manufacturer}</p>
            <p className="card-text">Description: {phone.description}</p>
            <p className="card-text">Color: {phone.color}</p>
            <p className="card-text">Price: ${phone.price}</p>
            <p className="card-text">Screen: {phone.screen}</p>
            <p className="card-text">Processor: {phone.processor}</p>
            <p className="card-text">RAM: {phone.ram}</p>
            <button onClick={() => navigate(-1)} className="btn btn-primary">
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhonesInfo;
