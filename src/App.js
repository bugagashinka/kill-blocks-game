import React, { useState, useEffect } from "react";
import { Modal, Row } from "antd";
import Stage from "./ui/Stage";
import ScoreTable from "./ui/ScoreTable";
import Dashboard from "ui/Dashboard";
import { addScores, getScores } from "services/localStorageService";
import { DEFAULT_PLAYER_NAME, NAME_MAX_LENGTH } from "utils/constants";
import { removeHashURI } from "utils";

export default function App() {
  const [isVisibleModal, setModelVisability] = useState(false);
  const [modalInput, updateModalInput] = useState(DEFAULT_PLAYER_NAME);

  const [scoreList, setScoreList] = useState([]);
  const [score, setScore] = useState(0);
  const [gameIsActive, toggleGame] = useState(false);
  const [shouldReplay, replayGame] = useState(false);

  useEffect(() => {
    setScoreList(getScores());
  }, []);

  const startHandler = () => {
    removeHashURI();
    toggleGame((state) => !state);
    replayGame(false);
  };

  const replayHandler = () => {
    if (shouldReplay) return;
    replayGame(true);
    toggleGame(false);
    setScore(0);
  };

  const gameOverHandler = () => {
    setModelVisability(true);
  };

  const scoreChangeHandler = (value) => setScore((scoreState) => value + scoreState);

  const handleModalCancel = () => {
    replayHandler();
    setModelVisability(false);
  };
  const handleModalOk = () => {
    handleModalCancel();
    const name = modalInput ? modalInput : DEFAULT_PLAYER_NAME;
    const newScore = { key: new Date().getTime(), name, score };

    setScoreList((scores) => {
      const newScoresTable = [...scores, newScore];
      addScores(newScoresTable);
      return newScoresTable;
    });
  };

  return (
    <>
      <Dashboard
        score={score}
        gameIsActive={gameIsActive}
        replay={shouldReplay}
        onStart={startHandler}
        onReplay={replayHandler}
        onEnd={gameOverHandler}
      />
      <Row gutter={{ sm: 16, md: 24 }} className="content">
        <Stage onScoreChange={scoreChangeHandler} isActive={gameIsActive} shouldReplay={shouldReplay} />
        <ScoreTable data={scoreList} />
      </Row>
      <Modal
        className="modal"
        title="Save result"
        visible={isVisibleModal}
        maskClosable={false}
        closable={false}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <div className="modal__inner">
          <div className="modal__score">
            <p className="modal__text">Youre score: </p>
            <span>{score}</span>
          </div>
          <p className="modal__text">Name:</p>
          <input
            className="modal__input"
            value={modalInput}
            maxLength={NAME_MAX_LENGTH}
            onChange={({ target }) => updateModalInput(target.value.trim())}
          />
        </div>
      </Modal>
    </>
  );
}
