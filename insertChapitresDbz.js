import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'manga_db'
})

const manga_id = 2

const chapitres = []

for (let i = 1; i <= 519; i++) {
    chapitres.push({
        numero: i,
        titre: `Chapitre ${i}`,
        date_sortie: "1993-05-17",
        url: "https://sushiscan.net/dragon-ball-volume-1/"
    })
}

async function insertChapitresDbz() {
    for (const chapitre of chapitres) {
        await connection.execute(
            "INSERT INTO chapitres (manga_id, numero, titre, date_sortie, url) VALUES(?, ?, ?, ?, ?)",
            [manga_id, chapitre.numero, chapitre.titre, chapitre.date_sortie, chapitre.url]
        )
    }
    console.log('Connection effectué avec succès');
    connection.end()
    
}

insertChapitresDbz().catch(console.error);


