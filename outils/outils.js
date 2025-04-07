// Fonction inséré un chapitre
async function insertChapitres() {
    for (const chapitre of chapitres) {
        await connextion.execute(
            "INSERT INTO chapitres (manga_id, numero, titre, date_sortie, url) VALUES(?, ?, ?, ?, ?)",
            [mangaId, chapitre.numero, chapitre.titre, chapitre.date_sortie, chapitre.url]
        )
    }
    console.log('Manga inséré avec succès');
    connection.end()
}

insertChapitres().catch(console.error())