import React from "react";
import './ImageUpload.css';

const ImageUpload = ({setImage,setIsChanged}) => {

  function imageSelect(e) {

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
        setImage(reader.result);
        setIsChanged(true)
    }

    if(file){
      reader.readAsDataURL(file);
    }
  }
  
  return (
    <>
      <input type="file" accept="image/png, image/gif, image/jpeg" className="showDialogButton" onChange={event => {imageSelect(event)}}/>
    </>
  );
};

export default ImageUpload;