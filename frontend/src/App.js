import React, { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([{}])
  

  function analyze() {
    let twitterhandle = document.getElementById("twitterhandle").value
    if(twitterhandle !== "") {
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
        Twitter handle:
        <input type = "text" id ="twitterhandle"/>
      </div>
      
      <button onClick = {()=>analyze()}>Submit</button>
      {(typeof data.analysis === 'undefined') ? (
        <p>Loading...</p>
      ): (
        <p>{data.analysis}</p>
      )}
      
    </div>
  )
}

export default App

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