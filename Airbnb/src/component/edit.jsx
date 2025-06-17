import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import '../assets/Edit.css'; // ✅ Import the CSS file

function Edit() {
  const navigate = useNavigate();
  const location = useLocation();
  const obj = location.state || {};
  const id = useParams().id;

  const [title, setTitle] = useState(obj.title);
  const [description, setDescription] = useState(obj.description);
  const [country, setCountry] = useState(obj.country);
  const [price, setPrice] = useState(obj.price);
  const [locationValue, setLocation] = useState(obj.location);
  const [image, setImage] = useState(obj.image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { title, description, price, country, location: locationValue, image };

    try {
      const response = await fetch(`http://localhost:8080/listings/${id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Success:", result);
      if(result.iserror)
      {
        console.log("error: " + await result.message + await result.status)
        console.log(result)
        return navigate("/listings/error")
      }
      navigate(-2);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="edit-container">
      <form onSubmit={handleSubmit} className="edit-form">
        <input
          type="text"
          value={title}
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
          className="edit-input"
        />

        <textarea
          value={description}
          placeholder="Write something about this place"
          onChange={(e) => setDescription(e.target.value)}
          className="edit-textarea"
        ></textarea>

        <input
          type="url"
          value={image}
          placeholder="Enter URL of image"
          onChange={(e) => setImage(e.target.value)}
          className="edit-input"
        />

        <input
          type="number"
          value={price}
          placeholder="Cost in rupees"
          onChange={(e) => setPrice(e.target.value)}
          className="edit-input"
        />

        <input
          type="text"
          value={locationValue}
          placeholder="Enter Location"
          onChange={(e) => setLocation(e.target.value)}
          className="edit-input"
        />

        <input
          type="text"
          value={country}
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
          className="edit-input"
        />

        <button type="submit" className="edit-button">Update</button>
      </form>
    </div>
  );
}

export default Edit;
