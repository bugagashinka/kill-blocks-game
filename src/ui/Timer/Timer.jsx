import React, { useState, useEffect } from "react";
import { Statistic } from "antd";

const Timer = ({ start = 0, end = 60, onTimeOver, isActive, replay }) => {
  const [time, setTime] = useState(start);

  const updateTimer = (tid) => {
    if (!isActive) return;
    setTime((currentTime) => {
      // two in one: countdown and regular timer
      const newTime = currentTime + (end < start ? -1 : 1);
      if (end < start ? newTime < end : newTime > end) {
        clearInterval(tid);
        return end;
      }
      return newTime;
    });
  };

  useEffect(() => {
    if (replay) {
      setTime(start);
    }
    if (time === end) {
      setTime(start);
      onTimeOver();
    }
  }, [time, replay]);

  useEffect(() => {
    let tid;

    tid = setInterval(() => updateTimer(tid), 1000);
    return () => clearInterval(tid);
  }, [start, isActive]);

  return <Statistic title="Time:" value={time} />;
};

export default Timer;
