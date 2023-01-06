const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");
const path = require('path');
const { LAUNCH_URL, CARD_SELECTOR } = require('./constants');
const { dataConfig } = require('./config');
const { PAGE_PUPPETEER_OPTS, LAUNCH_PUPPETEER_OPTS } = require('../../common/config');
const { toTitleCase } = require('../../common/helpers/index');

const resultFolderPath = path.join(__dirname, '../', '../', '../', 'results/');

let browser = null;

const collectEstateData = async ({ estateLink }) => {
  const page = await browser.newPage();
  await page.goto(estateLink, PAGE_PUPPETEER_OPTS);

  const parsedData = await page.evaluate(async dataConfig => {
    const data = {};

    dataConfig.forEach(config => {
      const el = document.querySelector(config.selector);

      if (el) {
        data[config.key] = el.innerText;
      }
    });

    return data;
  }, dataConfig);

  await page.close();

  return { ...parsedData, link: estateLink };
}

const parsePage = async ({ page }) => {
  const hrefs = await page.evaluate(selector => {
    const cards = document.querySelectorAll(`${selector} a.blockLink.listingDetailsLink`);

    const res = [];

    for (const linkEl of cards) {
      res.push(linkEl.href);
    }

    return res;
  }, CARD_SELECTOR);

  const data = [];

  for await (const href of hrefs) {
    const parsedData = await collectEstateData({ estateLink: href });
    data.push(parsedData);
  }

  return data;
}

const parseRealtorEstates = async () => {
  try {
    puppeteer.use(StealthPlugin());

    browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
    const page = await browser.newPage();

    await page.goto(LAUNCH_URL, PAGE_PUPPETEER_OPTS);
    await page.waitForSelector(CARD_SELECTOR, { visible: true, timeout: 40000 });

    const data = await parsePage({ page });

    if (!fs.existsSync(resultFolderPath)) {
      fs.mkdirSync(resultFolderPath);
    }

    fs.writeFileSync(`${resultFolderPath}estates.json`, JSON.stringify(data));

    const header = [...dataConfig.map(item => ({ id: item.key, title: toTitleCase(item.key) }))];

    const csvWriter = createCsvWriter({
      path: `${resultFolderPath}estates.csv`,
      header,
    });

    await csvWriter.writeRecords(data);

    browser.close();
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  parseRealtorEstates,
}
