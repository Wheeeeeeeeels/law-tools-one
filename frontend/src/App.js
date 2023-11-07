import React, { useEffect, useState } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Register, Login } from "./pages/LoginAndRegister/login_register";
import Navbar from "./components/Navbar/Navbar";
import AdminDashboard from "./pages/Admin/admin_home/home";
import WechatImage from "/Users/aigc/Downloads/fb-dev-projects/law-tool-one/frontend/src/assets/images/global/we.png";
import moment from "moment";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import {
  Button,
  Progress,
  Layout,
  Menu,
  Dropdown,
  Anchor,
  Link,
  Divider,
  Avatar,
  Modal,
  Row,
  Col,
  Card,
  Select,
  InputNumber,
  Affix,
  Form,
  Input,
  List,
} from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  ToolOutlined,
  ExperimentOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  ProfileOutlined,
  DownOutlined,
  DownCircleOutlined,
  SlackOutlined,
  OrderedListOutlined,
  FileTextOutlined,
  StarOutlined,
  CrownOutlined,
  BookOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { UserIndex } from "./pages/Home/user_index/user_index";
import { LegalTools } from "./pages/Home/legal_tools/legal_tools";
import { SubjectInfoCheck } from "./pages/Home/subject_info_check/subject_info_check";
import { AccountInfoPage } from "./pages/Home/account_info/account_info";
import { AccountOrderInfoPage } from "./pages/Home/account_info/account_orders_info";
import { AccountUsageDetailPage } from "./pages/Home/account_info/account_usage_details";
import backgroundImage from "./assets/images/global/bj7.jpg";

import "./App.css";
import "./components/tools/tools.css";
import "./components/table/table.css";
// import Link from 'antd/es/typography/Link';
const { Header, Footer, Sider, Content } = Layout;

const { Option } = Select;

const initialMessages = [
  // ...已有的留言
];

// import 'antd/dist/antd.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [welcomeUserName, setWelcomeUserName] = useState("");
  // 显示文字
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { Link } = Anchor;

  const [sidebarContent, setSidebarContent] = useState("default");

  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [form] = Form.useForm();

  const showMomentModal = () => {
    setIsCommentModalVisible(true);
  };

  const handleMomentOk = () => {
    form
      .validateFields()
      .then((values) => {
        // 添加留言到留言列表
        setMessages([
          ...messages,
          {
            author: "当前用户", // 你可能需要从认证系统获取
            content: values.message,
            datetime: moment().toISOString(),
          },
        ]);
        form.resetFields();
        setIsCommentModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleMomentCancel = () => {
    setIsCommentModalVisible(false);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      // 当用户登出，即isLoggedIn为false时，重置侧边栏内容
      resetSidebarContent();
    }
  }, [isLoggedIn]);

  const renderMenuItems = () => {
    if (sidebarContent === "account") {
      console.log("sidebarContent -> is -> account");
      return (
        <>
          <Menu.Item key="myOrders" icon={<OrderedListOutlined />}>
            <RouterLink to="/account-order-info">我的订单</RouterLink>
          </Menu.Item>
          <Menu.Item key="usageDetails" icon={<FileTextOutlined />}>
            <RouterLink to="/account-usage-details">使用明细</RouterLink>
          </Menu.Item>
          <div className="menu-spacer"></div>

          {/* <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
              marginTop: 500,
              marginBottom: 16,
              marginLeft: 20,
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button> */}
        </>
      );
    } else if (sidebarContent === "default") {
      console.log("sidebarContent -> is -> default");
      return (
        <>
          {/* Replace the items below with your own navigation items */}
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <RouterLink to="/user-index">首页</RouterLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined />}>
            <RouterLink to="/subject-info-check">主体信息核查</RouterLink>
          </Menu.Item>
          {/* <Menu.Item key="3" icon={<ToolOutlined />}>
                <Link to="/legal-tools">法律利器</Link>
              </Menu.Item> */}
          <Menu.SubMenu
            key="sub2"
            icon={<AppstoreOutlined />}
            title={<RouterLink to="/legal-tools">法律利器</RouterLink>}
          >
            <Menu.Item key="5">
              <Anchor>
                {/* <Link href="/legal-tools#data_compliance" title="数据合规"/> */}
                <RouterLink to="/legal-tools#data_compliance">
                  数据合规
                </RouterLink>
              </Anchor>
            </Menu.Item>
            <Menu.Item key="6">
              <Anchor>
                <RouterLink href="#data_compliance" title="工具2">
                  效率工具
                </RouterLink>
              </Anchor>
            </Menu.Item>
            <Menu.Item key="7">
              <RouterLink to="/legal-tool3">知识产权</RouterLink>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="4" icon={<ExperimentOutlined />}>
            <RouterLink to="/query-info">尽调利器</RouterLink>
          </Menu.Item>

          <div className="menu-spacer"></div>

          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
              marginTop: 500,
              marginBottom: 16,
              marginLeft: 20,
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </>
      );
    }
  };

  const setSidebarToAccount = () => setSidebarContent("account");

  const resetSidebarContent = () => {
    setSidebarContent("default");
  };

  return (
    <Router>
      <Affix style={{ position: "fixed", bottom: 50, right: 30 }}>
        <Button
          type="primary"
          shape="circle"
          icon={<MessageOutlined />}
          onClick={showMomentModal}
        />
      </Affix>
      {!isLoggedIn ? (
        <Routes>
          <Route
            path="/register"
            element={
              <Register
                setIsLoggedIn={setIsLoggedIn}
                setWelcomeUserName={setWelcomeUserName}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setWelcomeUserName={setWelcomeUserName}
              />
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Layout>
          <Sider
            width={200}
            collapsed={collapsed}
            className="site-layout-background"
          >
            <div
              className="logo"
              style={{
                marginLeft: 50,
                fontFamily: "Microsoft YaHei, sans-serif",
              }}
            >
              <h3>
                <SlackOutlined style={{ marginRight: 4 }} />
                <b>法查查</b>
              </h3>
            </div>

            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              {renderMenuItems()}
            </Menu>
          </Sider>
          <Layout>
            {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
            <Home
              welcomeUserName={welcomeUserName}
              setIsLoggedIn={setIsLoggedIn}
            />
            <Content
              style={{
                width: "100%",
                height: "100vh",
                background: `url(${backgroundImage}) no-repeat center center`,
                backgroundSize: "cover",
              }}
            >
              <Routes>
                {/* <Route
                  path="/"
                  element={
                    <Home
                      welcomeUserName={welcomeUserName}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  }
                /> */}
                <Route
                  path="/admin-dashboard"
                  element={
                    <AdminDashboard
                      welcomeUserName={welcomeUserName}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  }
                />
                <Route path="/user-index" element={<UserIndex />} />
                <Route
                  path="/subject-info-check"
                  element={<SubjectInfoCheck />}
                />
                <Route path="/legal-tools" element={<LegalTools />} />
                <Route path="/query-info" element={<QueryInfo />} />
                <Route
                  path="/account-info"
                  element={
                    <AccountInfoPage setSidebarContent={setSidebarToAccount} />
                  }
                />
                <Route
                  path="/account-order-info"
                  element={
                    <AccountOrderInfoPage
                      setSidebarContent={setSidebarToAccount}
                    />
                  }
                />
                <Route
                  path="/account-usage-details"
                  element={
                    <AccountUsageDetailPage
                      setSidebarContent={setSidebarToAccount}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>© 2023 zaka-tech. ·All rights reserved.</Footer> */}
            <Modal
              title="留言板"
              visible={isCommentModalVisible}
              onOk={handleMomentOk}
              onCancel={handleMomentCancel}
              okText="提交"
              cancelText="取消"
            >
              <Form form={form} name="messageForm">
                <Form.Item
                  name="message"
                  rules={[{ required: true, message: "请输入你的留言!" }]}
                >
                  <Input.TextArea rows={4} placeholder="请输入你的留言" />
                </Form.Item>
              </Form>
              <List
                className="comment-list"
                header={`${messages.length} 条留言`}
                itemLayout="horizontal"
                dataSource={messages}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="用户头像链接" />}
                      title={item.author}
                      description={item.content}
                    />
                    <div>{item.datetime}</div>
                  </List.Item>
                )}
              />
            </Modal>
          </Layout>
        </Layout>
      )}
    </Router>
  );
}

export function Home({ welcomeUserName, setIsLoggedIn }) {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  // 添加 下拉菜单
  const [menuOpen, setMenuOpen] = useState(false);

  const [isVIPModalVisible, setIsVIPModalVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  const location = useLocation();

  const shouldShowBackButton = [
    "/account-info",
    "/account-order-info",
    "/account-usage-details",
  ].includes(location.pathname);

  const showVIPModal = () => {
    setIsVIPModalVisible(true);
  };

  const showContactModal = () => {
    setIsContactVisible(true);
  };

  const handleVIPOk = () => {
    setIsVIPModalVisible(false);
  };

  const handleContactOk = () => {
    setIsContactVisible(false);
  };

  const handleVIPCancel = () => {
    setIsVIPModalVisible(false);
  };

  const handleContactCancel = () => {
    setIsContactVisible(false);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    setIsLoggedIn(false);
    console.log("Logged out, navigating to /login...");
    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  const home_menu = (
    <Menu style={{ width: 140 }}>
      <Menu.Item key="accountInfo">
        <RouterLink to="/account-info" />
        <UserOutlined />
        账户信息
      </Menu.Item>
      <Menu.Item key="myOrders">
        <RouterLink to="/account-order-info" />
        <OrderedListOutlined />
        我的订单
      </Menu.Item>
      <Menu.Item key="usageDetails">
        <RouterLink to="/account-usage-details" />
        <FileTextOutlined />
        使用明细
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo 和法查查文本 */}
      <div className="logo" style={{ paddingLeft: 24 }}>
        {/* <h2>法查查</h2> */}
      </div>
      {/* 用户头像和欢迎文本 */}
      {shouldShowBackButton && (
        <Button
          onClick={() => navigate("/user-index")}
          style={{ marginLeft: "auto", marginRight: "20px" }}
        >
          返回首页
        </Button>
      )}

      <div style={{ display: "flex", alignItems: "center", paddingRight: 24 }}>
        {/* 下拉菜单 */}
        <div
          style={{
            color: "#FFD700", // Golden color
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          onClick={showVIPModal}
        >
          <CrownOutlined style={{ marginRight: 5 }} /> VIP 权益
        </div>
        <span style={{ margin: "0 8px", color: "#ddd" }}>|</span>
        <BookOutlined style={{ marginRight: 5 }} /> 操作手册 |
        <span
          onClick={showContactModal}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            margin: "0 5px",
          }}
        >
          <CustomerServiceOutlined style={{ marginRight: 3 }} /> 联系客服 ｜
        </span>
        <UserOutlined style={{ marginLeft: 5, marginRight: 1 }} />
        <Dropdown
          overlay={home_menu}
          trigger={["hover"]}
          placement="bottomCenter"
        >
          <span style={{ cursor: "pointer" }}>
            <b>{welcomeUserName}</b>{" "}
            <DownCircleOutlined style={{ marginLeft: 2 }} />
          </span>
        </Dropdown>
      </div>

      <Modal
        title="VIP 权益"
        visible={isVIPModalVisible}
        onOk={handleVIPOk}
        onCancel={handleVIPCancel}
        footer={null} // Hide default footer if you're providing your own buttons
        width={760} // You may need to adjust the width depending on your content
      >
        <Row gutter={16}>
          <Col span={6}>
            <Card
              title={
                <>
                  <CrownOutlined style={{ color: "gold" }} /> VIP年度权益
                </>
              }
              bordered={false}
            >
              <p>按年购买，更大优惠</p>
              <p>¥ 10000/年</p>
              <InputNumber
                min={1}
                max={100000}
                defaultValue={1}
                style={{ width: "100%" }}
              />
              <Button type="primary" style={{ marginTop: 16 }}>
                立即支付
              </Button>
              <p>注: 有效期内 10000次/年</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title={
                <>
                  <CrownOutlined style={{ color: "gold" }} /> VIP包月权益
                </>
              }
              bordered={false}
            >
              <p>按月购买，省时省心</p>
              <p>¥ 1000/月</p>
              {/* Use InputNumber for numeric input */}
              <InputNumber
                min={1}
                max={10000}
                defaultValue={1}
                style={{ width: "100%" }}
              />
              <Button type="primary" style={{ marginTop: 16 }}>
                立即支付
              </Button>
              <p>注: 有效期内 800次/月</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title={
                <>
                  <CrownOutlined style={{ color: "gold" }} /> 次数权益
                </>
              }
              bordered={false}
            >
              <p>按需购买，随用随购</p>
              <p>¥ 3/次</p>
              {/* Use InputNumber for numeric input */}
              <InputNumber
                min={1}
                max={100000}
                defaultValue={1}
                style={{ width: "100%" }}
              />
              <Button type="primary" style={{ marginTop: 16 }}>
                立即支付
              </Button>
              <p>注：主体信息核查功能每核查1个主体按1次计算</p>
            </Card>
          </Col>
          <Col span={6}>
            {/* Assuming this is the card to the far right */}
            <Card bordered={false} className="vip-action-card">
              <h3>高级VIP权益</h3>
              <p>量身定制，批量购买享更多优惠</p>
              <div className="vip-action-description">
                {/* Add any additional descriptive text here */}
                <p>专属客户经理为您量身定制需求</p>
              </div>
              <Button type="primary" className="vip-action-button">
                联系商务
              </Button>
            </Card>
          </Col>
        </Row>
      </Modal>

      <Modal
        title="联系客服"
        visible={isContactVisible}
        onOk={handleContactOk}
        onCancel={handleContactCancel}
        footer={null} // 如果不需要默认的底部按钮，可以设置为null
      >
        <img src={WechatImage} alt="WeChat QR Code" style={{ width: "60%" }} />
      </Modal>
    </Header>
  );
}

function QueryInfo() {
  const [site, setSite] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const displayedResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const [screenshotStatus, setScreenshotStatus] = useState("");
  // const [progress, setProgress] = useState(0);
  const [progress, setProgress] = useState({});

  const handleQueryInfo = () => {
    NProgress.start();
    fetch(`http://127.0.0.1:8000/queryInfo?site=${site}`)
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
        NProgress.done();
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
        NProgress.done();
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleQueryInfo();
    }
  };
  const handleScreenshot = () => {
    fetch("http://127.0.0.1:8000/screenshot")
      .then((response) => response.json())
      .then((data) => {
        setScreenshotStatus(data.message);
      })
      .catch((error) => {
        console.log("Error taking screenshot: ", error);
        setScreenshotStatus("Error taking screenshot.");
      });
  };

  const handleSpecificScreenshot = (siteName) => {
    // 使用时间戳作为简单的task_id
    const task_id = new Date().getTime().toString();
    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/screenshot_progress/${task_id}`
    );

    ws.onmessage = (event) => {
      // 更新特定site.name的进度
      setProgress((prevProgress) => ({
        ...prevProgress,
        [siteName]: parseInt(event.data, 10),
      }));
    };

    // 发起截图请求
    fetch(
      `http://127.0.0.1:8000/spider_and_take_screen_shots?site_name=${siteName}&task_id=${task_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // 此处处理截图完成后的逻辑
      });

    // 当组件卸载时，确保WebSocket关闭
    return () => {
      ws.close();
    };
  };

  return (
    <div className="App">
      {/* <h2>Query Info</h2> */}
      <input
        type="text"
        className="search-input"
        placeholder="请输入需要爬取数据的法律网站"
        value={site}
        onChange={(e) => setSite(e.target.value)}
        onKeyDown={handleKeyDown} // Added this line
      />
      <button className="search-button" onClick={handleQueryInfo}>
        🔍
      </button>
      {/* <button className="screenshot-button" onClick={handleScreenshot}>开始采集</button>  */}
      {screenshotStatus && <p>{screenshotStatus}</p>}
      <table>
        <thead>
          <tr>
            <th>网站ID</th>
            <th>网站名称</th>
            <th>操作</th>
            <th>进度</th>
          </tr>
        </thead>
        <tbody>
          {displayedResults.map((site) => (
            <tr key={site.id}>
              <td>{site.id}</td>
              <td>{site.name}</td>
              <td>
                {/* <button onClick={() => handleSpecificScreenshot(site.name)}>开始采集</button>  */}
                <Button
                  type="primary"
                  onClick={() => handleSpecificScreenshot(site.name)}
                >
                  开始采集
                </Button>
              </td>
              <td>
                {/* <Progress percent={progress} /> */}
                <Progress percent={progress[site.name] || 0} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}>
          上一页
        </button>
        <span>第 {currentPage} 页</span>
        <button
          onClick={() =>
            setCurrentPage((page) =>
              Math.min(page + 1, Math.ceil(results.length / itemsPerPage))
            )
          }
        >
          下一页
        </button>
      </div>
    </div>
  );
}

export default App;
