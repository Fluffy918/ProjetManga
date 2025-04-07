import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'manga_db'
})

const mangaId = 4

const chapitres = []

for (let i = 1; i <= 139; i++) {
    chapitres.push({
        numero: i,
        titre: `Chapitre ${i}`,
        date_sortie: '2010-03-17',
        url: 'https://sushiscan.net/catalogue/lattaque-des-titans/'
    })
}

async function insertChapitresSnk() {
    for (const chapitre of chapitres) {
        await connection.execute(
            "INSERT INTO chapitres (manga_id, numero, titre, date_sortie, url) VALUES(?, ?, ?, ?, ?)",
            [mangaId, chapitre.numero, chapitre.titre, chapitre.date_sortie, chapitre.url]
        )
    }
    console.log("Mangas insérés avec succès");
    connection.end()
    
}

insertChapitresSnk().catch(console.error())