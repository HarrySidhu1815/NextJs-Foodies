'use client'

import { useRef, useState } from "react";

import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ name, label }) {

    const imageInput = useRef()
    const [imagePick, setImagePick] = useState()

    function handleClick(){
        imageInput.current.click()
    }

    function handleImageChange(e){
        const file = e.target.files[0]

        if(!file){
            setImagePick(null)
            return
        }

        const fileReader = new FileReader()

        fileReader.onload = () => {
            setImagePick(fileReader.result)
        }

        fileReader.readAsDataURL(file)
    }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
            {!imagePick && <p>No image picked yet.</p>}
            {imagePick && (
                <Image 
                src={imagePick}
                alt="image selected by you"
                fill
                />
            )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button type="button" className={classes.button} onClick={handleClick}>Pick an image</button>
      </div>
    </div>
  );
}
