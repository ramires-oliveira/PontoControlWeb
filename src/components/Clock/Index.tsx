import { useState, useEffect } from "react";
import { ClockContainer } from "./styles";

export function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  return (
    <ClockContainer>
      <span className="time">{formattedTime}</span>
      <span className="date">{formattedDate}</span>
    </ClockContainer>
  );
}

export default Clock;
