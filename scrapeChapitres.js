import axios from 'axios'
import * as cheerio from 'cheerio'
import db from './server.js'

const mangaId = 1

const URL = 'https://www.scan-vf.net/one_piece'

async function chapitresExisteDeja(numero) {
    const [rows] = await db.promise().query(
        'SELECT id FROM chapitres WHERE manga_id = ? AND numero = ?',
        [mangaId, numero]
    )
    return rows.length > 0
}

async function scrapeChapitres() {
    try {
        const {data} = await axios.get(URL)
        const $ = cheerio.load(data)

        const chapitres = []

        $('a[href*="/one_piece/chapitre-"]').each((index, element) => {
            const titreComplet = $(element).text().trim()
            const href = $(element).attr('href')
            const match = titreComplet.match(/(\d+)/)
            const numero = match ? parseInt(match[1]) : null

            if (numero && href) {
                chapitres.push({
                    numero,
                    titre: titreComplet,
                    url: href.startsWith('http') ? href : 'https://www.scan-vf.net' + href
                })
            }
        })

        if (chapitres.length === 0) {
            console.log('Aucun chapitre trouvé.');
            return
        }

        for (const chapitre of chapitres) {
            const existe = await chapitresExisteDeja(chapitre.numero)
            if (!existe) {
                await db.promise().query(
                    'INSERT INTO chapitres (manga_id, numero, titre, date_sortie, url) VALUES (?, ?, ?, CURDATE(), ?)',
                    [mangaId, chapitre.numero, chapitre.titre, chapitre.url]
                )
                console.log(`Chapitre ${chapitre.numero} ajouté`);
            } else {
                console.log(`Chapitre ${chapitre.numero} déjà existant`); 
            }
        }
    } catch (error) {
        console.error('Erreur de scraping: ', error);
    } finally {
        db.end()
    }
}

scrapeChapitres()