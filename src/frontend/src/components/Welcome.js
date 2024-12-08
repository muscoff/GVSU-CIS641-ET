import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
    const navigation = useNavigate()
  return (
    <>
        <div className="black-bg white-text">
            <div className="font-40 center-text bold-text padding-all-10">Welcome to ET - Documentation</div>
            <br />
            <div className="width-80 margin-auto">
                <div className="bold-text font-25">Project Proposal</div>
                <br />
                <div className="padding-all-10">
                    <div>
                        ET is just a simple web app (e-commerce app) that is going 
                        empower students resideing at campus housing to sell valuable items 
                        of theirs instead of leaving it at the reception during move-out.
                    </div>
                    <br />
                    <div className="italic bold font-20">
                        Motivation for the app
                    </div>
                    <br />
                    <div>
                        During my first semester stay at campus housing, most students leave
                        valuable items behind during move-out and for most of them, their excuse
                        for leaving it behind is simply because they don't have anyone to sell it 
                        to and they do not want to carry it all the way back home since some are out of state.         
                    </div>
                    <br />
                    <div>
                        ET platform aims at providing students the opportunity to sell valuable items in perfect 
                        to good condition to other residents and get some back on their valuables.
                    </div>
                </div>
            </div>
        </div>
        <div className="off-white-bg">
            <div className="font-40 center-text bold-text padding-all-10">Main Phases of the App</div>
            <br />
            <div className="width-80 margin-auto">
                The two main phases of the app is the <span className="red-hover cursor-pointer italic bold-text" onClick={()=>navigation('/user-login')}>buyer</span> and the <span className="red-hover cursor-pointer italic bold-text" onClick={()=>navigation('/admin-login')}>seller</span>
            </div>
            <br />
            <br />
        </div>
    </>
  )
}
