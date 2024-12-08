import React, {useState} from 'react'

export default function CollectionL({children, className, title, bodyClassName, onClick}) {
    const [active, setActive] = useState(onClick)
    const toggle = () => setActive(!active)
  return (
    <div className="collection">
        <div onClick={()=>onClick ? null : toggle()} className={`collection-head no-effect ${className ?? ''}`}>
          <div>{title ?? ''}</div>
        </div>
        <div className={`collection-body ${active ? 'active': ''} ${bodyClassName ?? ''}`}>{children}</div>
    </div>
  )
}