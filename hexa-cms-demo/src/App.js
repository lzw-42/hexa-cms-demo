import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ArticleList from './components/ArticleList';
import SystemSettings from './components/SystemSettings';
import UserManagement from './components/UserManagement';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [activePage, setActivePage] = useState('articles');
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    const handleNewPost = (data) => {
      console.log('收到服务器推送：', data);
      setAlertMsg(`🔔 系统通知：${data.author}刚刚发布了新文章《${data.title}》！`);
      setTimeout(() => {
        setAlertMsg('');
      }, 5000);
    };

    socket.on('new_post_alert', handleNewPost);

    return () => {
      socket.off('new_post_alert', handleNewPost);
    };
  }, []);

  return (
    <div className="app-container">
      {alertMsg && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
          padding: '15px 20px', backgroundColor: '#d4edda',
          color: '#155724', borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          fontSize: '14px', fontWeight: 'bold',
          maxWidth: '400px',
          animation: 'slideIn 0.3s ease-out'
        }}>
          {alertMsg}
        </div>
      )}
      <Header />
      <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
        {activePage === 'articles' && <ArticleList />}
        {activePage === 'system' && <SystemSettings />}
        {activePage === 'users' && <UserManagement />}
      </div>
    </div>
  );
}

export default App;
