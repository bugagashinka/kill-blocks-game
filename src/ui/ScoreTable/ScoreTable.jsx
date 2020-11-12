import React from "react";
import { Table, Col, Card } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.score - b.score,
  },
];

const ScoreTable = ({ data = [] }) => {
  return (
    <Col xs={24} md={6}>
      <Card bordered={false} bodyStyle={{ padding: "6px 12px" }}>
        <section id="scores" className="score-table">
          <Table columns={columns} defaultPageSize={5} dataSource={data} bordered={true} size="small" />
        </section>
      </Card>
    </Col>
  );
};

export default ScoreTable;
