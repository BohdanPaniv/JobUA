import React from "react";
import './ImageUpload.css';

const ImageUpload = ({setImage,setIsChanged}) => {

  function imageSelect(e) {

    let reader = new FileReader();
    let file = e.target.files[0];

    //console.log(reader.result);

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
      <input type="file" className="showDialogButton" onChange={event => {imageSelect(event)}}/>
    </>
  );
};

export default ImageUpload;