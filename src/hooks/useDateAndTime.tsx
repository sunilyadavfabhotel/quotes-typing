import { useEffect, useState } from "react";

const useDateAndTime = () => {
  const locale = "en";
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setToday(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  })}\n\n`;

  const hour = today.getHours();
  const wish = `Good ${
    (hour < 12 && "Morning") ||
    (hour < 16 && "Afternoon") ||
    (hour < 20 && "Evening") ||
    "Night"
  } `;

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: false,
    minute: "numeric",
    second: "numeric",
  });

  return { date, time, wish };
};

export default useDateAndTime;
