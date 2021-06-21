import * as React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from './components/layout'

import NotFoundScreen from './screens/not-found'
import DashboardScreen from './screens/dashboard'
import ProfileScreen from './screens/profile'
import EmployeeListScreen from './screens/employee/list'

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
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  )
}
