import { useEffect, useState } from "react";

import "./App.css";
import { QUOTES_DATA } from "./data";
import useDateAndTime from "./hooks/useDateAndTime";

const getTime = (second: number) => {
  let sec: string | number = second % 60;
  let min: string | number = Math.floor((second / 60) % 60);
  let hour: string | number = Math.floor(second / 60 / 60);

  sec = sec < 10 ? `0${sec}` : sec;
  min = min < 10 ? `0${min}` : min;
  hour = hour < 10 ? `0${hour}` : hour;

  console.log(second, hour, min, sec);
  return `${hour}:${min}:${sec}`;
};

function App() {
  const [input, setInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState("slide-up");
  const [animate1, setAnimate1] = useState("pop-in");
  const [animate2, setAnimate2] = useState("slide-up-");
  const [highlightedQuotes, sethighlightedQuotes] = useState("");
  const [currentQuotes, setCurrentQuotes] = useState(QUOTES_DATA[0]);

  const [textVisibilty, setTextVisibilty] = useState(1);
  const [inputVisibility, setInputVisibility] = useState(1);

  const { date, time, wish } = useDateAndTime();

  const [timmer, setTimmer] = useState(0);

  function highlight(text: any) {
    sethighlightedQuotes(() => text);
  }

  const handleInputChange = (e: any): void => {
    if (currentQuotes.includes(e.target.value)) {
      highlight(e.target.value);
    }
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
        setCurrentIndex(() => currentIndex + (1 % len));
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
          <p className="wish">{wish}</p>
          <p className="timer">{getTime(timmer)}</p>
          <p className="date-time">{date}</p>
          <p className="timer">{time}</p>
        </div>

        <div className="text-wrapper">
          <p className={`${animate2} text-preview`}>
            {QUOTES_DATA[(currentIndex - 1) % QUOTES_DATA.length]}
          </p>
          <div className="type-text-view">
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
          <p className={`${animate1} text-preview`}>
            {QUOTES_DATA[(currentIndex + 1) % QUOTES_DATA.length]}
          </p>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 10px",
            }}
          >
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
            style={{
              width: "100vw",
              maxWidth: "1000px",
              fontSize: "40px",
              fontFamily: "Dancing Script",
              overflow: "hidden",
              padding: "10px",
              border: "none",
              outline: "none",
              boxShadow: "none",
              resize: "none",
              backgroundColor: "black",
              color: "grey",
              opacity: inputVisibility,
              paddingBottom: "50px",
              borderRadius: "5px",
            }}
            value={input}
            rows={2}
            onChange={handleInputChange}
            onKeyUp={handleEnterKeyHit}
          />
        </div>
      </header>
      <footer>
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
            SUNIL KUMAR YADAV <span className="highlight">&copy;2022-23</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
