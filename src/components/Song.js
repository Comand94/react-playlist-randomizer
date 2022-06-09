import "./Song.css"
import React, { useEffect, useState } from "react"

// Song takes word as prop and fetches it's own recording data based on that
export default function Song(props) {
    const [artistName, setArtistName] = useState("")
    const [albumName, setAlbumName] = useState("")
    const [songName, setSongName] = useState("")

    const recordingHTML = (
        <h5 className="Song-recording">
            {songName !== "" ?
                `${artistName} | ${albumName} | ${songName}`
                : "No recording found!"}
        </h5>
    )

    // fetch data on creation only
    useEffect(() => {
        async function getSongInfo() {
            const data =
                await fetch(`http://musicbrainz.org/ws/2/recording?query=${props.word}&limit=1&fmt=json`)
                    .then(res => res.json())

            if (data.recordings[0] !== undefined) { // recording found
                setSongName(data.recordings[0].title)
                setArtistName(data.recordings[0]["artist-credit"][0].name)
                setAlbumName(data.recordings[0]["releases"][0].title)
            }
            else { // recording not found - "" will be interpreted as not found
                setSongName("")
                setArtistName("")
                setAlbumName("")
            }
        }
        getSongInfo() // call once
    }, [])

    return (
        <div className="Song">
            <h3>--- {props.word} ---</h3>
            {recordingHTML}
        </div>
    )
}