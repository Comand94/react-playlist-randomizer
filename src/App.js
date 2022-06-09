import "./App.css"
import Song from "./components/Song"
import React, { useEffect, useState } from "react"
import { nanoid } from "nanoid"

function App() {
    const [numberOfSongs, setNumberOfSongs] = useState(5)
    const [wordsData, setWordsData] = useState([])

    const songs = wordsData.map(word => {
        return (
            <Song
                key={nanoid()}
                word={word}
            />
        )
    })
    
    // on input change
    function changeNumberOfSongs(event) {
        let val = event.target.value

        // validation
        if (val < 5) val = 5
        else if (val > 20) val = 20

        setNumberOfSongs(val)
    }

    // on button press
    async function randomizeWords() {
        const newWordsData = []

        for (let i = 0; i < numberOfSongs; i++) {
            let data = ""
            do {
                data = await fetch("https://random-words-api.vercel.app/word")
                    .then(res => res.json()).then(data => data[0].word)
            } while (newWordsData.includes(data)) // make sure the word isn't repeated
            newWordsData.push(data) // push the new word into the array
        }
        setWordsData(newWordsData.sort())
    }

    return (
        <div className="App">
            <div className="App-header">
                <h1>React Playlist Randomizer</h1>
                <div className="App-form">
                    <input className="App-input" onChange={changeNumberOfSongs}
                        type="number" min="5" max="20"></input>
                    <button className="App-button" onClick={randomizeWords}>Randomize Songs</button>
                </div>
            </div>

            <div className="App-songs">
                {songs}
            </div>
        </div>
    )
}

export default App
