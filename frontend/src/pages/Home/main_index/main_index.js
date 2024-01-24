import React, { useRef } from "react";
import { Layout, Menu, Carousel, Divider, Button, Row, Col, Card } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  SlackOutlined,
  AppstoreOutlined,
  ExperimentOutlined,
  SearchOutlined,
  WindowsOutlined,
  ChromeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./main_index.css";
import image1 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/global/bj.jpg";
import image2 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/global/bj2.jpg";
import WechatImage from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/global/we.png";
import main_page_1 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/mainpage/main_page_1.jpeg";
import main_page_2 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/mainpage/main_page_2.jpeg";
import main_page_3 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/mainpage/main_page_3.png";
import main_page_4 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/global/main_page_4.jpeg";
import main_page_5 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/global/main_page_5.jpeg";
import main_page_6 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/global/main_page_6.jpeg";
import main_page_7 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/global/main_page_7.jpeg";
import main_page_8 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/global/main_page_8.jpeg";
import main_page_9 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/global/main_page_9.jpeg";
import main_page_10 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/global/main_page_10.jpeg";
import main_page_11 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/global/main_page_11.jpeg";
import main_page_12 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/global/main_page_12.jpeg";
import main_page_13 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/global/main_page_13.jpeg";
import main_page_14 from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/global/main_page_14.jpeg";

const { Header, Content, Footer } = Layout;

const arrowStyles = {
  display: "block",
  color: "#fff",
  fontSize: "16px", // This size can be adjusted
  height: "30px",
  width: "30px",
  lineHeight: "1",
  padding: "0",
  textAlign: "center",
  lineHeight: "30px", // To vertically center the text or icon inside
  opacity: 0.75,
  zIndex: 2,
};

const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1, // Shows two images at a time
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000, // Autoplay interval set to 3000ms (3 seconds)
};

const featureData = [
  {
    title: "主体信息核查",
    description: "用于主体尽调和存续期管理阶段的网络核查",
    icon: <SearchOutlined style={{ fontSize: "24px" }} />,
  },
  {
    title: "法律利器",
    description: "法律信息查询一站式解决方案",
    icon: <AppstoreOutlined style={{ fontSize: "24px" }} />,
  },
  {
    title: "尽调利器",
    description: "尽调一站式解决方案",
    icon: <ExperimentOutlined style={{ fontSize: "24px" }} />,
  },
  {
    title: "中登智能查询",
    description: "用于资产尽调阶段批量、智能化核查应收账款",
    icon: <ChromeOutlined style={{ fontSize: "24px" }} />,
  },
];

const CarouselContent = () => {
  const carouselRef = useRef(null);

  const goToNext = () => {
    carouselRef.current.next();
  };

  const goToPrev = () => {
    carouselRef.current.prev();
  };

  return (
    <div className="carousel-wrapper">
      <LeftOutlined
        className="carousel-arrow left"
        onClick={goToPrev}
        style={arrowStyles}
      />
      <Carousel
        ref={carouselRef}
        {...carouselSettings}
        className="carousel-container"
      >
        <div className="carousel-image-container">
          <img src={main_page_11} alt="Image 1" className="carousel-image" />
          <Link to="/login">
            <Button
              className="custom-button image-button"
              icon={<RightOutlined />}
            >
              立即体验
            </Button>
          </Link>
        </div>
        <div className="carousel-image-container">
          <img src={main_page_12} alt="Image 2" className="carousel-image" />
        </div>
        <div className="carousel-image-container">
          <img src={main_page_10} alt="Image 1" className="carousel-image" />
        </div>
        <div className="carousel-image-container">
          <img src={main_page_9} alt="Image 1" className="carousel-image" />
        </div>
        <div className="carousel-image-container">
          <img src={main_page_13} alt="Image 1" className="carousel-image" />
        </div>
        <div className="carousel-image-container">
          <img src={main_page_14} alt="Image 1" className="carousel-image" />
        </div>
      </Carousel>
      <RightOutlined
        className="carousel-arrow right"
        onClick={goToNext}
        style={arrowStyles}
      />
    </div>
  );
};

// 在这里添加你的 PageHeader 和 PageFooter 组件

const PageHeader = () => {
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px",
        backgroundColor: "#000",
      }}
    >
      <div className="logo" />
      <SlackOutlined style={{ marginRight: 4, color: "#fff" }} />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ flex: 1, backgroundColor: "#000" }}
      >
        <Menu.Item key="1">
          <b>zaka-tech</b>
        </Menu.Item>
        {/* ...其他菜单项 */}
      </Menu>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Use Link component for navigation */}
        <Link to="/login">
          <Button type="primary" style={{ marginRight: "10px" }}>
            登录
          </Button>
        </Link>
        <Link to="/register">
        <Button style={{ backgroundColor: '#000', color: '#fff', borderColor: 'gray' }}>注册</Button>
        </Link>
      </div>
    </Header>
  );
};

const PageFooter = () => {
  return (
    <Footer
      style={{ textAlign: "center", backgroundColor: "#000", color: "#fff" }}
    >
      <b>Copyright © 2023 zaka-tech. All rights reserved.</b>
    </Footer>
  );
};

export const HomePage = () => {
  return (
    <Layout className="layout" style={{ backgroundColor: "#000" }}>
      <PageHeader />
      <Content style={{ padding: "0 50px", marginTop: "20px", flexGrow: 1 }}>
        <CarouselContent />
        <Divider orientation="left">
          <h2>内容介绍</h2>
        </Divider>
        {/* 内容介绍部分 */}
        <h3>
          ZAKA科技致力于为金融从业人士提供一站式的自动化解决方案，围绕金融业务中的主体尽调、资产尽调、文书处理和存续期管理等业务场景，依托于ZAKA成熟的AI技术，最大化地将机械重复的工作自动化，助力专业服务者提高工作质量和效率，解放生产力。
        </h3>
        <Divider orientation="left">
          <h2>功能特点</h2>
        </Divider>
        {/* 内容介绍部分 */}
        <h3>主体信息核查 ｜ 法律利器 ｜ 尽调利器</h3>
        <Row gutter={16}>
          {featureData.map((feature) => (
            <Col span={6} key={feature.title}>
              <div
                style={{
                  background: "#000",
                  padding: "20px",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>
        <Divider orientation="left">
          <h2>核心优势</h2>
        </Divider>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              cover={<img alt="贴合场景" src={main_page_1} />}
              bordered={false}
              style={{ backgroundColor: '#000' }}
            >
              <Card.Meta
                title={<div style={{ color: '#fff' }}>贴合场景</div>}
                description={<div style={{ color: '#fff' }}>zaka科技团队成员均来自券商、银行、律所等专业服务机构，已服务500多个资产证券化等项目，从业经验丰富，深刻了解金融从业人士的痛点，产品功能与用户使用场景紧密贴合。</div>} 
             />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              cover={<img alt="技术成熟" src={main_page_2} />}
              bordered={false}
              style={{ backgroundColor: '#000' }}
            >
              <Card.Meta
                title={<div style={{ color: '#fff' }}>技术成熟</div>}
                description={<div style={{ color: '#fff' }}>zaka科技的技术能力在各类金融业务场景已经过多年打磨，在zaka现有业务系统中稳定高效运行多年，积累了大量的场景和业务经验，技术成熟。</div>} 
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              cover={<img alt="灵活易用" src={main_page_3} />}
              bordered={false}
              style={{ backgroundColor: '#000' }}
            >
              <Card.Meta
                title={<div style={{ color: '#fff' }}>灵活易用</div>}
                description={<div style={{ color: '#fff' }}>开箱即用的完整平台，以及微服务的架构设计，使平台灵活易用及扩展。用户可按需选择账号订阅或本地部署，直接应用于各类金融、法律的业务场景。</div>} 
              />
            </Card>
          </Col>
        </Row>
        <Divider orientation="left">
          <h2>合作联系</h2>
        </Divider>
        <Row align="middle" style={{ width: "100%", padding: "20px" }}>
          <Col span={12} style={{ textAlign: "center" }}>
            <img src={WechatImage} alt="QR Code" style={{ maxWidth: "10%" }} />
            <p>扫码关注了解更多</p>
          </Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <p>合作联系</p>
            <a href="mailto:wheels.cs.work@gmail.com">
              wheels.cs.work@gmail.com
            </a>
          </Col>
        </Row>
      </Content>
      <PageFooter />
    </Layout>
  );
};
