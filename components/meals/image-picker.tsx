"use client";

import { useRef, useState, ChangeEvent } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
export default function ImagePicker({ label, name }: { label: string; name: string }) {
  const imageRef = useRef<HTMLInputElement>(null);
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const handleClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPickedImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}{" "}
          {pickedImage && <Image src={pickedImage} alt="dish image" fill />}
        </div>

        <input
          type="file"
          id={name}
          name={name}
          accept="image/png image/jpeg"
          className={classes.input}
          ref={imageRef}
          onChange={handleImageChange}
        />

        <button type="button" onClick={handleClick} className={classes.button}>
          {label}
        </button>
      </div>
    </div>
  );
}
