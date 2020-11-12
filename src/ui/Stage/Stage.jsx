import React, { useState, useEffect, useRef } from "react";
import Dice from "ui/Dice";
import { Col, Card } from "antd";
import { useElementSize, getRandom, getMagnitude, getRandomColor } from "utils";
import {
  DICE_POOL_SIZE,
  DICE_SIZE,
  DELAY_MIN_TIME,
  DELAY_MAX_TIME,
  LIFE_MIN_TIME,
  LIFE_MAX_TIME,
  TIME_PER_FRAME,
} from "utils/constants";

const diceTypes = [
  { points: 3, scaleRatio: 4 },
  { points: 2, scaleRatio: 2 },
  { points: 1, scaleRatio: 1 },
];
// small: 0-15, middle: 16-50, large: 51-100
const diceRandomWeight = [15, 50, 100];

const Stage = ({ isActive, shouldReplay, onScoreChange }) => {
  const stageRef = useRef(null);
  const [dicePool, updatePool] = useState([]);
  const stageSize = useElementSize(stageRef.current);

  const disappearHandler = (diceId) => () => updatePool((pool) => pool.filter(({ id }) => id !== diceId));

  const generateSpawnPos = (scaleRatio) => {
    const diceSize = DICE_SIZE / scaleRatio;
    let inCheck = true;
    let attemptsCount = 20;
    let x, y;
    do {
      const [width, height] = stageSize;
      [x, y] = [getRandom(0, width - diceSize), getRandom(0, height - diceSize)];
      inCheck = dicePool.some(({ pos }) => getMagnitude(pos, { x, y }) < DICE_SIZE * 1.5);
    } while (inCheck || --attemptsCount);
    return { x, y };
  };

  const createDiceModel = () => {
    const [delay, lifeTime] = [getRandom(DELAY_MIN_TIME, DELAY_MAX_TIME), getRandom(LIFE_MIN_TIME, LIFE_MAX_TIME)];
    const diceWeight = getRandom(0, 100);
    const diceTypeIndex = diceRandomWeight.findIndex((weightGroup) => diceWeight <= weightGroup);
    const { points, scaleRatio } = diceTypes[diceTypeIndex];
    return {
      id: delay + lifeTime,
      points,
      color: getRandomColor(),
      scaleRatio,
      pos: generateSpawnPos(scaleRatio),
      delay,
      lifeTime,
    };
  };

  const createDices = () => {
    const displayedDiceCount = dicePool.length;
    if (displayedDiceCount < DICE_POOL_SIZE) {
      const newDices = Array(DICE_POOL_SIZE - displayedDiceCount)
        .fill(null)
        .map(() => createDiceModel());
      updatePool((poolState) => [...poolState, ...newDices]);
    }
  };

  const gameLoop = () => {
    if (shouldReplay) updatePool([]);
    if (isActive) {
      createDices();
    }
  };

  useEffect(() => {
    const gameTimer = setInterval(() => {
      gameLoop();
    }, TIME_PER_FRAME);
    return () => clearInterval(gameTimer);
  }, [dicePool, isActive, shouldReplay]);

  const diceElements = dicePool.map((diceModel) => {
    return (
      <Dice
        onClick={onScoreChange}
        {...diceModel}
        key={diceModel.id}
        freeze={!isActive}
        onDisappear={disappearHandler(diceModel.id)}
      />
    );
  });

  return (
    <Col xs={24} md={18}>
      <Card bordered={false} bodyStyle={{ padding: "6px 12px" }}>
        <section ref={stageRef} className="stage">
          {diceElements}
        </section>
      </Card>
    </Col>
  );
};
export default Stage;
