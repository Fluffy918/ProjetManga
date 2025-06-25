import axios from "axios";
import cheerio from "cheerio";

async function fetchHtml(url) {
    const { data } = await axios.get(url)
    return cheerio.load(data)
}

function extractChapitresFromHtml($, selector) {
    const chapitres = []
    $(selector).each((_, el) => {
        chapitres.push($(el).text().trim())
    })
    return chapitres
}

module.exports = {
    fetchHtml,
    extractChapitresFromHtml,
}