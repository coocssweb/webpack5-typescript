/*
 * @Author: wangjiaxin@leedarson.com
 * @Date: 2023-03-24 14:11:53
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-03-24 15:33:06
 */
import React from 'react';
import { Layout, Space } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const Main = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout>
        <Sider width={200}></Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Main;
