import React from "react"
import "./FormPage.css"

export default function FormPage({initQuestions, loading}){
    const [formData, setFormData] = React.useState(
        {
            numberQuestions: 10,
            category: "",
            difficulty: "",
            type: ""
        }
    )  
    
console.log(initQuestions)
    function handleChange(event) {
        const {name, value,} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]:  value
            }
        })
    }
    
console.log(formData)
    
        const api =
         `https://opentdb.com/api.php?amount=${formData.numberQuestions}${formData.category.length > 1 ? "&category="+formData.category : ""}${formData.difficulty.length > 1 ? "&difficulty="+formData.difficulty : ""}${formData.type.length > 1 ? "&type="+formData.type : ""}`
    
    
    return(
        <div className="form-wrapper">
            <form className="form">
                <label className="form-label" htmlFor="part-time">Number of Questions:</label>
                <input
                    className="form-input" 
                    type="number" 
                    name="numberQuestions"
                    id="numberQuestions" 
                    min="1" 
                    max="20" 
                    value={formData.numberQuestions}
                    onChange={handleChange}
                />
                
                <label className="form-label" htmlFor="category">Select Category:</label>
                <select 
                    className="form-select"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    name="category"
                >
                    <option value="any">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals & Theatres</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="31">Entertainment: Japanese Anime & Manga</option>
                </select>

                <label className="form-label" htmlFor="difficulty">Select Difficulty:</label>
                <select 
                    className="form-select"
                    id="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    name="difficulty"
                >
                    <option value="any">Any difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

             </form>  
             <button 
                    className="form-button"
                    onClick={() =>
                        initQuestions(api)
                    }>
                    Get Questions
                </button>
                {loading && 
                <div className="loader">
                    <div className="inner one"></div>
                    <div className="inner two"></div>
                    <div className="inner three"></div>
                </div>}   
        </div>
    )
}


// multiple choice
{/* <label className="form-label" htmlFor="type">Select Type:</label>
                <select
                    className="form-input" 
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
                    name="type"
                >
                    <option value="any">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select> */}
