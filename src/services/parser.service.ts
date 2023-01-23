import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import {
  PAGE_PUPPETEER_OPTS,
  LAUNCH_PUPPETEER_OPTS,
  DEFAULT_TIMEOUT,
  RESULTS_FILE_NAME,
} from 'src/constants';
import { Browser, Page } from 'puppeteer';
import { EPROPERTIES } from 'src/enums/esstateProperties.enum';

interface IInitNewSessionProps {
  launchUrl: string;
  pageVisibilitySelector: string;
  withNewBrowser?: boolean;
}

interface IWaitForSelectorProps {
  page: Page;
  selector: string;
  timeout?: number;
}

interface ISaveDataToFileRturnValue {
  file: Buffer;
  fileName: string;
  fileType: string;
}

export type TParsedData = { [key in EPROPERTIES]?: string };

@Injectable()
export class ParserService {
  constructor() {
    puppeteer.use(StealthPlugin());
  }

  protected browser: Browser = null;

  protected async initBrowser() {
    this.browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
  }

  protected async destroyBrowser() {
    await this.browser.close();
    this.browser = null;
  }

  protected async initNewSession({
    launchUrl,
    pageVisibilitySelector,
    withNewBrowser,
  }: IInitNewSessionProps): Promise<Page> {
    if (withNewBrowser) await this.initBrowser();

    const page = await this.browser.newPage();

    await page.goto(launchUrl, PAGE_PUPPETEER_OPTS);
    await this.waitForSelector({ page, selector: pageVisibilitySelector });

    return page;
  }

  protected async waitForSelector({
    page,
    selector,
    timeout,
  }: IWaitForSelectorProps): Promise<boolean> {
    try {
      await page.waitForSelector(selector, {
        visible: true,
        timeout: timeout || DEFAULT_TIMEOUT,
      });

      return true;
    } catch {
      return false;
    }
  }

  saveDataToFile(data: TParsedData[]): ISaveDataToFileRturnValue {
    const jsonFileName = `${RESULTS_FILE_NAME}.json`;

    // TODO: consider sending an archive with both .json and .csv files
    const file = Buffer.from(JSON.stringify(data));

    return { file, fileName: jsonFileName, fileType: 'json' };
  }
}
