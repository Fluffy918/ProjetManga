async function AjouterChapitre() {
    const chapitre = {
        manga_id: 1,
        numero: 1144,
        titre: "Le temps des guerriers",
        date_sortie: "2025-03-27",
        url: "https://www.scan-vf.net/one_piece/chapitre-1144/1"
    }

    try {
        const res = await fetch("http://localhost:5000/api/chapitres", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chapitre)
        })

        const data = await res.json()
        console.log(data.message);
    } catch (error) {
        console.error("Erreur lors de l'ajout du chapitre", error);
        
    }
}

export default AjouterChapitre