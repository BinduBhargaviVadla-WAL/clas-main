/* eslint-disable func-names */
/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 *
 */

import { app, BrowserWindow, ipcMain, session } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import log from 'electron-log';
import { ipcMain as ipc } from 'electron-better-ipc';
import fs from 'fs';
// import readSqliteData from './sqlite/reader';
// import {
//   getCities,
//   getCounties,
//   getCountries,
//   getStates,
//   getZips
// } from './sqlite/reader/address';
// import { getContactRoles } from './sqlite/reader/dropDownSeedData';
// import sqliteConfig from './sqlite/reader/config';
import MenuBuilder from './menu';

process.env.GH_TOKEN = 'APP_GH_TOKEN';
const nodeEnv = process.env.NODE_ENV;

const sourceMapSupport = require('source-map-support');
// const models = require('./sqlite/models');
// const sequelizeMigration = require('./sqlite/sequelize')(models);

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.setFeedURL({
      provider: 'github',
      private: true,
      token: 'APP_GH_TOKEN',
      owner: 'APP_GH_OWNER',
      repo: 'APP_GH_REPO'
    });

    try {
      if (nodeEnv === 'production') {
        autoUpdater.checkForUpdatesAndNotify();
      }
    } catch (error) {
      console.log('update-error-catch', error);
    }
  }
}

let mainWindow = null;

sourceMapSupport.install();
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

if (nodeEnv === 'development') {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  if (
    nodeEnv === 'development' ||
    nodeEnv === 'dev' ||
    nodeEnv === 'qa' ||
    nodeEnv === 'uat'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.maximize();

  if (
    nodeEnv === 'development' ||
    nodeEnv === 'dev' ||
    nodeEnv === 'qa' ||
    nodeEnv === 'uat'
  ) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  if (nodeEnv === 'production') {
    new AppUpdater();
  }
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// function to check the file to be downloaded
async function checkFileExists(fn) {
  let fileName = fn;
  if (fs.existsSync(`${app.getPath('downloads')}/${fileName}`)) {
    console.log('exists');
    const ext = path.extname(fileName);
    let fname = path.basename(fileName, ext);
    const fnameArr = fname.match(/[^()]+/g);
    if (fnameArr.length > 1) {
      // contains ()
      // eslint-disable-next-line radix
      const charInsideParanthesis = parseInt(fnameArr[fnameArr.length - 1]);
      if (!charInsideParanthesis) {
        // cases (v)
        fileName = `${fname}(1)${ext}`;
        return checkFileExists(fileName);
      }
      // cases (1)
      const charInsideParanthesisNew = charInsideParanthesis + 1;
      fname = fname.replace(
        `(${charInsideParanthesis})`,
        `(${charInsideParanthesisNew})`
      );
      fileName = fname + ext;
      return checkFileExists(fileName);
    }
    // doesn't contains ()
    fileName = `${fname}(1)${ext}`;
    return checkFileExists(fileName);
  }
  return fileName;
}

app.on('ready', async () => {
  createWindow();
  // skip the folder selection on file download
  session.defaultSession.on('will-download', async (event, item) => {
    let filename = item.getFilename();
    filename = await checkFileExists(filename);
    item.setSavePath(`${app.getPath('downloads')}/${filename}`);
    item.on('updated', (updatedEvent, state) => {
      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed');
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused');
        } else {
          console.log(`Received bytes: ${item.getReceivedBytes()}`);
        }
      }
    });
    item.once('done', (doneEvent, state) => {
      if (state === 'completed') {
        console.log('Download successfully');
      } else {
        console.log(`Download failed: ${state}`);
      }
    });
  });
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// ipcMain.on('read-sqlite-data', async () => {
//   console.log('------------------------------');
//   console.log(`reading sqlite data`);
//   console.log('------------------------------');

//   const data = await readSqliteData(sqliteConfig.tables);
//   const response = {};

//   sqliteConfig.tables.forEach((table, index) => {
//     response[table.storeField] = data[index];
//   });

//   mainWindow.webContents.send('read-sqlite-status', response);
// });

// ipcMain.on('run-migrations', async () => {
//   console.log('start migrations');

//   try {
//     await sequelizeMigration.config({
//       migrationPath: path.resolve('./app/sqlite/migrations'),
//       seedPath: path.resolve('./app/sqlite/seeders')
//     });
//   } catch (err) {
//     log.info(err);
//     log.info(JSON.stringify(err));
//   }

//   async.waterfall(
//     [
//       function(callback) {
//         sequelizeMigration.migrate(function(err, result) {
//           if (err) {
//             console.log('Error:::::', err);
//           } else {
//             console.log('result', result);
//             callback(null, true);
//           }
//         });
//       },
//       function(data, callback) {
//         sequelizeMigration.migrationSeed(function(err) {
//           if (err) {
//             callback(err, null);
//           } else {
//             console.log('Successfully migrated seed data');
//             callback(null, true);
//           }
//         });
//       }
//     ],
//     function(err, result) {
//       if (err) {
//         console.log('Error::::');
//         console.log(err);
//       } else {
//         console.log(result);

//         // migrationSuccess = true;
//         // mainWindow.webContents.send('migration-status', migrationSuccess);

//         console.log('------------------------------');
//         // console.log(`current migration status: ${migrationSuccess}`);
//         console.log('------------------------------');
//       }
//       console.log('Migration process completed::::');
//       mainWindow.webContents.send('run-migrations-status', { success: true });
//     }
//   );
// });

// const tablesMap = {
//   countries: getCountries,
//   states: getStates,
//   zips: getZips,
//   counties: getCounties,
//   cities: getCities,
//   contactRoles: getContactRoles
// };

// ipc.answerRenderer(
//   'read-sqlite-table',
//   async ({ searchString, table, selectedFields }) => {
//     const rows = await tablesMap[table](searchString, selectedFields);
//     return rows;
//   }
// );

autoUpdater.on('error', error => {
  console.log('error', error);
});

autoUpdater.on('checking-for-update', () => {
  console.log('checking-for-update');
});

autoUpdater.on('update-available', info => {
  console.log('update-available', info);
});

autoUpdater.on('update-not-available', info => {
  console.log('update-not-available', info);
});

autoUpdater.on('download-progress', info => {
  console.log('download-progress', info);
});

autoUpdater.on('update-downloaded', info => {
  console.log('update-downloaded', info);
});
