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
      <div class="login">
        {submitButtonClicked?
            (typeof data.analysis === 'undefined') ? (
              <p class="flex-container">Loading...</p>
            ): (
               <p class="flex-container">{data.analysis}</p>
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