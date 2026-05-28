import { appendFile } from "fs";
import path from "path";


const logPath = new URL("../log.txt", import.meta.url);
function writeLog(message) {
  const timeStamp = new Date().toISOString();
  const line = `[${timeStamp}] ${message}\n`

  appendFile(logPath, line, (err) => {
    if(err) {
      console.error('Erro ao escrever o log:', err);
    }
  });
}

export default writeLog;