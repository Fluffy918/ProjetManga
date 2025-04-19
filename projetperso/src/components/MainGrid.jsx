import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import "../MainGrid.css"


function MainGrid() {
    const [mangas, setMangas] = useState([])
    const {lettre, genre} = useParams()
    

    useEffect(() => {
        let url = "http://localhost:5174/api/mangas/annuaire"

        if (lettre) {
            url = `http://localhost:5174/api/mangas/annuaire/${lettre}`
        } else if (genre) {
            url = `http://localhost:5174/api/mangas/annuaire/${genre}`
        }

        fetch(url)
            .then(res => res.json())
            .then(data => setMangas(data))
            .catch(err => console.error("Erreur chargement mangas: ", err)
            )
    }, [lettre, genre])
    return(
        <div className="grid-container">
            {mangas.map(manga => (
                <div key={manga.id} className="manga-card">
                    <Link to={`/mangas/${manga.id}`}>
                        <img src={manga.couverture} alt={manga.titre} />
                    </Link>
                    <h3>{manga.titre}</h3>
                    <p>{manga.description}</p>
                </div>
            ))}
        </div>
    )
}

export default MainGrid