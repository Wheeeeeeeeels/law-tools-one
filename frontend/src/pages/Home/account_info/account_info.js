import React, { useEffect } from "react";
import {
  Descriptions,
  Card,
  Badge,
  Button,
  Avatar,
  Row,
  Col,
  Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

export function AccountInfoPage({ setSidebarContent }) {
  useEffect(() => {
    setSidebarContent("account");
    console.log("account info");

    return () => setSidebarContent("default");
  }, [setSidebarContent]);

  // 自定义的暗色主题样式
  const customStyle = {
    backgroundColor: "#141414", // 暗背景颜色
    color: "#fff", // 字体颜色
    borderColor: "#303030", // 边框颜色
    borderRadius: "4px", // 圆角边框
  };

  const headerStyle = {
    padding: "16px",
    borderBottom: "1px solid #303030",
    backgroundColor: "transparent",
    color: "#fff",
  };

  const cardStyle = {
    height: '25vh', // 25% of the viewport height
    color: 'white',
    background: '#141414', // Assuming a dark theme based on the image
    overflow: 'hidden'
  };

  const cardStyle2 = {
    height: '25vh', // 25% of the viewport height
    color: 'white',
    background: '#141414', // Assuming a dark theme based on the image
    overflow: 'hidden'
  };

  return (
    <div style={{ padding: "24px", background: "#000", height: "100vh" }}>
      <Row gutter={16}>
        <Col span={24}>
          <Card style={cardStyle}>
            <Row align="middle" justify="space-between">
              <Col>
                <div>18755560568</div>
                <div>注册时间：2023-10-11 22:42:43</div>
              </Col>
              <Col>
                <div>已使用次数 (次)</div>
                <div>1</div>
              </Col>
              <Col>
                <div>剩余可使用次数 (次)</div>
                <div>9</div>
              </Col>
              <Col>
                <Button type="primary">明细</Button>
                <Button>充值次数</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Divider/>
      基本信息 ｜ 已完善 | 未认证
      <Divider/>
      <Row gutter={16}>
        <Col span={24}>
          <Card style={cardStyle2}>
            <Row align="middle" justify="space-between">
              <Col>
                <div>姓名 jackma111</div>
                <div>行业 财务公司</div>
              </Col>
              <Col>
                <div>机构名称 阿里巴巴集團控股有限公司</div>
                <div>部门 运维线</div>
              </Col>
              <Col>
                <div>二级部门</div>
                <div>名片</div>
              </Col>
              <Col>
                <Button type="primary">编辑</Button>
                <Button>重置密码</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>

    



  );
}
