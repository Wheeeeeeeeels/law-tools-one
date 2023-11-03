import React from 'react';
import { Card, Row, Col } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import './user_index.css'; // 假设你将样式放在这个CSS文件中

export function UserIndex() {
  return (
    <>
      <h3 className="homepage-header">导航</h3>
      <Row gutter={[16, 16]} style={{ marginLeft: '10px' }}>
        <Col xs={24} sm={12} lg={8}>
          <Card title="主体信息核查" bordered={false} className="custom-card">
            <RouterLink to="/subject-info-check" className="card-link">立即使用</RouterLink>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card title="法律利器" bordered={false} className="custom-card">
            <RouterLink to="/legal-tools" className="card-link">立即使用</RouterLink>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card title="尽调利器" bordered={false} className="custom-card">
            <RouterLink to="/query-info" className="card-link">立即使用</RouterLink>
          </Card>
        </Col>
      </Row>
    </>
  );
}
