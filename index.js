var app = require('express')();
const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

app.get("/*", async function(req,res) {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });
    const page = await browser.newPage();
    await page.goto("https://facebook.com/login");
    await page.evaluate(function() {
      document.querySelector("#email").value="abhishek7gg7@gmail.com";
      document.querySelector("#pass").value="q_nY.#64DsWP5Dv";
      document.querySelector("#u_0_0").click();
    })
    const file = await page.screenshot({fullPage: true});
    await browser.close();
    res.type("image/png").end(file);
})

app.listen(process.env.PORT);
