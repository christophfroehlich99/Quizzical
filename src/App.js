import React from "react"
import './App.css';
import Frontpage from "./components/Frontpage";
import Questionpage from "./components/QuestionPage";


export default function App() {
  const [site, setSite] = React.useState(false)
  const [questions, setQuestion] = React.useState([])

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(questions => setQuestion(questions.results))
  },[site])
  
  
  return (
    !site ?
      <Frontpage 
        setSite={setSite}
      />
      :
      <Questionpage
        setSite={setSite}
        questions={questions}
      />
    
  );
}

 
