import React, { useEffect, useState } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Register, Login } from "./pages/LoginAndRegister/login_register";
import Navbar from "./components/Navbar/Navbar";
import AdminDashboard from "./pages/Admin/admin_home/home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import { Button, Progress, Layout, Menu, Dropdown, Anchor, Link, Divider } from "antd";
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
} from "@ant-design/icons";
import { UserIndex } from "./pages/Home/user_index/user_index";
import { LegalTools } from "./pages/Home/legal_tools/legal_tools";
import { SubjectInfoCheck } from "./pages/Home/subject_info_check/subject_info_check";
import backgroundImage from "./assets/images/global/bj7.jpg";

import "./App.css";
import "./components/tools/tools.css";
import "./components/table/table.css";
// import Link from 'antd/es/typography/Link';
const { Header, Footer, Sider, Content } = Layout;

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
  // const { hash } = useLocation();

  // useEffect(() => {
  //   if (hash) {
  //     const element = document.getElementById(hash.substring(1));
  //     if (element) {
  //       element.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }
  // }, [hash]);

  //   const dropdownMenu = (
  //     <Menu>
  //         <Menu.Item>
  //             <a href="/profile">个人资料</a>
  //         </Menu.Item>
  //         <Menu.Item>
  //             <a href="/login">登出</a>
  //         </Menu.Item>
  //     </Menu>
  // );

  return (
    <Router>
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
            {/* <Link
              type="primary"
              onClick={() => setCollapsed(!collapsed)}
              style={{ marginBottom: "16px" }}
            >
              {collapsed ? "展开" : "折叠"}
            </Link> */}
            {/* <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{
                marginBottom: 16,
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button> */}

            <div className="logo">
              <h2>法查查</h2>
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
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
                  marginTop:500,
                  marginBottom: 16,
                  marginLeft:20
                }}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>
            </Menu>
          </Sider>
          {/* <Header style={{ background: '#fff', padding: 0 }}>
                    <div style={{ float: 'right' }}>
                        欢迎，
                        <Dropdown menu={dropdownMenu}>
                            <a href="#" onClick={e => e.preventDefault()} style={{ marginLeft: 8 }}>
                                {welcomeUserName} <span style={{ fontSize: '10px' }}>▼</span>
                            </a>
                        </Dropdown>
                    </div>
                </Header> */}

          <Layout>
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content
              style={{
                width: "100%",
                height: "100vh",
                background: `url(${backgroundImage}) no-repeat center center`,
                backgroundSize: "cover",
              }}
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      welcomeUserName={welcomeUserName}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  }
                />
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
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>© 2023 zaka-tech. ·All rights reserved.</Footer> */}
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
  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="App">
      {/* <h1>{data ? data.key1 : "Loading..."},{welcomeUserName}</h1> */}
      <Navbar userName={welcomeUserName} onLogout={handleLogout} />
      {/* <QueryInfo /> */}

      <footer className="footer">
        © 2023 zaka-tech. ·All rights reserved.
      </footer>
    </div>
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
