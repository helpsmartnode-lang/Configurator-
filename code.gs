/*****************************************************
 * SMART NODE CONFIGURATOR
 * Version : 1.0
 * File    : Code.gs
 *****************************************************/

const APP_NAME = "Smart Node Configurator";

/**
 * Loads Web App
 */
function doGet() {
  return HtmlService.createTemplateFromFile("Index")
    .evaluate()
    .setTitle(APP_NAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Include HTML Files
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Return Version
 */
function getVersion() {
  return {
    app: APP_NAME,
    version: "1.0"
  };
}

/**
 * Test Function
 */
function testServer() {
  return "Server Connected Successfully";
}
