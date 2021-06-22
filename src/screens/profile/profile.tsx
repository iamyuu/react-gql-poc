import * as React from 'react'
import {useProfileQuery} from '~/generated/graphql'

export default function ProfileScreen() {
  const {data, isLoading} = useProfileQuery()

  if (isLoading) {
    return <span>loading...</span>
  }

  return <span>hi, {data?.profile.name}</span>
}
