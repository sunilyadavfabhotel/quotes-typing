import { useEffect, useState } from "react";

import "./App.css";
import { QUOTES_DATA } from "./data";
import { useDateAndTime, useLocalStorage } from "./hooks";

const getFormatedTime = (second: number) => {
  let sec: string | number = second % 60;
  let min: string | number = Math.floor((second / 60) % 60);
  let hour: string | number = Math.floor(second / 60 / 60);

  sec = sec < 10 ? `0${sec}` : sec;
  min = min < 10 ? `0${min}` : min;
  hour = hour < 10 ? `0${hour}` : hour;

  return `${hour}:${min}:${sec}`;
};

function App() {
  const [input, setInput] = useState("");
  const [timmer, setTimmer] = useState(0);
  const [animate, setAnimate] = useState("slide-up");
  const [animate1, setAnimate1] = useState("pop-in");
  const [animate2, setAnimate2] = useState("slide-up-");
  const [highlightedQuotes, sethighlightedQuotes] = useState("");
  const [currentQuotes, setCurrentQuotes] = useState(QUOTES_DATA[0]);

  const [textVisibilty, setTextVisibilty] = useState(1);
  const [inputVisibility, setInputVisibility] = useState(1);

  const { date, time, wish } = useDateAndTime();

  const [name, setName] = useLocalStorage("name", "Sunil");
  const [charCount, setCharCount] = useLocalStorage("count", 0);
  const [currentIndex, setCurrentIndex] = useLocalStorage("index", 0);

  const handleReset = () => {
    setName(-1);
    setCharCount(-1);
    setCurrentIndex(-1);
  };
  function highlight(text: any) {
    sethighlightedQuotes(() => text);
  }

  const handleInputChange = (e: any): void => {
    if (currentQuotes.includes(e.target.value)) {
      highlight(e.target.value);
    }
    setCharCount((prev: number) => prev + 1);
    setInput(() => e.target.value);
  };

  const handleEnterKeyHit = (e: any) => {
    if (e.key === "Enter") {
      if (currentQuotes === highlightedQuotes) {
        setAnimate((prev) => (prev === "slide-up" ? "slide-ups" : "slide-up"));
        setAnimate2((prev) =>
          prev === "slide-up-" ? "slide-ups-" : "slide-up-"
        );
        setAnimate1((prev) => (prev === "pop-in" ? "pop-ins" : "pop-in"));
        sethighlightedQuotes("");
        setInput("");
        const len = QUOTES_DATA.length;
        setCurrentIndex(() => (currentIndex + 1) % len);
      }
    }
  };
  useEffect(() => {
    setCurrentQuotes(() => QUOTES_DATA[currentIndex]);
  }, [currentIndex]);

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
          <p className="wish gray">
            {wish}
            <span className="green">{name}</span>
          </p>
          <p className="timer green">{getFormatedTime(timmer)}</p>
          <p className="date-time gray">{date}</p>
          <p className="timer gray">{time}</p>
        </div>

        <div className="text-wrapper">
          <p className={`${animate2} text-preview white`}>
            {QUOTES_DATA[(currentIndex - 1) % QUOTES_DATA.length]}
          </p>
          <div className="type-text-view white">
            <p className="highligth-text">{highlightedQuotes}</p>
            <p
              className={animate}
              style={{
                opacity: textVisibilty,
              }}
            >
              {currentQuotes}
            </p>
          </div>
          <p className={`${animate1} text-preview white`}>
            {QUOTES_DATA[(currentIndex + 1) % QUOTES_DATA.length]}
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
