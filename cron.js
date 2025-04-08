import cron from 'node-cron'
import { exec } from 'child_process'
import { error } from 'console'
import { stderr, stdout } from 'process'

// Planification tout les dimanches à 16h00
cron.schedule('0 16 * * 0', () => {
    console.log('Exécution du script de scraping pour One Piece...')

    exec('node scrapeChapitres.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur lors de l\'exécution du script:  ${error.message}`)
            return
        }
        if (stderr) {
            console.error(`Erreur stderr: ${stderr}`);
            return
        }
        console.log(`Script exécuté avec succès: \n${stdout}`);
        

    })
    
})

console.log('Cron démarré. En attente du dimanche 16h00...');
