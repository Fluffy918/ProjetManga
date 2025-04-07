import mysql from "mysql2/promise"

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'manga_db'
})

const mangaId = 6

const chapitres = []

for (let i = 1; i <= 271; i++) {
    chapitres.push({
        numero: i,
        titre: `Chapitre ${i}`,
        date_sortie: '2021-01-09',
        url: 'https://www.scan-vf.net/jujutsu-kaisen'
    })
}

async function insertChapitresJjk() {
    for (const chapitre of chapitres) {
        (await connection).execute(
            "INSERT INTO chapitres (manga_id, numero, titre, date_sortie, url) VALUES(?, ?, ?, ?, ?)",
            [mangaId, chapitre.numero, chapitre.titre, chapitre.date_sortie, chapitre.url]
        )
    }
    console.log("Mangas inséré avec succès");
    (await connection).end()
    
}

insertChapitresJjk().catch(console.error())