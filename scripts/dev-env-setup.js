// generate-index.js
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const outputDir = path.join(__dirname, '../development');
const productionDir = path.join(__dirname, '../production');

// Create "development" and "production" directories if they don't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}
if (!fs.existsSync(productionDir)) {
  fs.mkdirSync(productionDir);
}

// Read the src directory for TSX files
fs.readdir(srcDir, (err, files) => {
  if (err) {
    console.error('Error reading src directory', err);
    return;
  }

  const tsxFiles = files.filter(file => file.endsWith('.tsx'));

  tsxFiles.forEach(file => {
    const htmlFileName = file.replace('.tsx', '.html');
    const htmlFilePath = path.join(outputDir, htmlFileName);
    let webflowComponentElementID = "";

    fs.readFile(srcDir + "/" + file, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading ${file}`, err);
        return;
      }

      const lines = data.split('\n');

      lines.forEach(line => {
        const match = line.match(/let webflowComponentElementID = "([^"]+)";/);
        if (match) {
          webflowComponentElementID = match[1];
        }
      });

      // Create HTML file for each TSX file
      fs.writeFile(htmlFilePath, `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${htmlFileName.replace('.html', '.tsx')}</title>
      </head>
      <body>
        <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
        <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.2.0/firebase-firestore.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.7/axios.min.js"></script>
        <script src="../production/${htmlFileName.replace(".html", ".js")}"></script>
        <div id="${webflowComponentElementID}"></div>
      </body>
      </html>`, err => {
        if (err) {
          console.error(`Error creating HTML file for ${file}`, err);
          return;
        }

        console.log(`Created HTML file for ${file}`);
        console.log(' * webflowComponentElementID: ' + webflowComponentElementID);
      });
    });
  });

  // Create HTML file for each TSX file
  fs.writeFile(outputDir + "/index.html", `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebGraded Custom Code</title>
  </head>
  <body>
    <ul>
      ${tsxFiles.map(file => `<li><a href="./${file.replace("tsx", "html")}">${file.replace("tsx", "html")}</a></li>`).join('\n')}
    </ul>
  </body>
  </html>`, err => {
    if (err) {
      console.error("Error creating index.html file.", err);
      return;
    }

  });

});
