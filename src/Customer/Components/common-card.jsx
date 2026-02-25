import React from "react";

const CommonCard = ({ title, desc, bg, overlay, showOverlay = true }) => {
  return (
    <div
      className="position-relative rounded overflow-hidden"
      style={{ height: "350px" }}
    >
      {/* Background */}
      <img
        src={bg}
        alt={title}
        className="w-100 h-100"
        style={{ objectFit: "cover" }}
      />

      {/* Overlay Image (ONLY when showOverlay = true) */}
      {showOverlay && (
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

      {/* Text */}
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
