import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../DerniersChapitres.css'


function DerniersChapitres() {
    const [chapitres, setChapitres] = useState([])

    useEffect(() => {
        fetch("http://localhost:5174/api/mangas/derniers")
            .then(res => res.json())
            .then(data => setChapitres(data))
            .catch(err => console.error("Erreur de chargement des chapitres:", err)
            )
    }, [])

    return (
        <div className="derniers-container">
            <h2>Dernières mises à jour Manga</h2>
            <hr />

            <ul className="chapitres-liste">
                {chapitres.map((chapitre) => (
                    <li key={chapitre.id} className="chapitre-item">
                        <div className="chapitre-gauche">
                            <Link to={`/mangas/${chapitre.manga_id}`} className="manga-nom">
                                {chapitre.titre_manga}
                            </Link>
                            <p className="chapitre-titre">
                                #{chapitre.numero} {chapitre.titre}
                            </p>
                        </div>
                        <div className="chapitre-droite">
                            <span>{formatDate(chapitre.date_sortie)}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
} 

function formatDate(dateStr) {
    const date = new Date(dateStr)
    const today = new Date()
    const diff = today - date
    const oneDay = 1000 * 60 * 60 * 24
    return diff < oneDay ? "Hier" : date.toLocaleDateString('fr-FR') 
}

export default DerniersChapitres