import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

// import { Button } from "@/components/ui/button"; 
function Listings() {
  const [count, setCount] = useState(0);
  const [listings, setListings] = useState([]);
  // Simulating fetching listings from an API

  const fetchListings = async () => {
    try {
      const res = await fetch("http://localhost:8080/listings");
      const data = await res.json();
      setListings(data);
    } catch (err) {
      console.error(err);
    }
  };


    useEffect(() => {
    fetchListings(); // initial fetch

    const interval = setInterval(() => {
      fetchListings();
    }, 10000); // every 10 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <>
  
      <main>
        <h1>All Listings</h1>
        
        <ul   style={{
    listStyleType: "none",
    display: "flex",
    flexWrap: "wrap",       // 💡 Enables wrapping
    gap: "5px",            // Optional: spacing between items
    justifyContent: "center", // Optional: center items
    padding: "0",           // Removes default padding
  }} >

          {listings.map((listing) => (

            <Link  key={listing._id}  to={`/listings/${listing._id}`} style={{color:"beige",textDecoration:"none",fontSize:"20px"}}>
            <li style={{margin:"30px",
              
            }} > 
            <div><img src={listing.image} width="300px" height={300} style={{borderRadius:"3px",boxShadow:"0px 0px 5px 1px white"}} alt="" /></div>
              
              <p> {listing.title} </p> 
              <p>₹ {listing.price.toLocaleString("en-IN")} / night</p>
              
            </li>
              </Link>
          ))}
        </ul>
      </main>
    </>
  );
}

export default Listings;
