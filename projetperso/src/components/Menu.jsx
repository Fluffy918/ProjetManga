import { useState, useEffect } from "react";
import { data, useLocation } from "react-router-dom";
import { fetchMangas } from "../api";


function useQuery() {
    return new URLSearchParams(useLocation().search)
}
function Menu() {
    const [mangas, setMangas] = useState([])
    const query = useQuery()
    const search = query.get("search")

    useEffect(() => {
        async function loadMangas() {
            if (search) {
                const filtered = data.filter(mangas =>
                    mangas.titre.toLowerCase().includes(search.toLocaleLowerCase())
                )
                setMangas(filtered)
            } else {
                setMangas(data)
            }
        }
        loadMangas
    }, [search])

    return (
        <div>
            <h2>Résultats :</h2>
            <ul>
                {mangas.map((manga) => (
                    <li key={manga.id}>{manga.titre}</li>
                ))}
            </ul>
        </div>
    )
};

export default Menu;