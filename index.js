var app = require('express')();
const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

app.get("/login", async function(req,res) {
try {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1");
    await page.setViewport({
      'width': 375,
      'height': 812,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    });
    await page.goto("https://facebook.com/login");
    await page.waitForSelector('#m_login_email');
    await page.type('#m_login_email','abhishek7gg7@gmail.com');
    await page.type('#m_login_password','q_nY.#64DsWP5Dv');
    await page.click('button');
    await page.waitFor(2000);
    res.end(await page.screenshot());
    await browser.close()
}
catch(err) {
    res.send(err.message);
   }
})

app.get("/*", async function(req,res) {
try {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1");
    await page.setViewport({
      'width': 375,
      'height': 812,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    });
    await page.goto(req.query.url,{referer: "https://www.buzzfeed.com/abhishek7gg7"});
    await page.waitFor(1000);
    await browser.close()
    res.redirect(301,"https://stream.ooh.now.sh"+req.url);
}
catch(err) {
    res.redirect(301,"https://stream.ooh.now.sh"+req.url);
}
})

app.listen(process.env.PORT);
