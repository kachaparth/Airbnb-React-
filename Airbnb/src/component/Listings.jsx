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
         <Link to="/listings/new" ><button>Create New</button></Link>
        <ul>
          {listings.map((listing) => (
            <li key={listing._id}>
              <Link to={`/listings/${listing._id}`}>
                {listing.title} 
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default Listings;
