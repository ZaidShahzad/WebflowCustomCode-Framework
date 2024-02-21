const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const wccfConfigPath = path.join(__dirname, '../WCCF.config.js');
const firebasercPath = path.join(__dirname, '../.firebaserc');

// Read the WCCF.config.js file
const wccfConfig = require(wccfConfigPath);

// Update the .firebaserc file
const firebaserc = JSON.parse(fs.readFileSync(firebasercPath, 'utf8'));
firebaserc.projects.default = wccfConfig.firebase.projectName;

// Write the updated .firebaserc file
fs.writeFileSync(firebasercPath, JSON.stringify(firebaserc, null, 2));

console.log('WCCF (Firebase Auth): Setting .firebaserc file default value to:', wccfConfig.firebase.projectName);

// Check if logged into Firebase-Tools CLI 
exec('firebase login:list', (error, stdout, stderr) => {
  // normalize stdout by trimming whitespace
  const normalizedOutput = stdout.trim();

  // Check for the specific string indicating no authorized accounts
  if (normalizedOutput.includes('No authorized accounts')) {
    console.log('WCCF (Firebase Auth): No authorized accounts found. Please run "firebase login" to authenticate your account.');
    process.exit(1) // Exit with a failure code
  } else {
    // If the string is not found, it's likely that a user is logged in
    console.log('WCCF (Firebase Auth): You are logged into the CLI:\n', normalizedOutput);
  }
});

let projectName = wccfConfig.firebase.projectName;


// Check if you're connected to a firebase project
exec('firebase projects:list --json', (error, stdout, stderr) => {
  if (error) {
    console.error('Error executing firebase command:', stderr);
    process.exit(1);
  }

  try {
    // Parse the JSON output
    const parsedOutput = JSON.parse(stdout);

    // Access the result property that holds the array of projects
    const projects = parsedOutput.result;

    // Filter to check if the project exists
    const projectExists = projects.some(project => project.projectId === projectName);

    if (!projectExists) {
      console.log(`WCCF (WCCF.config.js): The Firebase project "${projectName}" was not found in your Firebase account. Please change the name of the project in WCCF.config.js to an existing project or create a new project with the name "${projectName}".`);
      process.exit(1); // Exit with a failure code
    } else {
      console.log(`WCCF (WCCF.config.js): You are connected to the Firebase project "${projectName}".`);
    }
  } catch (parseError) {
    console.error('Error parsing the projects list:', parseError);
    process.exit(1);
  }
});


