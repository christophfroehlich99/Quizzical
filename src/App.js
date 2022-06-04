import React from "react"
import './App.css';
import Question from "./Question"
import {nanoid} from "nanoid"


export default function App() {
  const [site, setSite] = React.useState(false)
  const [checkAnswers, setCheckAnswers] = React.useState(false)
  const [rightAnswers, setRightAnswers] = React.useState(0)
  const [questions, setQuestion] = React.useState([])
  const [modifiedQuestions, setModifiedQuestions] = React.useState([])
  

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(questions => setQuestion(questions.results))
    console.log("ran")
  },[site])
  
  
  
  React.useEffect(() => {
    setModifiedQuestions(questions.map((question, index)=>{
      const answers =
      [...question.incorrect_answers, question.correct_answer].sort(() => 0.5 - Math.random())
      const modifiedAnswers = answers.map(answer => {
        return {text: answer,
                id: nanoid(),
                isHeld: false
                }
      })
      return {questionIndex: index,
              questionContent: {
                text: question.question,
                answers: {answersData:modifiedAnswers},
                correct_answer: question.correct_answer
              }        
              }
    }))
  },[questions])


  const questionElements = modifiedQuestions.map(question=>{
    const {questionContent, questionIndex} = question
    return <Question 
    question={questionContent.text} 
    {...questionContent.answers}
    key={questionIndex}
    questionIndex={questionIndex}
    toggleIsHeld={toggleIsHeld}
    checkAnswers={checkAnswers}
    correctAnswer={questionContent.correct_answer}/>
  })

  
  //toggles isHold for the question buttons
  function toggleIsHeld(answerId, questionId){
    setModifiedQuestions(prevModifiedQuestions => 
      prevModifiedQuestions.map(question => {
        return question.questionIndex !== questionId ? question :
        {...question,
        questionContent: 
          {...question.questionContent, 
            answers: {...question.questionContent.answers,
              answersData: question.questionContent.answers.answersData.map(answer => {
                return answerId !== answer.id ?
                 {...answer, isHeld:false} :
                 {...answer, isHeld:true}
              })
            }}
        }
    }))
  }
  
  // checking if all questions have a selected 
  // answer when the check buttons is clicked
  // if so set checkAnswers to true

  function toggleCheckAnswers(){
    let control = 0
    modifiedQuestions.forEach(question => {
      const {answersData} = question.questionContent.answers 
      let selectedAnswer =answersData.find(answer => answer.isHeld)
      console.log(selectedAnswer)
      if (selectedAnswer.text === question.questionContent.correct_answer){
        console.log("ran2")
        setRightAnswers(prevRightAnswers => prevRightAnswers + 1)
        control++
      }
      else if((answersData.filter(answer => answer.isHeld)).length > 0){
        control++
      }
    })
    if(control === modifiedQuestions.length){
      setCheckAnswers(true)
    }
  }
  console.log(modifiedQuestions)
  console.log(rightAnswers)
  
  return (
    !site ?
    <div className="app-background">
      <div className ="app-start">
        <h1 className="app-name">
          Quizzical
        </h1>
        <p className="app-description">
          Some description if needed
        </p>
        <button 
          onClick={() =>setSite(true)}
          className="app-start-button">
          Start quiz
        </button>
      </div>
    </div> :
    <div className="question-background">
       <div className="question-page">
        {questionElements}
        <div className="button-container">
          {checkAnswers ? 
            <div className="play-again-score-wrapper">
              <h2 className="score">
                You scored {rightAnswers}/{questions.length} correct answers
              </h2> 
              <button 
              className="app-check-button"
              onClick={() =>{
                setSite(false)
                setCheckAnswers(false)
                setRightAnswers(0)
              }}
              >
                Play again
              </button>
            </div>:
            <button 
              onClick={ () => {
                toggleCheckAnswers()
              }
              }
              className="app-check-button">
              Check answers
            </button> }
          </div>
       </div>
    </div>
  );
}

 
