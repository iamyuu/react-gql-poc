import * as React from 'react'
import {Row, Col} from 'antd'
import ErrorBoundary from '~/components/error-boundary'
import {CardProfileLoading, CardProfileFallbackError} from '~/components/profile/card-profile'

const CardProfile = React.lazy(() => import('~/components/profile/card-profile'))

export default function DashboardScreen() {
  return (
    <Row gutter={[8, 8]}>
      <Col span={8}>
        <ErrorBoundary FallbackComponent={CardProfileFallbackError}>
          <React.Suspense fallback={<CardProfileLoading />}>
            <CardProfile />
          </React.Suspense>
        </ErrorBoundary>
      </Col>
      <Col span={16}>TODO: add todo</Col>
    </Row>
  )
}
