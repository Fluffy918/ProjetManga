import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ChapitresDbz() {
    const {manga_id} = useParams()
    console.log("Mangas récupérer:", manga_id);

    const [chapitresDbz, setChapitresDbz] = useState([])

    useEffect(() => {
        if (manga_id) {
            fetch(`http://localhost:5174/api/mangas/${manga_id}`)
                .then((res) => res.json())
                .then((data) => setChapitresDbz(data))
                .catch((error) => console.error("Erreur lors de la récupération des Mangas !", error)
                )
        } else {
            console.error("manga_id is undifined");
        }
    }, [manga_id])

    return (
        <div>
            <h2>Liste des chapitres</h2>
            <ul>
                {chapitresDbz.map(chapitre => (
                    <li key={chapitre.id}>
                        <a href={chapitre.url} target="_blank" rel="noopener noreferrer">
                            Chapitre {chapitre.numero}: {chapitre.titre}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ChapitresDbz