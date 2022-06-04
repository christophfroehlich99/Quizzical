import React from "react"
import {decode} from "html-entities"
export default function Question(props){
    
    React.useEffect(() => {
        if(props.checkAnswers){
            
        }
      },[props.checkAnswers])
 
    const buttonsElements = props.answersData.map(answer=>{
        let styles = ""
        if(!props.checkAnswers) {
              styles =  answer.isHeld ? "question-button-held" : "question-button" 
        }
        else {
            if (answer.text === props.correctAnswer){
                styles = "question-button-correct"
            }
            else if (answer.isHeld && (answer.text !== props.correctAnswer)){
                styles = "question-button-incorrect"
            }
            else {
                styles = "question-button-fade" 
            }
        }
        return <button
                key={answer.id} 
                onClick={() => props.toggleIsHeld(answer.id, props.questionIndex)}
                className={styles}
                 >
                    {decode(answer.text)}
                </button>
    })
    return(
        <div className="question-container">
            <h3 className="question">
                {decode(props.question)}
            </h3>
            {buttonsElements}
        </div>
    )
}



