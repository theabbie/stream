var app = require('express')();
const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const axios = require("axios");
const $ = require("cheerio");
const fs = require("fs");

app.get("/add", async function(req,res) {
try {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
    });
    const page = await browser.newPage();
    page.on('dialog', async dialog => {
    await dialog.accept();
  });
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.setUserAgent(userAgent);
    await page.setViewport({
      'width': 375,
      'height': 812,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    });
    await page.evaluateOnNewDocument(() => {
  Object.defineProperty(navigator, 'webdriver', {
    get: () => false,
  });
});
    await page.evaluateOnNewDocument(() => {
  // We can mock this in as much depth as we need for the test.
  window.navigator.chrome = {
    runtime: {},
    // etc.
  };
});
    await page.evaluateOnNewDocument(() => {
  const originalQuery = window.navigator.permissions.query;
  return window.navigator.permissions.query = (parameters) => (
    parameters.name === 'notifications' ?
      Promise.resolve({ state: Notification.permission }) :
      originalQuery(parameters)
  );
});
    await page.evaluateOnNewDocument(() => {
  // Overwrite the `plugins` property to use a custom getter.
  Object.defineProperty(navigator, 'plugins', {
    // This just needs to have `length > 0` for the current test,
    // but we could mock the plugins too if necessary.
    get: () => [1, 2, 3, 4, 5],
  });
});
    await page.evaluateOnNewDocument(() => {
  // Overwrite the `plugins` property to use a custom getter.
  Object.defineProperty(navigator, 'languages', {
    get: () => ['en-US', 'en'],
  });
});
    await page.goto("https://www.seedr.cc/");
    await page.evaluate(function() {
    login({username: "abhishek7gg7@gmail.com",password: "password"});
    });
    await page.waitForSelector("#first-folder");
    await page.click("#first-folder");
    await page.keyboard.press('Delete');
    var m = req.query.m || "magnet:?xt=urn:btih:dbf21fc9a28d7c292b5cd9462683a1e150d4e0e3";
    await page.evaluate(function(m) {
    add_link(m)
    },m);
    await page.waitFor(750);
    res.redirect(301,req.baseUrl+'/get');
    await browser.close();
}
catch(err) {
    res.send(err.message);
   }
})

app.get("/get", async function(req,res) {
try {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
    });
    const page = await browser.newPage();
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.setUserAgent(userAgent);
    await page.setViewport({
      'width': 375,
      'height': 812,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    });
    await page.evaluateOnNewDocument(() => {
  Object.defineProperty(navigator, 'webdriver', {
    get: () => false,
  });
});
    await page.evaluateOnNewDocument(() => {
  // We can mock this in as much depth as we need for the test.
  window.navigator.chrome = {
    runtime: {},
    // etc.
  };
});
    await page.evaluateOnNewDocument(() => {
  const originalQuery = window.navigator.permissions.query;
  return window.navigator.permissions.query = (parameters) => (
    parameters.name === 'notifications' ?
      Promise.resolve({ state: Notification.permission }) :
      originalQuery(parameters)
  );
});
    await page.evaluateOnNewDocument(() => {
  // Overwrite the `plugins` property to use a custom getter.
  Object.defineProperty(navigator, 'plugins', {
    // This just needs to have `length > 0` for the current test,
    // but we could mock the plugins too if necessary.
    get: () => [1, 2, 3, 4, 5],
  });
});
    await page.evaluateOnNewDocument(() => {
  // Overwrite the `plugins` property to use a custom getter.
  Object.defineProperty(navigator, 'languages', {
    get: () => ['en-US', 'en'],
  });
});
    await page.goto("https://www.seedr.cc/");
    await page.evaluate(function() {
    login({username: "abhishek7gg7@gmail.com",password: "password"});
    });
    await page.waitForSelector("#first-folder");
    var id = await page.evaluate(function() {return document.querySelector("#first-folder").getAttribute("folder_id");});
    res.redirect(301,req.baseUrl+'/search?id='+id);
    await browser.close();
}
catch(err) {
    res.redirect(301,req.baseUrl+"/get");
   }
})

app.get("/search", async function(req,res) {
try {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
    });
    const page = await browser.newPage();
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.setUserAgent(userAgent);
    await page.setViewport({
      'width': 375,
      'height': 812,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    });
    await page.evaluateOnNewDocument(() => {
  Object.defineProperty(navigator, 'webdriver', {
    get: () => false,
  });
});
    await page.evaluateOnNewDocument(() => {
  // We can mock this in as much depth as we need for the test.
  window.navigator.chrome = {
    runtime: {},
    // etc.
  };
});
    await page.evaluateOnNewDocument(() => {
  const originalQuery = window.navigator.permissions.query;
  return window.navigator.permissions.query = (parameters) => (
    parameters.name === 'notifications' ?
      Promise.resolve({ state: Notification.permission }) :
      originalQuery(parameters)
  );
});
    await page.evaluateOnNewDocument(() => {
  // Overwrite the `plugins` property to use a custom getter.
  Object.defineProperty(navigator, 'plugins', {
    // This just needs to have `length > 0` for the current test,
    // but we could mock the plugins too if necessary.
    get: () => [1, 2, 3, 4, 5],
  });
});
    await page.evaluateOnNewDocument(() => {
  // Overwrite the `plugins` property to use a custom getter.
  Object.defineProperty(navigator, 'languages', {
    get: () => ['en-US', 'en'],
  });
});
    await page.goto("https://www.seedr.cc/files/"+req.query.id);
    await page.evaluate(function() {
    login({username: "abhishek7gg7@gmail.com",password: "password"});
    });
    await page.waitForSelector(".video-icon-bg");
    await page.click('.video-icon-bg', {button : 'right'}); 
    await page.waitFor(600)
    var url = await page.evaluate(function() {document.querySelector("div.context-menu-item:nth-child(2)").click();return document.querySelector('.alert-box').innerHTML.split(" ")[1]})
    res.end(url.split("&amp;").join("&"));
    await browser.close();
}
catch(err) {
    res.send(err.message);
   }
})

app.listen(process.env.PORT);
