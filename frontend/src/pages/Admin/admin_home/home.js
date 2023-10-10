import {Layout,Menu,Table,Dropdown,Modal,Button} from 'antd'
import { BrowserRouter as Router, Routes, Route, Navigate,useNavigate } from 'react-router-dom';
import {
    PlayCircleOutlined,
    SettingOutlined,
    UserOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
  
import React, { useState } from 'react';
import { Bar, Pie } from '@ant-design/charts';
import NavbarAdmin from '../../../components/Navbar/Navbar_admin.js';
import backgroundImage from '../../../assets/images/global/bj7.jpg';
import Report from '../admin_charts/charts.js';
import './home.css';


const {Header,Content,Footer,Sider} = Layout

export default function AdminDashboard({welcomeUserName,setIsLoggedIn}) {

    // 勾选状态
    const [selectedKey,setSelectedKey] = useState('1');
    // const [isLoggedIn,setIsLoggedIn] = useState(false);
    // const [welcomeUserName,setWelcomeUserName] = useState('');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingKey, setEditingKey] = useState(null);

    const navigate = useNavigate();

    console.log("AdminDashboard is being rendered");

    
    const handleLogout = (e) => {
        e.preventDefault();
        setIsLoggedIn(false);
        navigate('/login');
    }


    // const handleEdit = (key) => {
    //     console.log("Edit:", key);
    // }

    const handleEdit = (key) => {
        setEditingKey(key); // 设置要编辑的条目的key
        setIsModalVisible(true); // 显示模态窗口
    }

    const handleDelete = (key) => {
        Modal.confirm({
            title: '确认删除?',
            content: '您确定要删除这个条目吗？此操作无法撤销。',
            onOk: () => {
                // 在这里处理删除逻辑，例如从数据源中移除条目
                console.log("Confirmed delete:", key);
                // 如果您的数据存储在状态中，您可能需要使用setState来更新它
                // 例如: setDataSource(dataSource.filter(item => item.key !== key));
            },
            onCancel: () => {
                console.log("Cancelled delete");
            }
        });
    }
    

    const handleModalOk = () => {
        // 在此处处理保存/更新逻辑
    
        // 关闭模态窗口
        setIsModalVisible(false);
    }


    const dropdownMenu = (
        <Menu>
            <Menu.Item>
                <a href="/profile">个人资料</a>
            </Menu.Item>
            <Menu.Item>
                <a href="/login">登出</a>
            </Menu.Item>
        </Menu>
    );



    // 数据源
    const userDataSource = [
        {
            key: '1',
            username: 'admin',
            role: '管理员',
            action: '修改 删除'
        },
        
    ];

    const siteDataSource = [
        {
            key: '1',
            site:  "www.law1.com",
            data_status: "可用"
        },
        {
            key: '2',
            site:  "www.law2.com",
            data_status: "可用"
        },
        {
            key: '3',
            site:  "www.law3.com",
            data_status: "可用"
        },
        {
            key: '4',
            site:  "www.law4.com",
            data_status: "可用"
        },
        {
            key: '5',
            site:  "www.law5.com",
            data_status: "可用"
        },
        {
            key: '6',
            site:  "www.law6.com",
            data_status: "可用"
        },
        {
            key: '7',
            site:  "www.law7.com",
            data_status: "可用"
        },
        {
            key: '8',
            site:  "www.law8.com",
            data_status: "可用"
        }
    ];

    const siteColumns = [
        {
            title: '站点',
            dataIndex: 'site',
            key: 'site',
        },
        {
            title: '数据获取状态',
            dataIndex: 'data_status',
            key: 'data_status',
        }
    ]

    // 列
    const userColumns = [
        {
            title: '账号',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <span>
                    <Button type="primary" style={{ marginRight: 8 }} onClick={() => handleEdit(record.key)}>
                        修改
                    </Button>
                    <Button type="danger" onClick={() => handleDelete(record.key)}>
                        删除
                    </Button>
                </span>
            )
        }
    ];

    
    return (
        
        <Layout>
            <Sider>
                <div className="logo"><h2>数据调度中心</h2></div>
                {/* <NavbarAdmin userName={welcomeUserName} onLogout={handleLogout} /> */}
                {/* <div>
                <img src={lawIcon} alt="Law Icon" className="admin-home-navbar-logo" />
                </div> */}
                
                <Menu theme="dark" defaultSelectedKeys={['1']} onSelect={({ key }) => setSelectedKey(key)}>
                    <Menu.Item key="1" icon={<PlayCircleOutlined />}>运行报表</Menu.Item>
                    <Menu.Item key="2" icon={<SettingOutlined />}>站点管理</Menu.Item>
                    <Menu.Item key="3" icon={<UserOutlined />}>用户管理</Menu.Item>
                    <Menu.Item key="4" icon={<QuestionCircleOutlined />}>使用教程</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <div style={{ float: 'right' }}>
                        欢迎，
                        <Dropdown menu={dropdownMenu}>
                            <a href="#" onClick={e => e.preventDefault()} style={{ marginLeft: 8 }}>
                                {welcomeUserName} <span style={{ fontSize: '10px' }}>▼</span>
                            </a>
                        </Dropdown>
                    </div>
                </Header>
                {/* <Content> */}
                <Content style={{ width: '100%', height: '100vh', background: `url(${backgroundImage}) no-repeat center center`, backgroundSize: 'cover' }}>
                    {/* Your admin content here */}
                    {selectedKey === '1' && <h2>运行报表</h2>}
                    {selectedKey === '1' && <Report />}
                    {selectedKey === '2' && <h2>站点管理</h2>}
                    {selectedKey === '3' && <h2>用户管理</h2>}
                    {selectedKey === '3' && <Table dataSource={userDataSource} columns={userColumns} />}
                    {selectedKey === '2' && <Table dataSource={siteDataSource} columns={siteColumns} />}
                </Content>

                <Modal 
                    title="修改条目" 
                    visible={isModalVisible} 
                    onCancel={() => setIsModalVisible(false)} 
                    onOk={handleModalOk}
                >
                 {/* 在此处放置模态窗口的内容，例如表单或其他要显示的信息 */}
                 <p>正在编辑条目: {editingKey}</p>
                </Modal>
                <Footer>© 2023 zaka-tech. ·Admin DashBorad ·All rights reserved.</Footer>
            </Layout>
        </Layout>

        
    );
}




