// Fonction inséré un chapitre
import mysql from 'mysql2/promise'
const connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'manga_db'
})

const mangaId = ''

const chapitres = []

for (let i = 1; i <= 7; i++) {
    chapitres.push({
        numero: i,
        titre: `Chapitre ${i}`,
        date_sortie: '',
        url: ''
    })
}

async function insertChapitres() {
    for (const chapitre of chapitres) {
        await connection.execute(
            "INSERT INTO chapitres (manga_id, numero, titre, date_sortie, url) VALUES(?, ?, ?, ?, ?)",
            [mangaId, chapitre.numero, chapitre.titre, chapitre.date_sortie, chapitre.url]
        )
    }
    console.log('Manga inséré avec succès');
    connection.end()
}

insertChapitres().catch(console.error())