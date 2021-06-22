import * as React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from './components/layout'

import NotFoundScreen from './screens/not-found'
import DashboardScreen from './screens/dashboard'
import ProfileScreen from './screens/profile'
import EmployeeListScreen from './screens/employee/list'

const queryClient = new QueryClient()

function AppProvider(props: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>{props.children}</Layout>
      </Router>
    </QueryClientProvider>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<DashboardScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
      <Route path='/employee/list' element={<EmployeeListScreen />} />
      <Route path='*' element={<NotFoundScreen />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}
