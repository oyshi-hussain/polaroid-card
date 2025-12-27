import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  return (
    <>
    <div>
      {/* UI Here */}
    </div>


    <div className='container'>
      <h1>Polaroid Card</h1>
    <div>
      {/* Polaroid Image */}
      <div className='fileGap'>
      <input 
      type='file'
      accept='image/*'
      onChangeCapture={(e) => {
        if (e.target.files && e.target.files[0]) {
          setImage(URL.createObjectURL(e.target.files[0]));
        }
      }}
      />

      {/* Polaroid Message */}
      <input
      type='text'
      placeholder='Write your message 💞'
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      />
      </div>

      {/* Polaroid Preview */}
      <div className='polaroid'>
        {image && <img src={image} alt="uploaded" /> }
        <p>{message || "Your message here"}</p>
      </div>
    </div>
    </div>
    </>
  )
}

export default App;
