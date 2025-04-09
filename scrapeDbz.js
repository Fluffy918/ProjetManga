import puppeteer from "puppeteer";
import db from "./server.js";

const mangaId = 3
const url = 'https://sushiscan.net/catalogue/dragon-ball/'

async function scrapeDbz() {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    try {
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36')
        await page.goto(url, {waitUntil: 'networkidle2'})

        const chapitres = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('a.chapitre'))
            return links.map(link => {
                const titre = link.textContent.trim()
                const href = link.href
                const match = titre.match(/Chapitre\s*(\d+)/i)
                const numero = match ? parseInt(match[1]) : null
                return numero && href ? {numero, titre, href} : null
            }).filter(Boolean)
        })

        for (const chapitre of chapitres) {
            const [rows] = await db.promise().query(
                'SELECT id FROM chapitres WHERE manga_id = ? AND numero = ?',
                [mangaId, chapitre.numero]
            )

            if (rows.length === 0) {
                await db.promise().query(
                    'INSERT INTO chapitres (manga_id, numero, titre, date_sortie, url) VALUES (?, ?, ?, ?, ?)',
                    [mangaId, chapitre.numero, chapitre.titre, new Date(), chapitre.href]
                )
                console.log(`Chapitre ${chapitre[1]} ajouté`);
            } else {
                console.log(`Chapitre ${chapitre[1]} déja présent`);
                
            }
        }
    } catch (error) {
        console.error('Erreur sraping DBZ: ', error);    
    } finally {
        db.end()
    }
}

scrapeDbz()