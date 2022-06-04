import React from "react"

export default function Frontpage(props){
    return(
        <div className ="app-start">
            <h1 className="app-name">
                Quizzical   
            </h1>
            <p className="app-description">
                Some description if needed
            </p>
            <button 
                onClick={()=> props.setSite(true)}
                className="app-start-button">
                Start quiz
            </button>
        </div>
    )
}