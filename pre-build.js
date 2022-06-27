const fs = require('fs');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

createEnvFile();

if (argv.APP_BUILD_ENV === 'preprod' || argv.APP_BUILD_ENV === 'production') {
  updateEnvTokens();
}

/**
 * create .env files are add variables
 */
function createEnvFile() {
  const appEnv = (argv.APP_ENV || '').replace(/\s/g, '\n');
  fs.writeFileSync('.env', appEnv);
}

/**
 * update the files with relevant env variables
 */
function updateEnvTokens() {
  let packageJSON = fs.readFileSync('package.json', 'utf8') || '';
  let mainJs = fs.readFileSync('app/main.dev.js', 'utf8') || '';

  packageJSON = packageJSON.replace(/APP_GH_TOKEN/, argv.APP_GH_TOKEN);
  packageJSON = packageJSON.replace(/APP_GH_REPO/, argv.APP_GH_REPO);
  packageJSON = packageJSON.replace(/APP_GH_OWNER/, argv.APP_GH_OWNER);

  mainJs = mainJs.replace(/APP_GH_TOKEN/g, argv.APP_GH_TOKEN);
  mainJs = mainJs.replace(/APP_GH_REPO/, argv.APP_GH_REPO);
  mainJs = mainJs.replace(/APP_GH_OWNER/, argv.APP_GH_OWNER);

  fs.writeFileSync('package.json', packageJSON);
  fs.writeFileSync('app/main.dev.js', mainJs);
}
