import React, { useState } from "react";
import axios from "axios";

function Img() {
  const [imgUrl, setImgUrl] = useState("");

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImgUrl(data.imageUrl);
      console.log(data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  async function uploadClicked(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post("http://localhost:3001/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImgUrl(res.data.imageUrl);
      console.log(res.data);
    } catch (error) {
      console.log("Error uploading image: ", error);
    }
  }

  return (
    <>
      <h1>Img Upload Example</h1>
      <div>
        <input type="file" onChange={uploadClicked} />
        {imgUrl && <img width="50%" src={imgUrl} alt="uploaded"></img>}
        <h4>{imgUrl}</h4>
      </div>
    </>
  );
}

export default Img;
