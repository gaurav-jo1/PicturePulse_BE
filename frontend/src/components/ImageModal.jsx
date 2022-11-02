import React from "react";
import "../styling/ImageModal.scss";
import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill} from "react-icons/bs"

const ImageModal = () => {
  return (
    <div className="ImageModal_container">
        <div className="ImageMoal_left-arrow">
        <BsFillArrowLeftCircleFill/>
        </div>
        <div className="ImageModal_container-image">
        </div>  
        <div className="ImageMoal_right-arrow">
        <BsFillArrowRightCircleFill/>   
        </div>
    </div>
  );
};

export default ImageModal;
