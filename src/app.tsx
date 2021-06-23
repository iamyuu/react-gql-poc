import * as React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Layout from './components/layout'

import DashboardScreen from './screens/dashboard'
import ProfileScreen from './screens/profile'

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
      <Route path='/' element={<Navigate to='/dashboard' replace />} />
      <Route path='/dashboard' element={<DashboardScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
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
