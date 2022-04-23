import BrowserWinHandler from "./BrowserWinHandler";

const winHandler = new BrowserWinHandler({
  height: 600,
  width: 1000,
  autoHideMenuBar: true,
});

winHandler.onCreated((_browserWindow) => {
  winHandler.loadPage("/");
  // Or load custom url
  // _browserWindow.loadURL('https://google.com')
  _browserWindow.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    require("electron").shell.openExternal(url);
  });
});

export default winHandler;
