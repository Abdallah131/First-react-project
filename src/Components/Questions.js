import React, { useEffect, useState } from "react";

export default function Question() {

    const API_URL = "https://opentdb.com/api.php?amount=5&type=multiple"
    const[questions,setQuestions] = useState([])
    const[loading,setLoading] = useState(false)
    const[selectedAnswer,setSelectedAnswer] = useState("")
    const[score,setScore] = useState(0)
    const[refresh,setRefresh] = useState(0)
    const[active,setActive] = useState(false)
    const[showScore,setShowScore] = useState(false)

    
    useEffect(()=>{
        let cancelled = false;
        setLoading(true)
        fetch(API_URL)
        .then( res => res.json())
        .then(data => {
            if(!cancelled){
                setQuestions(data.results)
                setLoading(false)
            }
        })
        return () => cancelled= true
    },[refresh])

    if(loading) {
        return <h1>Loading ...</h1>
    }
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
     }
     return array
    }
    const questionsArray = questions.map((question,index) => {
        let styles = {}
        if (question.difficulty === "easy") {
          styles = {color: "green"}
        } else if (question.difficulty === "medium") {
          styles = {color: "#ff6348"}
        } else {
          styles = {color: "red"}
        }
        const array = [...question.incorrect_answers,question.correct_answer]
        const questionsarray = shuffleArray(array)
        return(
        <div key={index} className="answerscontainer">
            <div className="triviacontainer">
                <h2>Question : {question.question}</h2>
                <span>Category : {question.category}</span>
                <span>Difficulty : </span> <span style={styles} className="diffspan">{question.difficulty}</span><br/>
                <div className="answerscontainer">
                    {questionsarray.map((answer,index) => {return <p key={index} onClick={handleAnswer}>{answer}</p>})}
                </div>
            </div>
        </div>
        )
    })
    function handleAnswer(e) {
        const {innerText} = e.currentTarget
        setSelectedAnswer(innerText)
        e.currentTarget.style.backgroundColor = active === false ? "#dfe6e9" : "#f8f4fc"
        setActive(prevActive => !prevActive)
        questions.map((question)=> {
                if(selectedAnswer === question.correct_answer){
                    setScore(prevScore => prevScore+1)
                }
            })
    }
    function updateQuestions() {
        setRefresh(prevRef => prevRef+1)
    }
    function buttonScore() {
        setShowScore(prevShow => !prevShow)
    }
    return(
        <div>
            <button className="refreshbutton" onClick={updateQuestions}>Refresh questions</button>
            {questionsArray}<br/>
            <button className="checkbutton" onClick={buttonScore}>{showScore === false ? "Submit": "Play again"}</button>
            {showScore && <span className="score">You've scored {score}/{questions.length}</span>}
        </div>
    )
}
