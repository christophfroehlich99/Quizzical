import React from "react"
import './App.css';
import Frontpage from "./components/Frontpage";
import Questionpage from "./components/QuestionPage";
import FormPage from "./components/FormPage"


export default function App() {
  const [site, setSite] = React.useState(0)
  const [questions, setQuestion] = React.useState([])

  // React.useEffect(() => {
  //   fetch("https://opentdb.com/api.php?amount=5&type=multiple")
  //   .then(res => res.json())
  //   .then(questions => setQuestion(questions.results))
  // },[site])


  async function initQuestions() {
    const res = await fetch(`https://opentdb.com/api.php?amount=5&type=multiple`)
    const data = await res.json()
    setQuestion(data.results)    
    setSite(2)
}
  

  return (
    <div>
      {site === 0 &&
       <Frontpage 
        setSite={setSite}
      />}

      {site === 1 &&
        <FormPage
        initQuestions={initQuestions}
      />
      }

      {site === 2 &&
        <Questionpage
        setSite={setSite}
        questions={questions}
      />
      }
    </div>
    
      
      
      
    
  );
}

 
