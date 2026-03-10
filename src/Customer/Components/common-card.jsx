import React from "react";
import "../../styles/cardEffect.css"; // Make sure CSS is imported

const CommonCard = ({ title, desc, bg, overlay, showOverlay = true }) => {
  return (
    <div
      className="common-card position-relative rounded overflow-hidden"
      style={{ height: "350px" }}
    >
      {/* Background Image */}
      <img
        src={bg}
        alt={title}
        className="w-100 h-100"
        style={{ objectFit: "cover" }}
      />

      {/* Optional Overlay Image */}
      {showOverlay && overlay && (
        <img
          src={overlay}
          alt={title}
          className="position-absolute top-50 start-50 translate-middle"
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            border: "2px solid white",
            objectFit: "cover",
          }}
        />
      )}

      {/* Text Overlay */}
      <div
        className="position-absolute bottom-0 start-0 p-3 text-white"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", width: "100%" }}
      >
        <h5>{title}</h5>
        <p className="mb-1">{desc}</p>
      </div>
    </div>
  );
};

export default CommonCard;