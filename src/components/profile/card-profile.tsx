import * as React from 'react'
import {Card, Typography, Skeleton, Alert, Button} from 'antd'
// import ErrorBoundary from '~/components/error-boundary'
import type {FallbackProps} from 'react-error-boundary'
import {useProfileQuery} from '~/generated/graphql'

export function CardProfileLoading() {
  return (
    <Card>
      <Typography.Title level={3}>
        <Skeleton active title={{width: '75%'}} paragraph={false} />
        <Skeleton active title paragraph={false} />
      </Typography.Title>
    </Card>
  )
}

export function CardProfileFallbackError(props: FallbackProps) {
  return (
    <Alert
      type='error'
      message='There was an error!'
      description={props.error.message}
      action={
        <Button size='small' type='default' onClick={() => props.resetErrorBoundary()}>
          Try again
        </Button>
      }
    ></Alert>
  )
}

export default function CardProfileDataView() {
  const {data, error, isError} = useProfileQuery({}, {suspense: true})

  if (isError) {
    throw error
  }

  return (
    <Card>
      <Typography.Title level={3}>{data?.profile.name}</Typography.Title>
      <Typography>{data?.profile.email}</Typography>
    </Card>
  )
}

// export default function CardProfile() {
//   return (
//     <ErrorBoundary FallbackComponent={CardProfileFallbackError}>
//       <React.Suspense fallback={<CardProfileLoading />}>
//         <CardProfileDataView />
//       </React.Suspense>
//     </ErrorBoundary>
//   )
// }
