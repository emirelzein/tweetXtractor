import React, { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/ScrapeThenAnalyze").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  })


  return(
    <div>
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
 {(typeof data.members === 'undefined') ? (
        <p>Loading...</p>
      ): (
        data.members.map((member,i) => (
          <p key={i}>{member}</p>
        ))
      )}
 */