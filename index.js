const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = process.env.PORT || 4000;

// Creamos una ruta llamada /scrape
app.get('/scrape', async (req, res) => {
    console.log("Recibida petición de n8n...");
    
    let browser;
    try {
        // Lanzamos Puppeteer
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = (await browser.pages())[0];

        // Navegamos a la URL
        await page.goto('https://www.google.com/maps?sca_esv=434108a22045feca&rlz=1C1ONGR_esCO1054CO1054&output=search&q=carnicos+medellin&source=lnms&fbs=AIIjpHx4nJjfGojPVHhEACUHPiMQcG_77B-hmbxHGSx0Fwu3oUGVAxkUj6FedW1OxjKWbuqNTMRHwwejzGSJHcI45oBSLaQSkSwQxtkD0mzFH-iOGQvUJCtscvALxGyD4CP-Ps46bSMmh1eFvZwchjI1IIuxaCz2CEFPY5NJ12_MPQzQJYzLxZENwJFH8hXG_DSvjyhUtZ2a95g1cy4DZLGzHaKNZGsUAw&entry=mc&ved=1t:200715&ictx=111', {
            waitUntil: 'networkidle0'
        });

        // Extraemos el texto
        const extractedText = await page.$eval('*', (el) => el.innerText);
        
        // Cerramos el navegador
        await browser.close();

        // IMPORTANTE: Enviamos la respuesta de vuelta a n8n
        res.json({
            success: true,
            data: extractedText
        });

    } catch (error) {
        if (browser) await browser.close();
        console.error("Error en el scraping:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Iniciamos el servidor
app.listen(port, () => {
    console.log(`Servidor de Puppeteer listo en puerto ${port}`);
});