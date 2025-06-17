import React, { useEffect, useRef } from "react";
import "../assets/navbar.css";
import { gsap } from "gsap";
import { Navigate, useNavigate } from "react-router-dom";

function Navbar() {
  const box1Ref = useRef(null);
  const navigate= useNavigate();
  useEffect(() => {
    if (!box1Ref.current) return;

    let tl = gsap.timeline();

    // Animate box1 to visible and original position
    tl.to(box1Ref.current, {
      y: 0,
      opacity: 1,
      duration: 2.8,
      delay: 0.2,
      ease: "elastic.out(0.9, 2.5)",
    });

    // Animate spans to visible and original position, staggered
    const spans = document.querySelectorAll(".box2 span");
    tl.to(
      spans,
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
      },
      "-=2.2" // overlap with previous animation by 1.5s
    );
  }, []);

  return (
    <div className="box" >
      <div className="box1" ref={box1Ref}>
        <h1  >Airbnb</h1>
      </div>

      <div className="box2">
        <span><button className="navbtn" onClick={() => navigate("/listings")}>Home</button></span>
<span><button className="navbtn" onClick={() => navigate("/listings/new")}>New</button></span>
        <span>Edit</span>
        <span>About</span>
        <span>Profile</span>
      </div>
    </div>
  );
}

export default Navbar;
