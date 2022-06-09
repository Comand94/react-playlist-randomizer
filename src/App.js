import "./App.css"
import Song from "./components/Song"
import React, { useState, useMemo } from "react"
import { nanoid } from "nanoid"

export default function App() {
    const [wordsData, setWordsData] = useState([]) // data[0].word
    const [numberOfSongs, setNumberOfSongs] = useState(5) // between 5 and 12
    const [fetchingWordsProgress, setFetchingWordsProgress] = useState(0) // for progress bar

    // only update Song components when wordsData is updated as well
    const songsHTML = useMemo(() =>
        wordsData.map(word => {
            return (
                <Song
                    key={nanoid()}
                    word={word}
                />
            )
        }
    ), [wordsData])

    const wordsProgressHTML = (
        <h2 className="App-fetching-text" >
            Fetching words {fetchingWordsProgress}/{numberOfSongs}
        </h2 >
    )
  
    // on input box change
    function changeNumberOfSongs(event) {
        let val = event.target.value

        // validation
        if (val < 5) val = 5
        else if (val > 12) val = 12

        setNumberOfSongs(val)
    }

    // on button press
    async function randomizeWords() {
        if (fetchingWordsProgress === 0) { // don't fetch again until finished fetching
            const newWordsData = []

            for (let i = 0; i < numberOfSongs; i++) {
                let data = ""
                do {
                    data = await fetch("https://random-words-api.vercel.app/word")
                        .then(res => res.json()).then(data => data[0].word)
                } while (newWordsData.includes(data)) // make sure the word isn't repeated
                newWordsData.push(data) // push the new word into the array
                setFetchingWordsProgress(i)
            }
            setWordsData(newWordsData.sort())
            setFetchingWordsProgress(0)
        }
    }

    return (
        <div className="App">
            <div className="App-header">
                <h1>React Playlist Randomizer</h1>
                <div className="App-form">
                    <input className="App-input" onChange={changeNumberOfSongs}
                        value={numberOfSongs}
                        type="number" min="5" max="12"></input>
                    <button className="App-button" onClick={randomizeWords}>Randomize Songs</button>
                </div>
            </div>

            <div className="App-songs">
                {fetchingWordsProgress !== 0 ? wordsProgressHTML : songsHTML}
            </div>
        </div>
    )
}
