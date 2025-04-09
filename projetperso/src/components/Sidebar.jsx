import { useEffect, useState } from "react"

function Sidebar() {
    const [alphabet, setAlphabet] = useState([])

    useEffect(() => {
        const letters = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i))
        setAlphabet(letters)
    }, [])
    return (
        <>
            <aside className="sidebar">
                <section>
                    <h4>Catégories</h4>
                    <div className="categories">
                        <span>Action</span>
                        <span>Comedy</span>
                        ...
                    </div>
                </section>

                <section>
                    <h4>Lettres</h4>
                    <div className="alphabet">
                        {alphabet.map(letter => (
                            <button key={letter} onClick={() => handleFilterByLetter(letter)}>
                                {letter}
                            </button>
                        ))}
                    </div>
                </section>
            </aside>
        </>
    )
}

export default Sidebar