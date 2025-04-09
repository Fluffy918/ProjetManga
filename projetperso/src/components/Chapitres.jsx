import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import "../Chapitres.css";

function Chapitres() {
    const {mangaId} = useParams()
    console.log("mangaId récupéré: ", mangaId);
    
    const [chapitres, setChapitres] = useState([])
    const [mangaInfo, setMangaInfo] = useState(null)

    useEffect(() => {
        if (mangaId) {
            fetch(`http://localhost:5174/api/mangas/${mangaId}`)
                .then((res) => res.json())
                .then(data => {
                    const chapitresTries = data.sort((a, b) => b.numero - a.numero)
                    setChapitres(data)
                })
                .catch((error) => console.error("Erreur lors de la récupération des chapitres:", error));
            
            fetch(`http://localhost:5174/api/mangas/${mangaId}/info`)
                .then((res) => res.json())
                .then((data) => setMangaInfo(data))
                .catch((error) => console.error("Erreur lors de la récupération des infos du mangas", error)
                )
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
                {mangaInfo && (
                    <div className="manga-header">
                        <img src={mangaInfo.couverture} alt={mangaInfo.titre} className="manga-cover"/>
                        <div className="manga-description">
                            <h3>{mangaInfo.titre}</h3>
                            <p>{mangaInfo.description}</p>
                        </div>
                    </div>
                )}
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
            <Footer/>        
        </>
        
    )
}

export default Chapitres