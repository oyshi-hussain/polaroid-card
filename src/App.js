import './App.css';
import { useState } from 'react';
import { storage, db } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { Routes, Route } from "react-router-dom";
import Card from './Card';


function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [cardLink, setCardLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCard = async () => {
    if(!file || !message) 
      return;
    setLoading(true);

    // Uploading Image
    const imageRef = ref(storage, `polaroids/${Date.now()}-${file.name}`); // Storage reference 
    await uploadBytes(imageRef, file); // Uploading file
    const url = await getDownloadURL(imageRef); // Downloadable URL

    // Saving card to Firestore
    const docRef = await addDoc(collection(db, "cards"), {
      imageURL: url,
      message: message,
      createdAt: new Date(),
    });

    // Shareable Link
    setImageURL(url);
    setCardLink(`${window.location.origin}/card/${docRef.id}`);

    setLoading(false);
  }

  return (
    <>
    <Routes>
      <Route
      path="/"
      element={
        <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
          <h1>Polaroid Card</h1>
    <div className='container'>
      <h1>Polaroid Card</h1>
    <div>
      {/* Polaroid Image */}
      <div className='fileGap'>
      <input 
      type='file'
      accept='image/*'
      onChange={(e) => setFile(e.target.files[0]) }
      />

      <br /> <br />

      <textarea
      placeholder="Write your message . . ."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      rows={3}
      style={{ width: "250px" }}
      />

      <br /><br />

      {/* Button to upload image */}
      <button onClick={handleCreateCard} disabled={loading}>
        {loading ? "Creating Card . . ." : "Create Card"}
      </button>

      <br /> <br />

      {imageURL && (
        <div>
        <img
        src={imageURL}
        alt="Polaroud"
        style={{ width: "250px", borderRadius: "8px" }}
        />
        <p>{message}</p>
        </div>
      )}

      {cardLink && (
        <div>
          <p>Share this link:</p>
          <a href={cardLink} target="_blank" rel="noreferrer">
            {cardLink}
          </a>
          </div>
      )}
      </div>
    </div>
    </div>
    </div>
      }
      />
       <Route path="/card/:id" element={<Card />} />
    </Routes>
    </>
  )
}

export default App;
