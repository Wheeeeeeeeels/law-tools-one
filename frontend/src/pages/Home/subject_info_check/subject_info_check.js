import React, { useState } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  DatePicker,
  Tabs,
  Divider,
  Drawer,
  Steps,
  Checkbox,
  Radio,
  Row,
  Col,
  Typography,
} from "antd";
import {
  PlusOutlined,
  DownloadOutlined,
  RedoOutlined,
  SearchOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { TabPane } = Tabs;

export function SubjectInfoCheck() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("企业");
  //   const [selectedCount, setSelectedCount] = useState(0);
  //   const [checkedValues, setCheckedValues] = useState([]);
  // const [checkedItems, setCheckedItems] = useState({});

  // const handleCheckboxChange = (item, e) => {
  //     setCheckedItems({
  //         ...checkedItems,
  //         [item]: e.target.checked,
  //     });
  // };

  // const computeCheckedCount = () => {
  //     return Object.values(checkedItems).filter(Boolean).length;
  // };

  const { Text } = Typography;

  const [tab1Checked, setTab1Checked] = useState([]);
  const [tab2Checked, setTab2Checked] = useState([]);
  const [tab3Checked, setTab3Checked] = useState([]);

  const handleTab1Change = (checkedValues) => {
    setTab1Checked(checkedValues);
  };

  const handleTab2Change = (checkedValues) => {
    setTab2Checked(checkedValues);
  };

  const handleTab3Change = (checkedValues) => {
    setTab3Checked(checkedValues);
  };

  const checkedCount =
    tab1Checked.length + tab2Checked.length + tab3Checked.length;

  const NoDataComponent = () => (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Button type="primary" icon={<PlusOutlined />}>
        新增
      </Button>
    </div>
  );

  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
    },

    {
      title: "主体名称",
      dataIndex: "subjectName",
      key: "subjectName",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "完成时间",
      dataIndex: "finishTime",
      key: "finishTime",
    },
    {
      title: "核查结果",
      dataIndex: "checkResult",
      key: "checkResult",
    },
    {
      title: "操作",
      key: "action",
      render: () => (
        <>
          <Button type="link">查看</Button>
          <Button type="link" danger>
            删除
          </Button>
        </>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      index: "1",
      subjectName: "阿里巴巴集團控股有限公司",
      createTime: "2023-11-01 10:35:40",
      finishTime: "2023-11-01 10:35:39",
      checkResult: "核查完成",
    },
  ];

  // 新增的rowSelection对象
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const history_columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
    },

    {
      title: "主体名称",
      dataIndex: "subjectName",
      key: "subjectName",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "完成时间",
      dataIndex: "finishTime",
      key: "finishTime",
    },
    {
      title: "核查结果",
      dataIndex: "checkResult",
      key: "checkResult",
    },
    {
      title: "操作",
      key: "action",
      render: () => (
        <>
          <Button type="link">查看</Button>
          <Button type="link" danger>
            删除
          </Button>
        </>
      ),
    },
  ];
  const history_data = [];

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3>主体信息核查</h3>
        <div>
          <Button icon={<DownloadOutlined />} style={{ marginRight: "10px",backgroundColor: "#333", color: "white" }}>
            批量下载
          </Button>
          <Button icon={<RedoOutlined />} style={{ marginRight: "10px",backgroundColor: "#333", color: "white" }}>
            批量重试
          </Button>
          <Button type="default" icon={<DownloadOutlined />} style={{marginLEft:"5px",backgroundColor: "#333", color: "white"}}>
            下载
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginRight: "10px" }}
            onClick={() => setDrawerVisible(true)}
          >
            新增
          </Button>
        </div>
      </div>
      <Divider />

      <Tabs defaultActiveKey="1"  >
        <TabPane tab="历史任务" key="1">
          <div style={{ marginBottom: "20px",color:"white" }}>
            主体名称
            <span style={{ marginRight: "10px" }}></span>
            <Input
              placeholder="搜索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "200px", marginRight: "10px",color: "black" }}
              suffix={<SearchOutlined />}
              
            />
            核查进度
            <span style={{ marginRight: "10px" }}></span>
            <Select
              defaultValue="default"
              style={{ width: "150px", marginRight: "10px" }}
            >
              <Select.Option value="default">请选择</Select.Option>
              <Select.Option>核查完成</Select.Option>
              <Select.Option>核查中</Select.Option>
              <Select.Option>核查失败</Select.Option>
            </Select>
            核查时间
            <span style={{ marginRight: "10px" }}></span>
            <DatePicker.RangePicker style={{ marginRight: "10px" }} />
            创建时间
            <span style={{ marginRight: "10px" }}></span>
            <DatePicker.RangePicker />
            <Button type="primary" style={{ marginRight: "5px" }}>
              查询
            </Button>
            <Button type="default" style={{ marginRight: "5px" }}>
              重置
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={data}
            rowSelection={rowSelection}
            locale={{ emptyText: <NoDataComponent /> }}
          />
        </TabPane>

        <TabPane tab="定时任务" key="2">
          <div style={{ marginBottom: "20px" ,color:"white"}}>
            主体名称
            <span style={{ marginRight: "10px" }}></span>
            <Input
              placeholder="搜索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "200px", marginRight: "10px" }}
              suffix={<SearchOutlined />}
              
            />
            核查进度
            <span style={{ marginRight: "10px" }}></span>
            <Select
              defaultValue="default"
              style={{ width: "150px", marginRight: "10px" }}
            >
              <Select.Option value="default">请选择</Select.Option>
              <Select.Option>核查完成</Select.Option>
              <Select.Option>核查中</Select.Option>
              <Select.Option>核查失败</Select.Option>
            </Select>
            核查时间
            <span style={{ marginRight: "10px" }}></span>
            <DatePicker.RangePicker style={{ marginRight: "10px" }} />
            创建时间
            <span style={{ marginRight: "10px" }}></span>
            <DatePicker.RangePicker />
            <span style={{ marginLeft: "3px" }}></span>
            <Button type="primary" style={{ marginRight: "5px" }}>
              查询
            </Button>
            <Button type="default" style={{ marginRight: "5px" }}>
              重置
            </Button>
          </div>
          <Table
            columns={history_columns}
            dataSource={history_data}
            rowSelection={rowSelection}
            locale={{ emptyText: <NoDataComponent /> }}
          />
        </TabPane>
      </Tabs>

      <Drawer
        title="新增审查"
        placement="right"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={800}
      >
        <div style={{ marginBottom: "16px" }}>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <ShopOutlined />
                  企业
                </span>
              }
              key="1"
            >
              {/* 企业的内容 */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "8px" }}>
                  搜索主体名称
                </label>
                <Row gutter={16}>
                  <Col span={20}>
                    <Input placeholder="请输入主体名称或简称进行搜索" />
                  </Col>
                  <Col span={2}>
                    <Button type="link" icon={<PlusOutlined />}>
                      新增
                    </Button>
                  </Col>
                </Row>
              </div>
              {/* ...更多企业的选项和内容 */}
            </TabPane>

            <TabPane
              tab={
                <span>
                  <UserOutlined />
                  个人
                </span>
              }
              key="2"
            >
              {/* 个人的内容 */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "8px" }}>
                  核查主体名称
                </label>
                <Row gutter={16}>
                  <Col span={10}>
                    <Input placeholder="请输入人名" />
                  </Col>
                  <Col span={10}>
                    <Input placeholder="请输入身份证号" />
                  </Col>
                  <Col span={2}>
                    <Button type="link" icon={<PlusOutlined />}>
                      新增
                    </Button>
                  </Col>
                </Row>
              </div>
              {/* ...更多个人的选项和内容 */}
            </TabPane>
          </Tabs>
        </div>
        选择数据源 | 已选 {checkedCount} 个
        <div style={{ marginBottom: "16px" }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="基础诚信审查" key="1">
              <Checkbox.Group onChange={handleTab1Change} value={tab1Checked}>
                <Checkbox value="1">国家企业信用信息公示系统</Checkbox>
                <br />
                <Checkbox value="2">中国执行信息公开网(执行)</Checkbox>
                <br />
                <Checkbox value="3">中国执行信息公开网(失信)</Checkbox>
                <br />
                <Checkbox value="4">裁判文书网</Checkbox>
                <br />
              </Checkbox.Group>
            </TabPane>

            <TabPane tab="金融诚信审查" key="2">
              <Checkbox.Group onChange={handleTab2Change} value={tab2Checked}>
                <Checkbox value="5">国家外汇管理局</Checkbox>
                <br />
                <Checkbox value="6">中国人民银行</Checkbox>
                <br />
                <Checkbox value="7">中国银行保险监督管理委员会</Checkbox>
                <br />
              </Checkbox.Group>
            </TabPane>

            <TabPane tab="各领域/行业诚信审查" key="3">
              <Checkbox.Group onChange={handleTab3Change} value={tab3Checked}>
                <Checkbox value="8">全国公共资源交易平台</Checkbox>
                <br />
                <Checkbox value="9">工业和信息化部</Checkbox>
                <br />
              </Checkbox.Group>
            </TabPane>
          </Tabs>
        </div>
        核查设置
        <Divider />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ marginRight: "16px" }}>核查类型</label>
          <Radio.Group>
            <Radio value="类型1">单次审查</Radio>
            <Radio value="类型2">周期审查</Radio>
          </Radio.Group>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ marginRight: "16px" }}>核查频率</label>
          <Radio.Group>
            <Radio value="类型1">立即核查</Radio>
            <Radio value="类型2">定时核查</Radio>
          </Radio.Group>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ marginRight: "16px" }}>核查时间水印</label>
          <Radio.Group>
            <Radio value="类型1">否</Radio>
            <Radio value="类型2">是</Radio>
          </Radio.Group>
        </div>
        <Row align="middle" gutter={[16, 0]} style={{ marginBottom: "16px" }}>
          <Col>
            <Text strong>核查人水印</Text>
          </Col>
          <Col flex="auto">
            <Input placeholder="请填写检查人名称（若无则显示时间水印）" />
          </Col>
        </Row>
        <Divider />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <label style={{ marginRight: "16px" }}>核查曾用名</label>
          <Radio.Group>
            <Radio value="类型1">否</Radio>
            <Radio value="类型2">是</Radio>
          </Radio.Group>
        </div>
      </Drawer>
    </div>
  );
}
