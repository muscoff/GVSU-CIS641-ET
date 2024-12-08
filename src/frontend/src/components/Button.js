import React from 'react'
import { Oval } from 'react-loader-spinner'

export default function Button({loading, name, className, onClick}) {
    if(loading){
        return (<div className="width-100 padding-all-10 blue-bg flex-column justify-content-center align-items-center">
            <Oval 
                visible={true}
                height="30"
                width="30"
                color="#fff"
            />
        </div>
        )
    }
  return (
    <button 
        onClick={()=>onClick ? onClick() : null} 
        className={`${className ?? ''} blue-bg white-text`}
    >
        {name ?? 'Button'}
    </button>
  )
}
