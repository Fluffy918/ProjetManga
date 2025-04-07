import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'manga_db'
})

const mangaId = 2

const chapitres = []

for (let i = 1; i <= 700; i++) {
    chapitres.push({
        numero: i,
        titre: `Chapitre ${i}`,
        date_sortie: '1999-10-21',
        url: "https://www.mangas.io/lire/naruto"
    })
}

async function insertChapitresNaruto() {
    for (const chapitre of chapitres) {
        await connection.execute(
            "INSERT INTO chapitres (manga_id, numero, titre, date_sortie, url) VALUES(?, ?, ?, ?, ?)",
            [mangaId, chapitre.numero, chapitre.titre, chapitre.date_sortie, chapitre.url]
        )
    }
    console.log("Chapitres inséré avec succès")
    connection.end()
    
}

insertChapitresNaruto().catch(console.error())
