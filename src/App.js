import React from "react"
import './App.css';
import Frontpage from "./components/Frontpage";
import Questionpage from "./components/QuestionPage";
import FormPage from "./components/FormPage"


export default function App() {
  const [site, setSite] = React.useState(0)
  const [questions, setQuestion] = React.useState([])
  const [loading, setLoading] = React.useState(false)
console.log(site)
 
  async function initQuestions(api) {
    setLoading(true)
    const res = await fetch(api)
    const data = await res.json()
    setQuestion(data.results)    
    setSite(2)
    setLoading(false)
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
        loading={loading}
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

 
