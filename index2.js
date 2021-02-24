const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('https://trendlistz.com/india');
    
    await page.screenshot({path: 'twitter.png'});

    var posts = await page.evaluate(() => {
        var x = document.querySelectorAll(".trend-item");
        var obj = [];
        Array.from(x).forEach(function (element) { 
            var tweets = element.querySelector(".trend-item__content .term").textContent
            var url = element.querySelector(".trend-item__content .term a").href
            var comment = element.querySelector(".trend-item__content .meta-info").textContent

            console.log(tweets.trim());
            console.log(url.trim());
            console.log(comment.trim());
        });
    })
    
    
})();






