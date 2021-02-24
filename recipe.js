const puppeteer = require('puppeteer');
const url = 'https://www.tgwilkins.co.uk/recipes.html';
const options = {
    headless: false
};
const selector = '.recipe-item';
(async function(){
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto(url);
    const recipeNames = await page.$$eval(selector, nodes => {
        return nodes.map(node => {
            const h2 = node.querySelector('h2');
            return h2.textContent;
        })
    });
    console.log(recipeNames);
    await browser.close();
})();