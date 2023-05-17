import React from "react";

export default function Dice(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#ACE1AF" : "#FFF"
    }

    function dotNumber() {
        const dotArray = []
        for (let i = 1; i <= props.value; i++) {
            dotArray.push(i)
        }

        return dotArray.fill(0)
            .map((_, idx) => <div key={idx} className={`dot dot-${props.value}`}></div>)
    }

    return (
        <div className="dice-face" style={styles} onClick={props.holdDice}>
            <div className={`dice-inner dice-${props.value}`}>
                {/* <h2 className="dice-num">{props.value}</h2> */}
                {dotNumber()}
            </div>
        </div>
    )
}