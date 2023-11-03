import React, { useState, useEffect } from "react";
import {
  Menu,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Tooltip,
  Divider,
} from "antd";
import { useLocation } from "react-router-dom";

import {
  DownOutlined,
  SearchOutlined,
  GlobalOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

export function LegalTools() {
  const [currentMenu, setCurrentMenu] = useState("常用");
  const [isDomestic, setIsDomestic] = useState(true);
  const [isMedical,setMedical] = useState(true);
  const [searchPlaceholder, setSearchPlaceholder] = useState("请输入搜索内容");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearchEngine, setSelectedSearchEngine] = useState("");

  // 表示鼠标切换
  const [hoverDomestic, setHoverDomestic] = useState(false);
  const [hoverOverseas, setHoverOverseas] = useState(false);

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  const overseasData = [
    {
      text: "CDPR案例追踪",
      link: "https://enforcementtracker.com/",
      icon: <GlobalOutlined />, // 使用默认图标
      details: "CDPR案例追踪",
    },
    {
      text: "全球数据保护手册",
      link: "https://www.dlapiperdataprotection.com/index.html?t=about&c=IN",
      icon: <GlobalOutlined />, // 使用默认图标
      details: "全球数据保护手册",
    },
    // ...其他域外数据
  ];

  const domesticData = [
    {
      text: "隐私政策自动生成器",
      link: "https://www.autodocs.cn/appstore/36",
      icon: <GlobalOutlined />, // 使用默认图标
      details: "隐私政策自动生成器",
    },
    {
      text: "国家标准全文公开系统",
      link: "https://openstd.samr.gov.cn/bzgk/gb/index",
      icon: <GlobalOutlined />, // 使用默认图标
      details: "国家标准全文公开系统",
    },
    // ...其他国内数据
  ];


  const medicalData = [
    {
      text: "器官移植机构",
      link: "http://www.nhc.gov.cn/wjw/qgyzjg/list.shtml",
      icon: <GlobalOutlined />, // 使用默认图标
      details: "器官移植机构",
    },
    {
      text: "辅助生殖机构",
      link: "http://www.nhc.gov.cn/wjw/fzszjg/list.shtml",
      icon: <GlobalOutlined />, // 使用默认图标
      details: "辅助生殖机构",
    },
  ]

  const medical_devices = [
    {
      text: "医疗器械标准",
      link: "http://app.nifdc.org.cn/jianybz/jybzTwoGj.do?formAction=listTsDalid&type=ylqx&page=list_ylqx",
      icon: <GlobalOutlined />, // 使用默认图标
      details: "医疗器械标准",
    },
    {
      text: "三品一械广告审批",
      link: "http://adsc.samr.gov.cn/spyxggsc/SDADAIS",
      icon: <GlobalOutlined />, // 使用默认图标
      details: "三品一械广告审批",
    },
  ]
  

  const displayedData = isDomestic ? domesticData : overseasData;
  const displayMediacalData = isMedical ? medicalData : medical_devices;

  const handleMenuClick = (menuType) => {
    setCurrentMenu(menuType);
    // setSearchPlaceholder(`搜索${menuType}`);
  };

  const handleSearch = (value) => {
    if (!value) return; // 如果搜索框为空则不执行任何操作

    let searchUrl;

    switch (selectedSearchEngine) {
      case "百度":
        searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(value)}`;
        break;
      case "Google":
        searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
          value
        )}`;
        break;
      // 其他搜索引擎的处理
      case "聚法":
        searchUrl = `https://law.jufaanli.com/law_index?TypeKey=${encodeURIComponent(
          value
        )}`;
        break;
      case "天眼查":
        searchUrl = `https://www.tianyancha.com/search?key=${encodeURIComponent(
          value
        )}`;
      case "企查查":
        searchUrl = `https://www.qcc.com/`;
      default:
        searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(value)}`; // 默认使用百度
        break;
    }

    window.open(searchUrl, "_blank"); // 在新窗口中打开搜索结果
  };

  const updateSearchPlaceholder = (menuItem) => {
    setSearchPlaceholder(`搜索${menuItem}`);
  };

  // 选择搜索引擎
  const selectSearchEngine = (engine) => {
    setSelectedSearchEngine(engine);
  };

  const menuItems = {
    常用: ["站内", "百度", "Google", "微信"],
    搜索: ["百度", "Google", "搜狗", "Bing"],
    查公司: ["企查查", "天眼查"],
    法规: ["Wiselaw", "聚法"],
    案例: ["深思", "聚法"],
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Row
        gutter={16}
        justify="center"
        style={{ marginBottom: "20px", width: "100%" }}
      >
        {Object.keys(menuItems).map((menuType) => (
          <Col key={menuType}>
            <div
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => handleMenuClick(menuType)}
            >
              {menuType}
            </div>
          </Col>
        ))}
      </Row>

      <Input.Search
        size="large"
        placeholder={searchPlaceholder}
        onSearch={handleSearch}
        enterButton
        style={{ width: "100%", maxWidth: "600px", marginBottom: "20px" }}
      />

      <Row
        gutter={16}
        justify="center"
        style={{ marginBottom: "30px", width: "100%" }}
      >
        {menuItems[currentMenu].map((menuItem) => (
          <Col key={menuItem}>
            <div
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => {
                updateSearchPlaceholder(menuItem);
                selectSearchEngine(menuItem); // 设置当前选中的搜索引擎
              }}
            >
              {menuItem}
            </div>
          </Col>
        ))}
      </Row>

      <Divider />

      <div
        style={{ width: "100%", alignItems: "flex-start", textAlign: "left" }}
      >
        <Typography.Text
          id="data_compliance"
          style={{
            fontSize: "24px", // 增大字体大小
            fontWeight: "bold", // 字体加粗
            fontFamily: 'Georgia, "Times New Roman", Times, serif', // 修改字体
            letterSpacing: "1px", // 增加字母间距
            marginBottom: "70px", // 根据需要调整margin-bottom
            color: "#333", // 可以指定颜色，默认是黑色
          }}
        >
          数据合规
        </Typography.Text>

        <div style={{ marginBottom: "16px", marginTop: "20px" }}>
          <Button
            type={isDomestic ? "primary" : "default"}
            onClick={() => setIsDomestic(true)}
            style={{ marginRight: "8px" }}
          >
            <b>国内</b>
          </Button>
          <Button
            type={!isDomestic ? "primary" : "default"}
            onClick={() => setIsDomestic(false)}
          >
            <b>域外</b>
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            width: "100%",
          }}
        >
          {displayedData.map((item, index) => (
            <Tooltip key={index} title={item.details} placement="bottom">
              <Card style={{ width: "300px" }}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.icon} <b>{item.text}</b>
                </a>
              </Card>
            </Tooltip>
          ))}
        </div>
      </div>

      <Divider/>

      <div
        style={{ width: "100%", alignItems: "flex-start", textAlign: "left" }}
      >
        <Typography.Text
          id="data_compliance"
          style={{
            fontSize: "24px", // 增大字体大小
            fontWeight: "bold", // 字体加粗
            fontFamily: 'Georgia, "Times New Roman", Times, serif', // 修改字体
            letterSpacing: "1px", // 增加字母间距
            marginBottom: "70px", // 根据需要调整margin-bottom
            color: "#333", // 可以指定颜色，默认是黑色
          }}
        >
          健康与生命科学
        </Typography.Text>

        <div style={{ marginBottom: "16px", marginTop: "20px" }}>
          <Button
            type={isMedical ? "primary" : "default"}
            onClick={() => setMedical(true)}
            style={{ marginRight: "8px" }}
          >
            <b>医疗</b>
          </Button>
          <Button
            type={!isMedical ? "primary" : "default"}
            onClick={() => setMedical(false)}
          >
            <b>医疗器械</b>
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            width: "100%",
          }}
        >
          {displayMediacalData.map((item, index) => (
            <Tooltip key={index} title={item.details} placement="bottom">
              <Card style={{ width: "300px" }}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.icon} <b>{item.text}</b>
                </a>
              </Card>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LegalTools;
