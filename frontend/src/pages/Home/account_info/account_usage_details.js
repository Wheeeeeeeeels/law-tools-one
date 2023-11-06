import React, { useEffect, useState } from "react";
import { Table, Button, Divider, Input, Select, DatePicker } from "antd";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

export function AccountUsageDetailPage({ setSidebarContent }) {
  useEffect(() => {
    setSidebarContent("account");
    console.log("AccountOrderInfoPage");
    return () => setSidebarContent("default");
  }, [setSidebarContent]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const NoDataComponent = () => (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Button type="primary" icon={<PlusOutlined />}>
        新增
      </Button>
    </div>
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const columns = [
    {
      title: "序号",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "使用时间",
      dataIndex: "usageTime",
      key: "usageTime",
    },
    {
      title: "使用功能",
      dataIndex: "usageMode",
      key: "usageMode",
    },
    {
      title: "使用次数",
      dataIndex: "usageCount",
      key: "usageCount",
    },
    {
      title: "所属权益",
      dataIndex: "module",
      key: "module",
    },
  ];

  const data = [
    {
      index: "1",
      key: "1",
      serial: 1,
      usageTime: "2023-10-12 10:35:39",
      usageMode: "主体信息核查",
      usageCount: 1,
      module: "活动赠送权益-新用户注册",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>使用明细</h3>
        <Button type="primary">导出</Button>
      </div>

      <Divider />
      <div style={{ marginBottom: "20px" }}>
        使用功能
        <span style={{ marginRight: "10px" }}></span>
        <Select
          defaultValue="default"
          style={{ width: "150px", marginRight: "10px" }}
        >
          <Select.Option value="default">请选择</Select.Option>
          <Select.Option>主体信息核查</Select.Option>
          <Select.Option>文档校对</Select.Option>
          <Select.Option>尽调利器</Select.Option>
        </Select>
        使用时间
        <span style={{ marginRight: "10px" }}></span>
        <DatePicker.RangePicker style={{ marginRight: "10px" }} />
        <Button type="primary" style={{ marginRight: "5px" }}>
          查询
        </Button>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          locale={{ emptyText: <NoDataComponent /> }}
        />
      </div>
    </div>
  );
}
