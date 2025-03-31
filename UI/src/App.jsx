import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Box from '@mui/material/Box';
import { LaptopOutlined, UserOutlined, FontColorsOutlined, GatewayOutlined  
} from '@ant-design/icons';

import ValidateLogic from './pages/ValidateLogic.jsx'
import Dashboard from './pages/Dashboard.jsx';
import OCR from './pages/OCR.jsx';
import ObjectDetection from './pages/ObjectDetection.jsx';

import logo from './assets/react.svg'

const componentsMap = {
  "dashboard": <Dashboard></Dashboard>,
  "validateLogic": <ValidateLogic/>,
  "OCR": <OCR></OCR>,
  "objectDetection": <ObjectDetection></ObjectDetection>,
}



const { Header, Content, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [
  {
    key: 'sub1', // 첫 번째 항목의 key
    icon: React.createElement(UserOutlined),
    label: '소개', // 첫 번째 서브 메뉴 이름
    children: [
      { key: 'dashboard', label: 'dashboard' }, // 첫 번째 서브 메뉴의 첫 번째 항목
      { key: '1-2', label: '2' }
    ]
  },
  {
    key: 'sub2', // 두 번째 항목의 key
    icon: React.createElement(FontColorsOutlined ),
    label: '언어모델',
    children: [
      { key: 'validateLogic', label: '논리적 오류 찾기' },
    ]
  },
  {
    key: 'sub3',
    icon: React.createElement(GatewayOutlined ),
    label: '이미지 모델',
    children: [
      { key: 'OCR', label: '글자 추출' },
      { key: 'objectDetection', label: '물체 탐지' }
    ]
  }
];

const App = () => {

  const [selectedComponentKey, setSelectedComponentKey] = useState("dashboard");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo">
          {/* <img src={logo} alt="logo"></img> */}
          <Box sx={{color:'white', width: 170}}>
            <h2>deepCider</h2>
          </Box>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            onClick={(e) => setSelectedComponentKey(e.key)}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={items2.map((item) => item.key)}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            items={[
              {
                title: 'deepCider',
              },
              {
                title: 'List',
              },
              {
                title: selectedComponentKey,
              },
            ]}
            style={{
              margin: '16px 0',
            }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: '100vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {
              componentsMap[selectedComponentKey]
            }
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;