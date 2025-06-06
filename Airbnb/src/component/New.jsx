import React, { use, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function New() {

  const navigate = useNavigate()


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [image,setImage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent form reload

    const formData = { title, description, price, country, location,image };

    try {
      const response = await fetch("http://localhost:8080/listings/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res)=>{
         console.log(res)
         return res;
      })
      .catch((err)=>console.log("hi i an error" + err));

      const result = await response.json();
      console.log("Success:", result);
      navigate("/listings"); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={title}
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /> <br />
        <textarea
          value={description}
          placeholder="Write something about this place"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <br /><br />
          <input
          type="url"
          value={image}
          placeholder="Enter url of image"
          onChange={(e) => setImage(e.target.value)}
        />
        <br /><br />
        <input
          type="number"
          value={price}
          placeholder="Cost in rupees"
          onChange={(e) => setPrice(e.target.value)}
        />
        <br /><br />
 <input type="text"
                  value={location}
                  placeholder='Enter Location'
                  onChange={(e)=> setLocation(e.target.value)}
             />
<br /><br />
         <input type="text"
                  value={country}
                  placeholder='country'
                  onChange={(e)=> setCountry(e.target.value)}
             />
             <br /><br />

             <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default New;
