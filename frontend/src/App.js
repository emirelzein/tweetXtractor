import React, { useState, useEffect } from 'react'
import "./App.css"

function App() {

  const [data, setData] = useState([{}])

  const [submitButtonClicked, setsubmitButtonClicked] = useState(false)

  function analyze() {
    let twitterhandle = document.getElementById("twitterhandle").value
    if(twitterhandle !== "") {
      setsubmitButtonClicked(true)
      fetch("/ScrapeThenAnalyze/" + twitterhandle).then(
        res => res.json()
      ).then(
        data => {
          setData(data)
          console.log(data)
        }
      )
    }  
  }
    
  


  return(
    <div>
      <div>
        {submitButtonClicked ?
            (typeof data.analysis === 'undefined') ? (
                <div class="loading-symbol"><div class="loadingio-spinner-bean-eater-cc9fnnnnkov"><div class="ldio-n5u2mvqlw1">
<div><div></div><div></div><div></div></div><div><div></div><div></div><div></div></div>
</div></div></div>
            ): (
                <div class="grid-container">
                    <div class="grid-item"><h2>General Analysis</h2><p>{data.analysis}</p></div>
                    <div class="grid-item"><h2>Main Sentiments</h2><p >{data.sentiment}</p></div>
                    <div class="grid-item"><h2>Main Topics</h2><p>{data.topic}</p></div>
                    <div class="grid-item"><h2>Language Used</h2><p>{data.language}</p></div>
                    <button type="submit" class="btn btn-primary btn-block btn-large" onClick = {()=>{setsubmitButtonClicked(false); data.analysis = undefined;} }>Analyze Another Account</button>  
                </div> 
            )
          :	      
          <div class="login">
            <h1>Enter Twitter Handle:</h1>        
            <input type="text" name="u" placeholder="@" required="required" id ="twitterhandle" />
            <button type="submit" class="btn btn-primary btn-block btn-large" onClick = {()=>analyze()}>Submit</button>  
          </div>
        }
      </div>
    </div>
  )
}

export default App

/*
{(typeof data.analysis === 'undefined') ? (
        <p>Loading...</p>
        ): (
          <p>{data.analysis}</p>
        )}
*/

/*
  <button onClick = {() => {{
        (typeof data.analysis === 'undefined') ? (
        <p>Loading...</p>
      ): (
        <p>{data.analysis}</p>
      )}}}>Click me</button>
*/
/*
 {(typeof data.members === 'undefined') ? (
        <p>Loading...</p>
      ): (
        data.members.map((member,i) => (
          <p key={i}>{member}</p>
        ))
      )}
 */