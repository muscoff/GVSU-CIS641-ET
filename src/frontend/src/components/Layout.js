import React from 'react'

export default function Layout({children, className}) {
  return (
    <div className={className ?? 'width-90 width-m-95 width-s-95 margin-auto'}>{children}</div>
  )
}
