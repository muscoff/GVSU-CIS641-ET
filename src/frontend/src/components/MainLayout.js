import React from 'react'

export default function MainLayout({children, headerClass, titleClass, title, showBtn, btnName, onClick}) {
  return (
    <div className="mainlayout">
      <header className={`flex-row justify-content-space-between align-items-center padding-all-10 ${headerClass ?? ''}`}>
        <div className={`truncate font-avenir-bold font-14 uppercase ${titleClass}`}>{title ?? ''}</div>
        <div>{showBtn ? <button onClick={()=>onClick ? onClick() : null}>{btnName ?? 'Button'}</button> : <div/>}</div>
      </header>
      {children}
    </div>
  )
}
