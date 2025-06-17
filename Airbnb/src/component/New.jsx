import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/New.css"; // ✅ Import the CSS file
// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap"
function New() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { title, description, price, country, location, image };

    try {
      const response = await fetch("http://localhost:8080/listings/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Success:", result);
      if( await result.iserror)
      {
        alert(result.message)
        return   
      }
     return await navigate("/listings");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="new-container">
      <form onSubmit={handleSubmit}  className="new-form needs-validation">
        <input
          // required
          type="text"
          value={title}
          className="new-input"
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        />
     
        <textarea
          value={description}
          className="new-textarea"
          placeholder="Write something about this place"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="url"
          value={image}
          className="new-input"
          placeholder="Enter image URL"
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          required
          type="number"
          value={price}
          className="new-input"
          placeholder="Cost in rupees"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          required
          type="text"
          value={location}
          className="new-input"
          placeholder="Enter Location"
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          required
          type="text"
          value={country}
          className="new-input"
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
        />

        <button type="submit" className="new-button">
          Create
        </button>
      </form>
    </div>
  );
}

export default New;
