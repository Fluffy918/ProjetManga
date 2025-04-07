import { useEffect, useState } from "react";
import "../MangasList.css"
import { Link } from "react-router-dom";
import Footer from "./Footer";

function MangaList() {
    const [mangas, setMangas] = useState([])

    useEffect(() => {
        fetch('http://localhost:5174/mangas')
            .then(res => res.json())
            .then(data => setMangas(data))
            .catch(error => console.error('Erreur lors du chargement du mangas:', error)
            )
    }, [])

    return (
        <>
            <h2>Liste des Mangas</h2>
            <div className="mangas-container">
                {mangas.map(manga => (
                    <div key={manga.id} className="manga-card">
                        <Link to={`/mangas/${manga.id}`}>
                        <img src={manga.couverture} alt={manga.titre} width={150}/>
                        </Link>
                        <h3>{manga.tittre}</h3>
                        <p>{manga.description}</p>
                        <p>{manga.auteur}</p>
                        <p>{manga.statut}</p>
                    </div>
                ))}
            </div>
            <Footer/>
        </>
    )
}

export default MangaList