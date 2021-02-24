const puppeteer = require('puppeteer');
const fs = require("fs")



(async () => {
  const browser = await puppeteer.launch({headless: false});
  //const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com/news');
  await page.screenshot({path: 'example.png'});
  //const name = await page.$eval('.hnname > a', el => el.innerText)
  //console.log(name)
  await page.waitForSelector('body');
  var rposts = await page.evaluate(() => {
       
    let posts = document.body.querySelectorAll('tr');       
    postItems = [];
   
    posts.forEach((item) => {
        let title = ''
        //let summary = ''
        let link = ''
        try{
         title = item.querySelector('.storylink').innerText;
        if (title!=''){
             link = item.querySelector('.storylink').href;
             postItems.push({title : title, link : link});
             //console.log(title);
             //console.log(link);
             

            //fs.writeFileSync("D:\Electron js\twitter scrap\meet.json", JSON.stringify(myJSON));
            
        }
        }
        catch(e){
        }
       
    })
    console.log(postItems)
    var myJSON = JSON.stringify(postItems);
            fs.writeFile("D:\Electron js\twitter scrap\meet.json", myJSON, (err) => {
                if (err) throw err;
                console.log('Data written to file');
            });
    
});
 // await browser.close();
})();

