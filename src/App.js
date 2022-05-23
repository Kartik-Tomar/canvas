import { useState, useEffect } from 'react';
import './App.css';
import html2canvas from "html2canvas";
import backgroundImage from './assets/background-image.png';
import bg1Image from './assets/bg-1.png';
import bg2Image from './assets/bg-2.png';
import bg3Image from './assets/bg-3.png';
import imageCompression from 'browser-image-compression'

function App() {  
  const [textOnImage, setTextOnImage] = useState('Test');
  const [fontSize, setFontSize] = useState(24);
  const [fontWeight, setFontWeight] = useState(600);
  const [fontColor, setFontColor] = useState('#ffffff');
  const [image, setImage] = useState(bg2Image);
  const [imageProp, setImageProp] = useState(null);
  const [newImage, setNewImage] = useState(null)
  const handleBtnClick = () => {
    let div = document.getElementById('container');

    // Use the html2canvas
    // function to take a screenshot
    // and append it
    // to the output div
    html2canvas(div).then((canvas) => {
      document.getElementById('output').appendChild(canvas);
      const options = {
        maxSizeMB: 0.065,
        maxWidthOrHeight: 720,
        useWebWorker: true
      };
      canvas.toBlob(async (blob) => {
        try {
          const compressedFile = await imageCompression(blob, options);
          console.log('compressedFile instanceof Blob', compressedFile); // true
          let url = URL.createObjectURL(compressedFile);
          setNewImage(url);
          var anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = 'IMAGE.PNG';
          anchor.click();
        } catch (error) {
          console.log(error);
        }
      });

      // var anchor = document.createElement('a');
      // anchor.href = canvas.toDataURL(canvas);
      // anchor.download = 'IMAGE.PNG';
      // anchor.click();
    });
  };

  const onImageChange = async (e) => {
    const options = {
      maxSizeMB: 0.07,
      maxWidthOrHeight: 720,
      useWebWorker: true
    };
    try {
      const compressedFile = await imageCompression(e.target.files[0], options);
      console.log('compressedFile instanceof Blob', compressedFile); // true
      let url = URL.createObjectURL(compressedFile);
      setImage(url);
    } catch (error) {
      console.log(error);
    }
    // let url = URL.createObjectURL(e.target.files[0]);
    // setImage(url);
  };

  useEffect(() => {
    setTimeout(() => {
      let img = document.getElementById('image-pro');
      let width = img.clientWidth;
      let height = img.clientHeight;
      console.log('width', width, 'height', height);
      setImageProp({width, height})
    }, 1000);
  }, [image]);

  const handleSelectImages = (e) => {
    setImage(e.target.src);
  };

  return (
    <div className="App">
      <h3>Select Photo or upload</h3>
      <img src={bg1Image} alt="select" className="select-image" onClick={handleSelectImages} />
      <img src={bg2Image} alt="select" className="select-image" onClick={handleSelectImages} />
      <img src={bg3Image} alt="select" className="select-image" onClick={handleSelectImages} />
      <img src={backgroundImage} alt="select" className="select-image" onClick={handleSelectImages} />
      <div className='values'>
        <label>Photo: </label>
        <input type="file" onChange={onImageChange} />
        <br />
        <label>Text: </label>
        <input type="text" value={textOnImage} onChange={e => setTextOnImage(e.target.value)} />
        <br />
        <label>Font Size in px: </label>
        <input type="range" min="10" max="70" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} />
        <input type="number" value={fontSize} onChange={e => setFontSize(e.target.value)} />
        <br />
        <label>Font Weight: </label>
        <input type="range" min="100" max="900" value={fontWeight} onChange={e => setFontWeight(parseInt(e.target.value))} />
        <input type="number" value={fontWeight} onChange={e => setFontWeight(e.target.value)} />
        <br />
        <label>Font Color: </label>
        <input type="color" value={fontColor} onChange={e => setFontColor(e.target.value)} />
        <input type="text" value={fontColor} onChange={e => setFontColor(e.target.value)} />
      </div>
      <h4>Note: Image width: 720px and Height: 440px. Therefore upload with correct aspect ration</h4>
      <h3>Current image width: {imageProp?.width}px and height: {imageProp?.height}px</h3>
      <div id="container">
        <img src={image} width="360" height="220" alt="bc" />
        <h1 className="centered" style={{ fontSize: fontSize, fontWeight: fontWeight, color: fontColor }}>{textOnImage}</h1>
      </div>
      <button onClick={handleBtnClick}>take screen shot</button>
      <br />
      {newImage && <img src={newImage} alt="ss" />}
      <div id="output"></div>
      <img src={image} alt="bc" id='image-pro' />
    </div>
  );
}

export default App;
