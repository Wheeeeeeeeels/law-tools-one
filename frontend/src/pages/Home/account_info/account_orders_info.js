import React, { useEffect, useState } from "react";
import { Table, Button, Divider } from "antd";

import { PlusOutlined } from "@ant-design/icons";
// import 'antd/dist/antd.dark.css';

export function AccountOrderInfoPage({ setSidebarContent }) {
  useEffect(() => {
    setSidebarContent("account");
    console.log("AccountOrderInfoPage");
    return () => setSidebarContent("default");
  }, [setSidebarContent]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
      dataIndex: "index",
      key: "index",
    },
    {
      title: "订单编号",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "订单内容",
      dataIndex: "orderContent",
      key: "status",
    },
    {
      title: "支付金额(元)",
      dataIndex: "orderMoney",
      key: "orderMoney",
    },
    {
      title: "订单时间",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "订单状态",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
  ];

  const data = [
    {
      key: "1",
      index: "1",
      orderNumber: "123456",
      orderContent: "包月套餐",
      orderMoney: "988元",
      orderDate: "2023年11月07日",
      orderStatus: "已发货",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3>我的订单</h3>
      </div> */}
      <div>
         <h3>我的订单</h3>
         <Divider/>
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
