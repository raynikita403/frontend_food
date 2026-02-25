import React from "react";
import { Link } from "react-router-dom";

const AboutUsSection = ({
  title = "About Us",
  text1 = "",
  text2 = "",
  imageSrc,
  imageHeight = "300px",
  imageWidth = "350px",
  bgColor = "bg-warning",
  linkText = "Know more About Us",
  linkTo = "/about",
  showButton = true, // <-- new prop to hide/show button
}) => {
  return (
    <div className={`container-fluid ${bgColor} py-5`}>
      <div className="row align-items-center">
        {/* Image Section */}
        <div className="col-12 col-lg-6 d-flex justify-content-center mb-4 mb-lg-0">
          <img
            src={imageSrc}
            alt={title}
            className="img-fluid"
            style={{ height: imageHeight, width: imageWidth }}
          />
        </div>

        {/* Text Section */}
        <div className="col-12 col-lg-6">
          <h5 className="fw-bold text-light mb-3">{title}</h5>
          <p className="text-light">{text1}</p>
          {text2 && <p className="text-light">{text2}</p>}

          {/* Show button only if showButton is true */}
          {showButton && (
            <Link
              to={linkTo}
              className="btn btn-light rounded-pill text-warning fw-bold mt-3"
            >
              {linkText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
