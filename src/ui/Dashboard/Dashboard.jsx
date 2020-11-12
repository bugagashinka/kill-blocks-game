import React from "react";
import { CaretRightOutlined, UndoOutlined, PauseOutlined, SolutionOutlined } from "@ant-design/icons";
import { GAME_START_TIME, GAME_END_TIME } from "utils/constants";
import Timer from "ui/Timer";
import { Row, Col, Button, Statistic, Card, Space } from "antd";

const Dashboard = ({ onStart, onReplay, onEnd, replay, gameIsActive, score }) => {
  return (
    <header className="dashboard">
      <Row gutter={32}>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} bodyStyle={{ padding: "6px 12px" }}>
            <Space className="dashboard__controls">
              <Button onClick={onStart} type="primary" icon={gameIsActive ? <PauseOutlined /> : <CaretRightOutlined />}>
                {gameIsActive ? "Pause" : "Play"}
              </Button>
              <Button onClick={onReplay} icon={<UndoOutlined />}>
                Replay
              </Button>
              <Button className="dashboard__scores-link" href="#scores" icon={<SolutionOutlined />}>
                Scores
              </Button>
            </Space>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={8}>
          <Card bordered={false} bodyStyle={{ padding: "6px 12px" }}>
            <Statistic title="Points:" value={score} />
          </Card>
        </Col>
        <Col xs={12} sm={6} md={8}>
          <Card bordered={false} bodyStyle={{ padding: "6px 12px" }}>
            <Timer
              start={GAME_START_TIME}
              end={GAME_END_TIME}
              isActive={gameIsActive}
              onTimeOver={onEnd}
              replay={replay}
            />
          </Card>
        </Col>
      </Row>
    </header>
  );
};

export default Dashboard;
