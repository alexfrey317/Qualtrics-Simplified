console.log('Server-side code running');

const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

function test() {
  console.log('Hello');
}

async function run () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com/');
  await page.screenshot({path: 'screenshot1.png'});
  browser.close();
}

//Button Functions
async function qualtrics(first, last, email){
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://purdue.ca1.qualtrics.com/jfe/form/SV_0iDcy5mOnP0NFPf');


  //First Page
  await page.type('[id="QR~QID4"]', first);
  await page.type('[id="QR~QID7"]', last);
  await page.type('[id="QR~QID9"]', email);
  await page.evaluate(() => {
       let test = document.querySelector('[id="QR~QID5~6"]');
       test.click();
  });
  await page.click('[id="NextButton"]');
  await page.waitForTimeout(1000);
  //Second Page

  await page.evaluate(() => {
    let test1 = document.querySelector('[id="QR~QID1~2"]');
    test1.click();
  });
  await page.evaluate(() => {
    let test2 = document.querySelector('[id="QR~QID2~2"]');
    test2.click();
  });
  await page.waitForTimeout(1000);
  await page.evaluate(() => {
    let test3 = document.querySelector('[id="NextButton"]');
    test3.click();
  });

  await browser.close();   
}
//Button Functions

// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//Alex
app.post("/alex", function(req, res){
  qualtrics('Alex', 'Frey', 'alexfrey317@gmail.com');
  console.log('Alex');
})

//Geno
app.post("/geno", function(req, res){
  qualtrics('Geno', 'Christofanelli', 'chris245@purdue.edu');
  console.log('Geno');
})

app.post("/joey", function(req, res){
  qualtrics('Joey', 'Kasch', 'kaschj@purdue.edu');
  console.log('Joey');
})

app.post("/caleb", function(req, res){
  qualtrics('Caleb', 'Williams', 'will2236@purdue.edu');
  console.log('Caleb');
})
