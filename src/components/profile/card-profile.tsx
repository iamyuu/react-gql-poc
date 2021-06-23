import * as React from 'react'
import {Card, Typography, Skeleton} from 'antd'
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

export default function CardProfile() {
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
