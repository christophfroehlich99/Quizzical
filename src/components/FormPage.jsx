import React from "react"

export default function FormPage({initQuestions}){
    return(
        <div>
            <button 
                onClick={() =>
                    initQuestions() 
                 }>
                hehehe
            </button>
        </div>
    )
}