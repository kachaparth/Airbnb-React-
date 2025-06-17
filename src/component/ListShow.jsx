import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/ListShow.css"; // ✅ Import CSS file

function ListShow() {
  const location = useLocation();
  const [listing, setListing] = useState(null);
  const listingId = useParams().id;
  const navigate = useNavigate();

  const [Rating, setRating] = useState(3);
  const [Comment, setComment] = useState("");

  const fetchList = async () => {
    try {
      const res = await fetch(`http://localhost:8080/listings/${listingId}`);
      const data = await res.json();
      setListing(data);
      console.log(data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchList();
    const interval = setInterval(fetchList, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!listing) {
    return <p className="loading">Loading...</p>;
  }

  const handleSubmit = async () => {
    await navigate(`/listings/${listingId}/edit`, {
      state: {
        id: listing._id,
        title: listing.title,
        description: listing.description,
        price: listing.price,
        location: listing.location,
        country: listing.country,
        image: listing.image,
      },
    });
  };

  const handleReview = async (e) => {
    e.preventDefault();
    let result = await fetch(
      `http://localhost:8080/listings/${listingId}/review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: Comment, rating: Rating }),
      }
    );
    let response = await result.json();
    console.log(response);
    if (response.iserror) {
      alert(response.message);
      return; //Mountain Retreat
    }
    fetchList();
    setComment("");
    setRating(3);
  };

  const handleDelete = async () => {
    let response = await fetch(
      `http://localhost:8080/listings/${listingId}/delete`,
      {
        method: "DELETE",
      }
    );
    let data = await response.json();
    console.log(data);
    navigate("/listings");
  };

  return (
    <>
      <div className="listshow-main">
        <h1 className="listshow-title">{listing.title}</h1>
        <img src={listing.image} alt="Listing" className="listshow-image" />
        <p className="listshow-description">{listing.description}</p>
        <p className="listshow-price">
          Price: ₹ {listing.price.toLocaleString("en-IN")}
        </p>
        <p className="listshow-location">Location: {listing.location}</p>
        <p className="listshow-country">Country: {listing.country}</p>

        <div className="listshow-buttons">
          <button className="edit-btn" onClick={handleSubmit}>
            Edit
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="review-section">
        <form onSubmit={handleReview}>
          <label htmlFor="rating">Rating: {Rating} </label>
          <input
            id="rating"
            type="range"
            value={Rating}
            onChange={(e) => setRating(e.target.value)}
            name="rating"
            min="1"
            max="5"
          />
          <label htmlFor="comment">Comment: </label>
          <textarea
            required
            name="comment"
            id="comment"
            value={Comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write something about your experience.."
          ></textarea>

          <button type="submit" className="review-submit-btn">
            Comment
          </button>
        </form>
      </div>
      
        <h2 className="review-heading">All Reviews</h2>
      <div className="allReviews" >
      {listing.reviews && listing.reviews.length > 0 ? (
        <ul className="reviews-list">
          {listing.reviews.map((review, idx) => (
            <li key={idx} className="review-item">
              <p>
                <strong>Rating:</strong> {review.rating}
              </p>
              <p>
                <strong>Comment:</strong> {review.comment}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
      </div>
    </>
  );
}

export default ListShow;
