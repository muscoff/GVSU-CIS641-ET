import React, {useState} from 'react'

export default function Collection({children, className, title, titleClassName}) {
    const [active, setActive] = useState(false)
    const toggle = () => setActive(!active)
  return (
    <div className="collection">
        <div onClick={toggle} className={`collection-head padding-all-10 cursor-pointer ${className ?? ''}`}>
          <div className="padding-all-2" />
          <div className={titleClassName ?? "font-20"}>{title ?? ''}</div>
          <div className="padding-all-2" />
        </div>
        <div className={`collection-body ${active ? 'active': ''}`}>{children}</div>
    </div>
  )
}