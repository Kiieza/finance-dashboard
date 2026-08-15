/* Meu Fluxo — Google Apps Script
 * Cole este arquivo no editor do Apps Script vinculado à sua planilha.
 */

const SHEET_NAME = 'MeuFluxo';

function doGet(e) {
  return respond_(handle_(e && e.parameter || {}), e && e.parameter && e.parameter.callback);
}

function doPost(e) {
  return ContentService.createTextOutput(JSON.stringify(handle_(e && e.parameter || {})))
    .setMimeType(ContentService.MimeType.JSON);
}

function handle_(p) {
  try {
    const token = PropertiesService.getScriptProperties().getProperty('SYNC_TOKEN');
    if (!token) throw new Error('Defina a propriedade SYNC_TOKEN antes de usar o aplicativo.');
    if (p.token !== token) throw new Error('Chave de sincronização inválida.');
    if (p.action === 'get') return { ok: true, data: readData_() };
    if (p.action === 'cdi') return { ok: true, value: getCdiAnual_() };
    if (p.action === 'save') {
      if (!p.payload) throw new Error('Dados não recebidos.');
      const data = JSON.parse(Utilities.newBlob(Utilities.base64Decode(p.payload)).getDataAsString('UTF-8'));
      writeData_(data);
      return { ok: true };
    }
    throw new Error('Ação não reconhecida.');
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

function readData_() {
  const sheet = getSheet_();
  const raw = sheet.getRange('A2').getValue();
  return raw ? JSON.parse(raw) : null;
}

function writeData_(data) {
  const sheet = getSheet_();
  sheet.getRange('A1:B1').setValues([['Dados (não editar)', 'Última sincronização']]);
  sheet.getRange('A2').setValue(JSON.stringify(data));
  sheet.getRange('B2').setValue(new Date());
  sheet.autoResizeColumn(2);
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function getCdiAnual_() {
  // Série 4389: CDI anual (base 252), disponibilizada pelo Banco Central.
  const url = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4389/dados/ultimos/1?formato=json';
  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) throw new Error('A fonte do Banco Central não respondeu.');
  const values = JSON.parse(response.getContentText());
  if (!values.length) throw new Error('Nenhuma taxa CDI disponível no momento.');
  return Number(String(values[0].valor).replace(',', '.'));
}

function respond_(result, callback) {
  const json = JSON.stringify(result);
  if (callback && /^[a-zA-Z_$][\w$]*$/.test(callback)) {
    return ContentService.createTextOutput(`${callback}(${json})`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
