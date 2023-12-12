// Dongxu Xia, Zhaoning Li, Sahir Prajapati 
// 8886742 / 8913790 / 8887839 

const puppeteer = require("puppeteer");
const ejs = require("ejs");
const fs = require("fs");

module.exports = async (username, data) => {
  const templatePath = __dirname + "/template.ejs";
  const templateContent = fs.readFileSync(templatePath, "utf-8");
  const compiledTemplate = ejs.compile(templateContent);

  // Data to pass to the template

  // Render the EJS template
  const renderedHTML = compiledTemplate({ name: username, data });
  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the content of the page to the rendered HTML
  await page.setContent(renderedHTML);

  // Generate PDF
  const buffer = await page.pdf({ format: "A4" });

  await browser.close();
  return buffer;
};
