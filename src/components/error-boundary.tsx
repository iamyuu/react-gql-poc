import * as React from 'react'
import {useQueryErrorResetBoundary} from 'react-query'
import {ErrorBoundary as ReactErrorBoundary} from 'react-error-boundary'
import type {ErrorBoundaryPropsWithComponent} from 'react-error-boundary'

export default function ErrorBoundary(props: React.PropsWithChildren<ErrorBoundaryPropsWithComponent>) {
  const {reset} = useQueryErrorResetBoundary()

  function handleReset() {
    reset()
    props.onReset?.()
  }

  return (
    <ReactErrorBoundary onReset={handleReset} {...props}>
      {props.children}
    </ReactErrorBoundary>
  )
}
