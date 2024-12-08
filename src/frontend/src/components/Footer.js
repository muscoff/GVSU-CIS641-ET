import React from 'react'

export default function Footer() {
    const year = new Date().getFullYear()
  return (
    <div className="deep-blue-bg white-text padding-all-20">
        <div className="center-text">
            <div className="font-20 bold-text uppercase">CIS641 - System Analysis and Design Term Project</div>
            <br />
            <div className="bold-text">DEVELOPED BY: Mustapha Muhammed Botchway</div>
            <br />
            <div className="font-14">All Rights Reserved - {year}</div>
        </div>
    </div>
  )
}
