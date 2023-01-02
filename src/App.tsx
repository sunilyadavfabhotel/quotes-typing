import { useEffect, useRef, useState } from "react";

import "./App.css";
import { useDateAndTime, useLocalStorage, useQuotesReducer } from "./hooks";
import { getFormatedTime } from "./utils";
import { OPTIONS } from "./types";

function App() {
  const [input, setInput] = useState("");
  const [timmer, setTimmer] = useState(0);
  const [animate, setAnimate] = useState("slide-up");
  const [animate1, setAnimate1] = useState("pop-in");
  const [animate2, setAnimate2] = useState("slide-up-");
  const [highlightedQuotes, sethighlightedQuotes] = useState("");

  const [textVisibilty, setTextVisibilty] = useState(1);
  const [inputVisibility, setInputVisibility] = useState(1);

  const { date, time, wish } = useDateAndTime();
  const [currentQuotes, dispatchQuotes]: any = useQuotesReducer();

  const [name, setName] = useLocalStorage("name", "Sunil Kumar Yadav");
  const [charCount, setCharCount] = useLocalStorage("count", 0);
  const [currentIndex, setCurrentIndex] = useLocalStorage("index", 0);

  const nameRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = () => {
    nameRef.current?.focus();
  };

  const handleReset = () => {
    setName(-1);
    setCharCount(-1);
    setCurrentIndex(0);
  };
  function highlight(text: any) {
    sethighlightedQuotes(() => text);
  }

  const handleInputChange = (e: any): void => {
    if (currentQuotes[currentIndex].includes(e.target.value)) {
      highlight(e.target.value);
    }
    setCharCount((prev: number) => prev + 1);
    setInput(() => e.target.value);
  };

  const handleEnterKeyHit = (e: any) => {
    if (e.key === "Enter") {
      if (currentQuotes[currentIndex] === highlightedQuotes) {
        setAnimate((prev) => (prev === "slide-up" ? "slide-ups" : "slide-up"));
        setAnimate2((prev) =>
          prev === "slide-up-" ? "slide-ups-" : "slide-up-"
        );
        setAnimate1((prev) => (prev === "pop-in" ? "pop-ins" : "pop-in"));
        sethighlightedQuotes("");
        setInput("");
        const len = currentQuotes.length;
        setCurrentIndex(() => (currentIndex + 1) % len);
      }
    }
  };
  const handleQuotesCollectionChange = (e: any) => {
    setCurrentIndex(0);
    dispatchQuotes({ type: e.target.value });
  };
  useEffect(() => {
    const timers = setInterval(() => {
      setTimmer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timers);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div className="date-time-wrapper pop-in">
          <div className="left">
            <p className="wish gray">
              {wish}
              <span className="green pointer" onClick={handleInputFocus}>
                {name}
              </span>
            </p>
            <p className="date-time gray">{date}</p>
          </div>
          <div className="app-name">Quotes-typing</div>
          <div className="left">
            <p className="timer gray"> Time: {time}</p>
            <p className="timer green">Timer: {getFormatedTime(timmer)}</p>
          </div>
        </div>

        <div className="text-wrapper">
          <p className={`${animate2} text-preview white`}>
            {currentQuotes[(currentIndex - 1) % currentQuotes.length]}
          </p>
          <div className="type-text-view white">
            <p className="highligth-text">{highlightedQuotes}</p>
            <p
              className={animate}
              style={{
                opacity: textVisibilty,
              }}
            >
              {currentQuotes[currentIndex]}
            </p>
          </div>
          <p className={`${animate1} text-preview white`}>
            {currentQuotes[(currentIndex + 1) % currentQuotes.length]}
          </p>
        </div>
        <div>
          <div className="slider-wrapper">
            <input
              type="range"
              value={textVisibilty}
              min={0.3}
              max={1}
              step={0.1}
              onChange={(e: any) => setTextVisibilty(e.target.value)}
              style={{ display: "flex", flexDirection: "column" }}
            />
            <input
              type="range"
              value={inputVisibility}
              min={0.3}
              max={1}
              step={0.1}
              onChange={(e: any) => setInputVisibility(e.target.value)}
              style={{ display: "flex", flexDirection: "column" }}
            />
          </div>
          <textarea
            className="typing-area"
            style={{
              opacity: inputVisibility,
            }}
            value={input}
            rows={2}
            onChange={handleInputChange}
            onKeyUp={handleEnterKeyHit}
          />
        </div>
      </header>
      <footer>
        <div className="editor-wrapper">
          <div className="quotes-collection-option">
            <select onChange={handleQuotesCollectionChange}>
              {OPTIONS.map((item) => (
                <option key={item.type} value={item.type}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="counter-wrapper">
            <p className="pm-0 gray">
              Your total key stroke is :
              <span className="white">{charCount}</span>
            </p>
            <button className="pm-0 reset-btn" onClick={handleReset}>
              Reset Page
            </button>
          </div>
          <span className="gray">Update Your Name : </span>
          <input
            ref={nameRef}
            className="name-input"
            type="text"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
        </div>
        <div className="icon-wrap center row">
          <a
            href="https://github.com/SunilKuYadav"
            target="_blank"
            rel="noreferrer"
          >
            <div className="center icon" id="icon-5">
              <i className="mdi mdi-github"></i>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/123sunil/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="center icon" id="icon-2">
              <i className="mdi mdi-linkedin"></i>
            </div>
          </a>
          <a
            href="https://twitter.com/123sunilkr"
            target="_blank"
            rel="noreferrer"
          >
            <div className="center icon" id="icon-2">
              <i className="mdi mdi-twitter"></i>
            </div>
          </a>
          <a
            href="https://www.instagram.com/_om_rudra_/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="center icon" id="icon-4">
              <i className="mdi mdi-instagram"></i>
            </div>
          </a>
        </div>
        <div className="info-box">
          <div className="footnote">
            SUNIL KUMAR YADAV{" "}
            <span className="highlight">
              &copy;2022-{new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
