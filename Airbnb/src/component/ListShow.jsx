import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ListShow() {
  const location = useLocation();
  const [listing, setListing] = useState(null);
  const listingId = useParams().id;
 
  const fetchList = async () => {
    try {
      const res = await fetch(`http://localhost:8080/listings/${listingId}`);
      const data = await res.json();
      setListing(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchList(); // initial fetch

    const interval = setInterval(() => {
      fetchList();
    }, 10000); // every 10 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  if (!listing) {
    return <p>Loading...</p>; // ✅ Prevents accessing null
  }

  return (
    <>
      <div className="main">
        <h1>{listing.title}</h1>
        <p>{listing.description}</p>
        <p>Price: ₹ {listing.price.toLocaleString("en-IN")}</p>
        <p>Location: {listing.location}</p>
        <p>Country : {listing.country}</p>
      </div>
    </>
  );
}

export default ListShow;
