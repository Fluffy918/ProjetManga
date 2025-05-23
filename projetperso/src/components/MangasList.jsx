import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../MangasList.css"
import { Link } from "react-router-dom";
import Footer from "./Footer";



function MangaList() {
    const [mangas, setMangas] = useState([])
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search)
    const search = searchParams.get('search')


    useEffect(() => {
        const fetchData = async () => {
            const url = search
                ? `http://localhost:5174/api/mangas/search?q=${search}`
                : `http://localhost:5174/mangas`;
            
            try {
                const res = await fetch(url)
                const data = await res.json()
                console.log("Résultat recherche :", data)
                if (Array.isArray(data)) {
                    setMangas(data)
                } else {
                    console.warn("La réponse n'est pas un tableau: ", data)
                    setMangas([])
                }
            } catch (error) {
                console.error('Erreur lors du chargement du mangas: ', error);
            }  
        }

        fetchData()
    }, [search])

    return (
        <>
            <h2>Liste des Mangas</h2>
            <div className="mangas-container">
                {Array.isArray(mangas) && mangas.length > 0 ? (
                    mangas.map(manga => (
                        <div key={manga.id} className="manga-card">
                            <Link to={`/mangas/${manga.id}`}>
                                <img src={manga.couverture} alt={manga.titre} width={150} />
                            </Link>
                            <h3>{manga.tittre}</h3>
                            <p>{manga.description}</p>
                            <p>{manga.auteur}</p>
                            <p>{manga.statut}</p>
                        </div>
                    ))
                ) : (
                        <p>Aucun manga trouvé.</p>
                    )}
            </div>
            <Footer/>
        </>
    )
}

export default MangaList