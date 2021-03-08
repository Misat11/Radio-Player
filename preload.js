// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };
  const electron = require("electron");
  const ipcRenderer = require("electron").ipcRenderer;
  const appExit = document.getElementById("appExit");
  const appMin = document.getElementById("appMin");

  appExit.addEventListener("click", function (event) {
    ipcRenderer.send("close-window");
  });
  appMin.addEventListener("click", function (event) {
    ipcRenderer.send("min-window");
  });
});

