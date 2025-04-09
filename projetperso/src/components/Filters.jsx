import { useEffect, useState } from "react"
import "../Filters.css"

function Filters({onLetterClick}) {
    const [alphabet, setAlphabet] = useState([])

    useEffect(() => {
        fetch("http://localhost:5174/api/alphabet")
            .then(res => res.json())
            .then(data => setAlphabet(data))
            .catch(err => console.error("Erreur du chargement de l'alphabet", err)
            )
    }, [])

    return(
        <>
            <div className="filters">
                {alphabet.map((letter) => (
                    <button key={letter} onClick={() => onLetterClick(letter)}>
                        {letter}
                    </button>
                ))}
            </div>
        </>
    )
}

export default Filters