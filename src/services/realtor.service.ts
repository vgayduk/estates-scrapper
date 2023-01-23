import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { Page } from 'puppeteer';
import { realtorDataConfig } from 'src/configs';
import {
  PAGE_PUPPETEER_OPTS,
  CARD_SELECTOR,
  LAUNCH_URL,
  WAIT_FOR_SELECTOR_IN_PAGE,
  LINK_SELECTOR_IN_CARD,
} from 'src/constants';
import { ParserService, TParsedData } from './parser.service';

@Injectable()
export class RealtorService extends ParserService {
  constructor() {
    super();
  }

  async parse() {
    return await this.parseRealtorEstates();
  }

  protected async collectEstateData(estateLink: string): Promise<TParsedData> {
    const page = await this.browser.newPage();
    await page.goto(estateLink, PAGE_PUPPETEER_OPTS);

    const isPageAvailable = await this.waitForSelector({
      page,
      selector: WAIT_FOR_SELECTOR_IN_PAGE,
    });

    if (!isPageAvailable) return null;

    const parsedData: TParsedData = await page.evaluate(async (dataConfig) => {
      const data: TParsedData = {};

      dataConfig.forEach((config) => {
        const el: HTMLElement = document.querySelector(config.selector);

        if (el) {
          data[config.key] = el.innerText;
        }
      });

      return data;
    }, realtorDataConfig);

    await page.close();

    return { ...parsedData, link: estateLink };
  }

  protected async parsePage(page: Page): Promise<TParsedData[]> {
    const hrefs: string[] = await page.evaluate((selector) => {
      const cards: NodeListOf<HTMLLinkElement> =
        document.querySelectorAll(selector);

      const res = [];

      for (const linkEl of cards) {
        res.push(linkEl.href);
      }

      return res;
    }, `${CARD_SELECTOR} ${LINK_SELECTOR_IN_CARD}`);

    const data: TParsedData[] = await Promise.all(
      hrefs.map((href) => this.collectEstateData(href)),
    );

    return data.filter(Boolean);
  }

  protected async parseRealtorEstates(): Promise<TParsedData[]> {
    try {
      const page = await this.initNewSession({
        launchUrl: LAUNCH_URL,
        pageVisibilitySelector: CARD_SELECTOR,
        withNewBrowser: true,
      });

      const data = await this.parsePage(page);

      await this.destroyBrowser();

      return data;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
