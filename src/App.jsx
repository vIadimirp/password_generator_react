import { useState } from 'react';

import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';

import "./App.css";


export default function App() {

    const [inputValue, setInputValue] = useState("");
    const [sliderValue, setSliderValue] = useState(10);
    
    const [lowercase, setLowercase] = useState(true);
    const [uppercase, setUppercase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(false);


    const sliderHandler = (event, newValue) => {setSliderValue(newValue)};


    const characters = {
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        numbers: "0123456789",
        // symbols: "_-.",
        symbols: "_-.$!?+=*",
        // symbols: "~!@#$%^&*-_+=\\|/?.,'\":;",
    }

    const generate = () => {
        let currentCharacters = "";
        if (lowercase) currentCharacters += characters.lowercase;
        if (uppercase) currentCharacters += characters.uppercase;
        if (numbers) currentCharacters += characters.numbers;
        if (symbols) currentCharacters += characters.symbols;

        // console.log(currentCharacters);
        let result = "";
        for (let i = 0; i < sliderValue; i++) {
            result += currentCharacters.charAt(Math.floor(Math.random() * currentCharacters.length));
        }

        setInputValue(result);
        // return result;
    }


    return (
        <div className="app">
            <div className="name">Password Generator</div>
            <div className="input">
                <input type="text" placeholder="P4$5W0rD!" value={inputValue} onChange={o => setInputValue(o.value)} />
                <span className="material-symbols-outlined copyIcon" onClick={() => navigator.clipboard.writeText(inputValue)}>content_copy</span>
            </div>
            <div className="body">
                <div className="lengthSelector">
                    <div className="info">
                        <div className="name">Character Length</div>
                        <div className="n">{sliderValue}</div>
                    </div>
                    <div className="slider">
                        <Slider className="sliderInner" value={sliderValue} onChange={sliderHandler} min={1} max={35} />
                    </div>
                </div>
                <div className="checkboxes">
                    <div className="checkbox">
                        <Checkbox className="checkboxInner" checked={lowercase} 
                            onChange={() => setLowercase(prev => (uppercase || numbers || symbols) ? !prev : prev)} />
                        <label>Include Lowercase Letters (a-z)</label>
                    </div>
                    <div className="checkbox">
                        <Checkbox className="checkboxInner" checked={uppercase} 
                            onChange={() => setUppercase(prev => (lowercase || numbers || symbols) ? !prev : prev)} />
                        <label>Include Uppercase Letters (A-Z)</label>
                    </div>
                    <div className="checkbox">
                        <Checkbox className="checkboxInner" checked={numbers} 
                            onChange={() => setNumbers(prev => (lowercase || uppercase || symbols) ? !prev : prev)} />
                        <label>Include Numbers (0-9)</label>
                    </div>
                    <div className="checkbox">
                        <Checkbox className="checkboxInner" checked={symbols} 
                            onChange={() => setSymbols(prev => (lowercase || uppercase || numbers) ? !prev : prev)} />
                        <label>Include Symbols ({characters.symbols})</label>
                    </div>
                </div>
                <div className="strength">{/* ... */}</div>
                <button className="generateButton" onClick={generate}>Generate ➔</button>
            </div>
        </div>
    );

}
