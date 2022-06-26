let page;

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultTimeout(1000);
    await page.setDefaultNavigationTimeout(10000);
    await page.goto("https://github.com/team");
  });
  
  afterEach( async() => {
    page.close();
  });

  test("The h1 header content'", async () => {
    await page.setDefaultTimeout(1500);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  });

  test("The first link attribute", async () => {
    await page.setDefaultTimeout(2000);
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    await page.setDefaultTimeout(2500);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  });
});


test("Title of sponsors page", async() => {
  page = await browser.newPage();
  await page.setDefaultTimeout(1000);
  await page.setDefaultNavigationTimeout(10000);
  await page.goto("https://github.com/sponsors");

  const titleSelector = ".sponsors-hero-headline";
  await page.waitForSelector(titleSelector);
  const element = await page.waitForSelector(titleSelector);
  const actual = await element.evaluate(el => el.textContent);
  expect(actual).toEqual("\n        Invest in the software that powers your world\n      ");
});

test("Title of marketplace page", async() => {
  page = await browser.newPage();
  await page.setDefaultTimeout(1000);
  await page.setDefaultNavigationTimeout(10000);
  await page.goto("https://github.com/marketplace");

  await page.waitForSelector('h1');
  const actual = await page.title();
  expect(actual).toEqual("GitHub Marketplace · to improve your workflow · GitHub");
});

test("Repo issues test", async() => {
  page = await browser.newPage();
  await page.setDefaultTimeout(1000);
  await page.setDefaultNavigationTimeout(10000);
  await page.goto("https://github.com/Denishsh/Puppeteer");
  
  const issues = await page.waitForSelector('#issues-tab');
  await issues.click();
  await page.waitForSelector(".blankslate");
});