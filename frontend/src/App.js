import './App.css';
import './components/tools/tools.css'
import './components/table/table.css'
import React, { useEffect, useState } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {Register,Login} from './pages/LoginAndRegister/login_register';
import Navbar from './components/Navbar/Navbar';
import AdminDashboard from './pages/Admin/admin_home/home';
import { BrowserRouter as Router, Routes, Route, Navigate,useNavigate } from 'react-router-dom';
import { Button } from 'antd';
// import 'antd/dist/antd.css';


function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  // const [isAdminUser,setIsAdminUser] = useState(false); 
  const [welcomeUserName,setWelcomeUserName] = useState('');
  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} setWelcomeUserName={setWelcomeUserName} />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setWelcomeUserName={setWelcomeUserName} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ):(
          <>
            <Route path="/" element={<Home welcomeUserName={welcomeUserName} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/admin-dashboard" element={<AdminDashboard welcomeUserName={welcomeUserName} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="*" element={<Navigate to="/" />} />

          </>
        )}
      </Routes>
    </Router>
  );

}

export function Home({welcomeUserName,setIsLoggedIn}){
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
      navigate('/login');
  }

  return (
    <div className='App'>
      {/* <h1>{data ? data.key1 : "Loading..."},{welcomeUserName}</h1> */}
      <Navbar userName={welcomeUserName} onLogout={handleLogout} />
      <QueryInfo />

      <footer className="footer">
                © 2023 zaka-tech. ·All rights reserved.
      </footer>
    </div>
  );
}

function QueryInfo() { 
  const [site, setSite] = useState('');
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const displayedResults = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const [screenshotStatus, setScreenshotStatus] = useState('');
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
    if (event.key === 'Enter') {
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
        setScreenshotStatus('Error taking screenshot.');
      });
  };


  const handleSpecificScreenshot = (siteName) => {
    fetch(`http://127.0.0.1:8000/screenshot?site_name=${siteName}`)
    .then((response) => response.json())
    .then((data) => {
        setScreenshotStatus(data.message);
    })
    .catch((error) => {
      console.log("Error taking screenshot: ", error);
      setScreenshotStatus('Error taking screenshot.');
    });
};


  return (
    <div className='App'>
      {/* <h2>Query Info</h2> */}
      <input 
          type="text" 
          className="search-input"  
          placeholder='请输入需要爬取数据的法律网站'
          value={site} 
          onChange={e => setSite(e.target.value)} 
          onKeyDown={handleKeyDown} // Added this line
      />
      <button className="search-button" onClick={handleQueryInfo}>🔍</button>
      {/* <button className="screenshot-button" onClick={handleScreenshot}>开始采集</button>  */}
      {screenshotStatus && <p>{screenshotStatus}</p>}
      {/* <ul>
        {results.map(site => <li key={site.id}>{site.name}</li>)}
      </ul> */}
      <table>
        <thead>
            <tr>
                <th>网站ID</th>
                <th>网站名称</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            {displayedResults.map(site => (
                <tr key={site.id}>
                    <td>{site.id}</td>
                    <td>{site.name}</td>
                    <td>
                    {/* <button onClick={() => handleSpecificScreenshot(site.name)}>开始采集</button>  */}
                    <Button type="primary" onClick={() => handleSpecificScreenshot(site.name)}>开始采集</Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>

    <div className="pagination">
        <button onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}>上一页</button>
        <span>第 {currentPage} 页</span>
        <button onClick={() => setCurrentPage(page => Math.min(page + 1, Math.ceil(results.length / itemsPerPage)))}>下一页</button>
    </div>

    </div>
  );
}

export default App;
