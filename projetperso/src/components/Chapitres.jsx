import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import "../Chapitres.css";

function Chapitres() {
    const {mangaId} = useParams()
    console.log("mangaId récupéré: ", mangaId);
    
    const [chapitres, setChapitres] = useState([])

    useEffect(() => {
        if (mangaId) {
            fetch(`http://localhost:5174/api/mangas/${mangaId}`)
            .then((res) => res.json())
            .then(data => setChapitres(data))
            .catch((error) => console.error("Erreur lors de la récupération des chapitres:", error))
        } else {
            console.error("mangaId is undifined");
        }
    }, [mangaId])

    return (
        <>
            <Nav/>
            <br />
            <br />
            <br />
            <div className="chapitres-container">
                <h2>
                    Liste des chapitres
                </h2>
                <ul className="chapitres-list">
                    {chapitres.map(chapitre => (
                        <li key={chapitre.id}>
                            <a href={chapitre.url} target="_blank" rel="noopener noreferrer">
                                Chapitre {chapitre.numero}: {chapitre.titre}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        
        </>
        
    )
}

export default Chapitres