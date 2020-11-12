import { useState, useEffect } from "react";

const useDiceLifeTimer = (lifeTime, delay, onFinish, pause = false) => {
  const [timers, setTimers] = useState({ lifeTime, delay });
  const [startTime, setStartTime] = useState(0);

  const clearTimers = (timers = []) => timers.forEach((timer) => clearTimeout(timer));

  const saveTimersStates = () => {
    setTimers(({ lifeTime, delay }) => ({
      lifeTime: lifeTime - (new Date().getTime() - startTime),
      delay: delay - (new Date().getTime() - startTime),
    }));
  };

  useEffect(() => {
    let delayTimerId, dissaperTimerId;

    delayTimerId = setTimeout(() => {
      setStartTime(new Date().getTime());
      dissaperTimerId = setTimeout(() => {
        onFinish();
        clearTimeout(dissaperTimerId);
      }, timers.lifeTime);
    }, timers.delay);

    if (pause) {
      // Removing timers for every pause and saving elapsed lifetime for recreate
      clearTimers([delayTimerId, dissaperTimerId]);
      saveTimersStates();
    }

    // Remove timers before destroy
    return () => {
      clearTimers([delayTimerId, dissaperTimerId]);
    };
  }, [pause]);
};

export default useDiceLifeTimer;
