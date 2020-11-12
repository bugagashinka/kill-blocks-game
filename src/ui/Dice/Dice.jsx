import React, { useState, useEffect } from "react";
import { useDiceLifeTimer } from "utils";
import { DICE_SIZE, DICE_CLICK_COLOR } from "utils/constants";

const Dice = (props) => {
  const { lifeTime = 1000, points, delay = 10, pos, onDisappear, freeze, scaleRatio, onClick, color } = props;
  const diceRef = React.createRef();
  const dicePointsRef = React.createRef();
  const [isClicked, setClickedState] = useState(false);
  const [isVisible, setVisability] = useState(true);

  // Hook that controll a dice lifecycle
  useDiceLifeTimer(lifeTime, delay, () => setVisability(false), freeze);

  useEffect(() => {
    const diceElement = diceRef.current;
    if (!freeze && (isVisible || !isVisible)) {
      diceElement.style.animationPlayState = "running";
    } else if (freeze && (isVisible || !isVisible)) {
      diceElement.style.animationPlayState = "paused";
    }
  }, [freeze, diceRef, isVisible]);

  const animationEndHandler = () => {
    if (onDisappear && !isVisible) {
      onDisappear();
    }
  };

  const diceStyles = {
    backgroundColor: color,
    left: pos.x,
    top: pos.y,
    width: DICE_SIZE / scaleRatio,
    height: DICE_SIZE / scaleRatio,
  };
  const diceClasses = `dice ${isVisible ? "dice_appear" : "dice_disappear"}`;

  const clickHandler = (e) => {
    // prevent text selection
    e.preventDefault();
    if (freeze || isClicked) return;

    diceRef.current.style.backgroundColor = DICE_CLICK_COLOR;
    setClickedState(true);
    setVisability(false);
    onClick(points);
    dicePointsRef.current.classList.add("dice__points_show");
  };

  return (
    <div
      ref={diceRef}
      onClick={clickHandler}
      onTouchStart={clickHandler}
      onAnimationEnd={animationEndHandler}
      style={diceStyles}
      className={diceClasses}
    >
      <span ref={dicePointsRef} className="dice__points">
        + {points}
      </span>
    </div>
  );
};

export default Dice;
