import * as React from 'react'
import {Link} from 'react-router-dom'
import {Layout, Menu} from 'antd'

const {Header, Content, Footer, Sider} = Layout

const sidenavs = ['Dashboard', 'Edit Profile']

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
      <Menu mode='inline'>
        {sidenavs.map(nav => (
          <Menu.Item key={nav}>
            <Link to={`/${nav.toLowerCase().replaceAll(' ', '-')}`}>{nav}</Link>
          </Menu.Item>
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
        margin: '1rem',
      }}
    >
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
