import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "manga_db"
})

const mangaId = 1

const chapitres = []

for (let i = 1; i <= 1144; i++) {
    chapitres.push({
        numero: i,
        titre: `Chapitre ${i}`,
        date_sortie: "1997-07-22", 
        url: "https://www.scan-vf.net/one_piece"
    })
}

async function insertChapitres() {
    for (const chapitre of chapitres) {
        await connection.execute(
            "INSERT INTO chapitres (manga_id, numero, titre, date_sortie, url) VALUES(?, ?, ?, ?, ?)",
            [mangaId, chapitre.numero, chapitre.titre, chapitre.date_sortie, chapitre.url]
        )
    }
    console.log("Chapitre insérés avec succès");
    connection.end()
}



insertChapitres().catch(console.error);

