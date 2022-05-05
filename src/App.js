import { useState } from 'react';
import './App.css';
import html2canvas from "html2canvas";
import backgroundImage from './assets/background-image.png';

function App() {  
  const [textOnImage, setTextOnImage] = useState('Test');
  const [fontSize, setFontSize] = useState(24);
  const [fontWeight, setFontWeight] = useState(600);
  const [fontColor, setFontColor] = useState('#000000');
  const handleBtnClick = () => {
    let div = document.getElementById('container');

    // Use the html2canvas
    // function to take a screenshot
    // and append it
    // to the output div
    console.log(html2canvas);
    html2canvas(div).then(function (canvas) {
      document.getElementById('output').appendChild(canvas);
      var anchor = document.createElement('a');
      anchor.href = canvas.toDataURL('image/png');
      anchor.download = 'IMAGE.PNG';
      anchor.click();
    });
  };
  return (
    <div className="App">
      <div className='values'>
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
      <div id="container">
        <img src={backgroundImage} width="300" height="175" alt="bc" />
        <h1 className="centered" style={{ fontSize: fontSize, fontWeight: fontWeight, color: fontColor }}>{textOnImage}</h1>
      </div>
      <button onClick={handleBtnClick}>take screen shot</button>
      <div id="output"></div>
    </div>
  );
}

export default App;
