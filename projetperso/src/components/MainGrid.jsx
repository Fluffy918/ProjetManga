import { useState, useEffect } from "react"


function MainGrid() {
    const [mangas, setMangas] = useState([])

    useEffect(() => {
        fetch("http://localhost:5174/mangas/annuaire")
            .then(res => res.json())
            .then(data => setMangas(data))
            .catch(error => console.error("Erreur lors du chargement du mangas", error)
            )
    }, [])
    return(
        <div className="grid-container">
            {mangas.map(manga => (
                <div key={manga.id} className="manga-card">
                    <img src={manga.couverture} alt={manga.titre} />
                    <h3>{manga.titre}</h3>
                    <p>{manga.description}</p>
                </div>
            ))}
        </div>
    )
}

export default MainGrid