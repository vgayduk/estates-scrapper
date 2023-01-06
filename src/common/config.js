const { executablePath } = require('puppeteer');

const LAUNCH_PUPPETEER_OPTS = {
  headless: false,
  executablePath: executablePath(),
};

const PAGE_PUPPETEER_OPTS = {
  waitUntil: "domcontentloaded",
};

module.exports = {
  LAUNCH_PUPPETEER_OPTS,
  PAGE_PUPPETEER_OPTS,
};
