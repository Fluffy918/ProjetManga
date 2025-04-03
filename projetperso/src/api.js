import { data } from "react-router-dom";

const API_URL = "http://localhost:5174";

export async function fetchMangas() {
    fetch('http://localhost:5147/api/mangas/1')
        .then(res => {
            if (!res.ok) {
                throw new Error('Erreur HTTP: ' + res.status)
            }
            return res.json()
        })
        .then(data => {
            console.log('Données mangas:', data);
        })
        .catch(error => {
            console.error('Erreur lors du chargement des mangas:', error);
            
        })
    try {
        const res = await fetch(`${API_URL}/mangas`);
        return await res.json();
    } catch (error) {
        console.error('Erreur lors du chargement des mangas:', error);
        return [];
        
    }
}