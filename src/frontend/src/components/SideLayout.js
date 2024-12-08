import React, {useEffect} from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Logo from './Logo'
import Button from './Button'

export default function SideLayout({sideContent}) {
  useEffect(()=>{
    const admin = localStorage.getItem('et-admin')
    const { pathname } = new URL(window.location.href)
    if(!(admin)) {
      window.location.href = `/${pathname.indexOf('admin') > -1 ? 'admin' : 'user'}-login`
    }
  })
  const sideItems = sideContent && sideContent.length > 0 ? sideContent.map((item, index)=>(
    <NavLink to={item.link} key={index}>
      <div className="nav-menu flex-row align-items-center">
        <div className="font-20 marginRight-5">{item.icon}</div>
        <div className='truncate font-gotham'>{item.name}</div>
      </div>
    </NavLink>
  )) : <></>

  const logout = () => {
    localStorage.removeItem('et-admin')
    window.location.reload()
  }

  return (
    <div className="row">
      <div id="sidemenubar" className="width-25">
        <div className="fixed width-25 height-100" style={{backgroundColor: 'rgb(40,40,40)'}}>
          <div 
            className="padding-all-10 font-helvetica center-text yellow-bg1 white-text uppercase font-20"
          >
            <div className="width-60 margin-auto"><Logo /></div>
          </div>
          <br />
          <div>{sideItems}</div>
          <br />
          <div className="flex-column justify-content-center align-items-center">
            <Button name="Logout" onClick={logout} />
          </div>
          <br />
        </div>
      </div>
      <div className="width-75 width-l-100 width-m-100 width-s-100 off-white-bg min-height-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
