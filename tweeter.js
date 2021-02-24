const puppeteer = require("puppeteer");

var fs = require("fs");


(async () => {
    try {
      // open the headless browser
      var browser = await puppeteer.launch();
      // open a new page
      var page = await browser.newPage();
      // enter url in page
      await page.goto(`https://trends24.in/india/`);
      await page.waitForSelector("div.trend-card:nth-of-type(1) li");
  
      var news = await page.evaluate(() => {
        var card = document.querySelectorAll(".trend-card")[0];
        var content = document.querySelectorAll(".trend-card__list")

        for (var i = 0; i < content.length; i++) {
          Tweets[i] = {
            title : document.querySelector("li").textContent,
            link: document.querySelector("li a").href,
            count : document.querySelector("li a .tweet-count").textContent
          };
        }
        return Tweets;
      });
      // console.log(news);
      //await browser.close();

      console.log(Tweets);
      // Writing the news inside a json file
      fs.writeFile("trends.json", JSON.stringify(news), function(err) {
        if (err) throw err;
        console.log("Saved!");
      });
      console.log(success("Browser Closed"));
    } catch (err) {
      // Catch and display errors
      console.log(error(err));
      console.log(error("Browser Closed"));
    }finally{

    }

  })();