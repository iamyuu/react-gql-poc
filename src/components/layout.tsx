import * as React from 'react'
import {Link} from 'react-router-dom'
import {Layout, Menu} from 'antd'

const sidenavs = ['Dashboard', 'Edit Profile']

interface PropsChildren {
  children: React.ReactNode
}

function AppSidenav() {
  return (
    <Layout.Sider theme='light' breakpoint='lg' collapsedWidth='0'>
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
    </Layout.Sider>
  )
}

function AppHeader() {
  return (
    <Layout.Header
      style={{
        padding: 0,
      }}
    />
  )
}

function AppMain(props: PropsChildren) {
  return (
    <Layout.Content
      style={{
        margin: '1rem',
      }}
    >
      {props.children}
    </Layout.Content>
  )
}

export default function AppLayout(props: PropsChildren) {
  return (
    <Layout style={{height: '100vh'}}>
      <AppSidenav />
      <Layout>
        <AppHeader />
        <AppMain>{props.children}</AppMain>
      </Layout>
    </Layout>
  )
}
