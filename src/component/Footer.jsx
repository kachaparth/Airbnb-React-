import React from 'react'

function Footer() {
   return(
     <footer
      style={{
        
        backgroundColor:  "rgba(255, 255, 255, 0.01)" ,
        color: "white",
        textAlign: "center",
        padding: "60px",
        fontFamily: "Arial, sans-serif",
        position: "relative", // Change to 'fixed' and add bottom: 0 for sticky footer
        bottom: 0,
        width: "100%",
      }}
    >
      <p style={{ margin: 0 }}>
        &copy; 2025 Your Company Name. All rights reserved.
      </p>
      <p style={{ margin: "5px 0 0" }}>
        Follow us on{" "}
        <a href="#" style={{ color: "#1da1f2", textDecoration: "none" }}>
          Twitter
        </a>
        ,{" "}
        <a href="#" style={{ color: "#3b5998", textDecoration: "none" }}>
          Facebook
        </a>
        ,{" "}
        <a href="#" style={{ color: "#e1306c", textDecoration: "none" }}>
          Instagram
        </a>
      </p>
    </footer>

   )
}

export default Footer
