import { executablePath, PuppeteerLifeCycleEvent } from 'puppeteer';

export * from './realtor.constants';

interface IPageOptions {
  waitUntil: PuppeteerLifeCycleEvent;
}

export const LAUNCH_PUPPETEER_OPTS = {
  headless: false,
  executablePath: executablePath(),
};

export const PAGE_PUPPETEER_OPTS: IPageOptions = {
  waitUntil: 'domcontentloaded',
};

export const DEFAULT_TIMEOUT = 40000;

export const RESULTS_FILE_NAME = 'estates';
