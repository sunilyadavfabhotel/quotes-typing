const getFormatedTime = (second: number) => {
  let sec: string | number = second % 60;
  let min: string | number = Math.floor((second / 60) % 60);
  let hour: string | number = Math.floor(second / 60 / 60);

  sec = sec < 10 ? `0${sec}` : sec;
  min = min < 10 ? `0${min}` : min;
  hour = hour < 10 ? `0${hour}` : hour;

  return `${hour}:${min}:${sec}`;
};

export { getFormatedTime };
