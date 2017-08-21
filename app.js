const app = require("electron").app;
const BrowserWindow = require("electron").BrowserWindow;
const path = require('path');
const url = require('url');

const DEBUG = false;
const WIN_WIDTH = 800;
const WIN_HEIGHT = 600;
const STARTPAGE = 'frontend/index.html'

// global reference of the window object
let win;

function createWindow() {
    // create the initial browser window
    win = new BrowserWindow({
        width: WIN_WIDTH,
        height: WIN_HEIGHT
    });

    // load the start page into the window
    win.loadURL(url.format({
        pathname: path.join(__dirname, STARTPAGE),
        protocol: 'file:',
        slashes: true
    }));

    // handle when the window is closed
    win.on('closed', function() {
        // clear out the browser window object
        win = null;
    });

    // if debugging is on, show the devtools
    if (DEBUG) {
        win.webContents.openDevTools();
    }
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})