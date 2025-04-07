import express from "express"
import path from 'path'
import { fileURLToPath } from "url"
import pool from "./database/bdd.js"
import mysql from "mysql2"
import cors from "cors"
import { error } from "console"

const __filename = fileURLToPath(import.meta.url) // Utilise import.meta.url pour obtenir l'URL du fichier
const __dirname = path.dirname(__filename) // // Utilise path.dirname pour obtenir le répertoire

const app = express();
//const port = 3000

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'manga_db'
})

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return
    }
    console.log('Connecté à la base de données MySQL');
    
})

app.get('/mangas', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM mangas')
        res.json(rows)
    } catch (error) {
        console.error('Erreur lors de la récupération des mangas: ', error);
        res.status(500).json({error: 'Erreur serveur'})
        
    }
})

app.get('/api/mangas/:mangaId', (req, res) => {
    const mangaId = req.params.mangaId
    console.log("mangaId reçu :", mangaId);
    
    const query = 'SELECT * FROM chapitres WHERE manga_id = ?'
    db.query(query, [mangaId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({message: 'Erreur serveur'})
        }

        if (results.length > 0) {
            res.json(results)
        } else {
            res.status(404).json({ message: 'Aucun chapitre trouvé pour ce manga' })
        }
    })
})

//app.get('/api/mangas/:mangaId', (req, res) => {
//    const mangaId = req.params.mangaId
//    console.log("mangaId reçu :", mangaId);
//
//    const query = 'SELECT * FROM chapitres WHERE manga_id = ?'
//    db.query(query, [mangaId], (err, results) => {
//        if (err) {
//            console.error(err)
//            res.status(500).json({message: 'Erreur serveur'})
//        }
//        if (results.length > 0) {
//            res.json(results)
//        } else {
//            res.status(404).json({message: 'Aucun chapitre trouvé pour ce manga'})
//        }
//    })
//})

app.use(express.static(path.join(__dirname, 'public')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})
app.post('/api/mangas', async (req, res) => {
    try {
        const {manga_id, numero, titre, date_sortie, url} = req.body
        if (!manga_id || !numero || !titre || !date_sortie || !url) {
            return res.status(400).json({message: "Tous les champs sont obligatoires."})
        }

        const [result] = await db.execute(
            "INSERT INTO chapitres (manga_id, numero, titre, date_sortie, url) VALUES (?, ?, ?, ?, ?)",
            [manga_id, numero, titre, date_sortie, url]
        )

        res.status(201).json({message: "Chapitre ajouté avec succès !"})
    } catch (error) {
        console.error("Erreur lors de l'ajout du chapitre :", error);
        res.status(500).json({message: "Erreur serveur"})
        
    }
})




const PORT = 5174

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    
})

//app.post('/', (req, res) => {
//    res.send('post request')
//})

//app.listen(port, () => {
//    console.log(`Exemple app listening on port ${port}`);
//    
//})

export default db
