import mysql from 'mysql2/promise'
const connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'manga_db'
})

const mangaId = 8

const chapitres = []

for (let i = 1; i <= 402; i++) {
    chapitres.push({
        numero: i,
        titre: `Chapitre ${i}`,
        date_sortie: '1998-03-03',
        url: 'https://sushiscan.net/catalogue/hunter-x-hunter/'
    })
}

async function insertChapitresHxh() {
    for (const chapitre of chapitres) {
        (await connection).execute(
            "INSERT INTO chapitres (manga_id, numero, titre, date_sortie, url) VALUES(?, ?, ?, ?, ?)",
            [mangaId, chapitre.numero, chapitre.titre, chapitre.date_sortie, chapitre.url]
        )
    }
    console.log('Manga inséré avec succès');
    (await connection).end()
}

insertChapitresHxh().catch(console.error())