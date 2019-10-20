var app = require('express')();
const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const axios = require("axios");
const $ = require("cheerio");
const fs = require("fs");

app.get("/reset", async function(req,res) {
try {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
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
    await page.goto("https://www.seedr.cc/dynamic/lost_password");
    await page.waitForSelector("input.email-field:nth-child(1)");
    await page.type("input.email-field:nth-child(1)","abhishek7gg7@gmail.com");
    await page.click(".large-4 > input:nth-child(1)");
    await page.waitForSelector("div.reveal-modal:nth-child(74) > div:nth-child(2)");
    res.end(await page.screenshot());
    await browser.close();
}
catch(err) {
    res.send(err.message);
   }
})

app.get("/login", async function(req,res) {
try {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
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
    await page.goto("https://www.seedr.cc/dynamic/lost_password");
    await page.waitForSelector("input.email-field:nth-child(1)");
    await page.type("input.email-field:nth-child(1)","abhishek7gg7@gmail.com");
    await page.click(".large-4 > input:nth-child(1)");
    await page.waitForSelector("div.reveal-modal:nth-child(74) > div:nth-child(2)");
    res.end(await page.screenshot());
    await browser.close();
}
catch(err) {
    res.send(err.message);
   }
})

app.listen(process.env.PORT);
