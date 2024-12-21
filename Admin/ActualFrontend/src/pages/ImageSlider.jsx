import { useState, useEffect } from "react";

const slideStyles = {
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  transition: "background-image 0.5s ease-in-out", // Smooth transition for background change
};

const sliderStyles = {
  position: "relative",
  height: "100vh", // Full height to make it immersive
  width: "100vw", // Full width
  overflow: "hidden", // Ensure the image does not overflow out of the container
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  bottom: "20px", // Positioned at the bottom of the slider
  left: "50%",
  transform: "translateX(-50%)",
};

const dotStyle = {
  margin: "0 5px",
  cursor: "pointer",
  fontSize: "20px",
  color: "#fff",
};

const ImageSlider = ({ slides, autoPlay = true, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  return (
    <div style={sliderStyles}>
      {/* The image */}
      <div style={slideStylesWidthBackground}></div>

      {/* Dots container */}
      <div style={dotsContainerStyles}>
        {slides.map((_, slideIndex) => (
          <div
            style={dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
