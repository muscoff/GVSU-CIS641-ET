import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header({title, subtitle}) {
  const navigation = useNavigate()
  const goToLink = link => navigation(link)
  const links = !Array.isArray(subtitle) ? '': subtitle.map((item, index)=>(
    <div key={index} className='' style={{display: 'flex', flexDirection: 'row'}}>
      <div 
        className='cursor-pointer red-hover'
        key={index} 
        onClick={()=>goToLink(item.link)}
      >
        {item.title}
      </div>
      <div>{index === subtitle.length - 1 ? '' : <span className="padding-all-2"> | </span>}</div>
    </div>
  ))
  return (
    <header className="heading font-avenir-regular padding-all-20 padding-l-all-2 padding-m-all-2 padding-s-all-2">
      <div className="font-18 uppercase truncate font-avenir-bold">{title ?? ''}</div>
      {/* <div className="font-14 truncate">{subtitle ?? ''}</div> */}
      <div className="font-14 flex-row">{links}</div>
      <div className="padding-all-2"></div>
    </header>
  )
}
