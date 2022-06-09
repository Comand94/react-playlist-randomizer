import React from "react"
import "./Song.css"

export default function Song(props) {
    return (
        <div className="Song">
            <h3>--- {props.word} ---</h3>
            <h4 className="Song-recording">Billy Joel - The Stranger - She's Always A Woman</h4>
        </div>
    )
}