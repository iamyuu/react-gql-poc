import * as React from 'react'
import {Layout, Menu, Breadcrumb} from 'antd'

const {Header, Content, Footer, Sider} = Layout

const sidenavs = ['Employee', 'Profile']
const breadcrumbs = ['Home', 'Employee', 'List']

interface PropsChildren {
  children: React.ReactNode
}

function AppSidenav() {
  return (
    <Sider theme='light' breakpoint='lg' collapsedWidth='0'>
      <div
        style={{
          height: '2rem',
          margin: '1rem',
          background: 'rgba(0, 0, 0, 0.1)',
        }}
      />
      <Menu mode='inline' defaultSelectedKeys={[sidenavs[1]]}>
        {sidenavs.map(nav => (
          <Menu.Item key={nav}>{nav}</Menu.Item>
        ))}
      </Menu>
    </Sider>
  )
}

function AppHeader() {
  return (
    <Header
      style={{
        padding: 0,
      }}
    />
  )
}

function AppMain(props: PropsChildren) {
  return (
    <Content
      style={{
        margin: '0 1rem',
      }}
    >
      <Breadcrumb
        style={{
          margin: '1rem 0',
        }}
      >
        {breadcrumbs.map(breadcrumb => (
          <Breadcrumb.Item key={breadcrumb}>{breadcrumb}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
      {props.children}
    </Content>
  )
}

function AppFooter() {
  return (
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
  )
}

export default function AppLayout(props: PropsChildren) {
  return (
    <Layout>
      <AppSidenav />
      <Layout>
        <AppHeader />
        <AppMain>{props.children}</AppMain>
        <AppFooter />
      </Layout>
    </Layout>
  )
}
