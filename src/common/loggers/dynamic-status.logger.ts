import { delay } from '../utils';

class DynamicStatusLogger {
  private alreadyLogged = false;
  private readonly services: Map<
    string,
    Map<
      string,
      {
        status: 'PROCESSANDO' | 'PAUSADO';
        startTime: number;
      }
    >
  > = new Map();

  constructor() {
    this.cron();
  }

  setFunctionData(serviceName: string, functionsNames: string[]) {
    const functions = new Map();

    for (const functionName of functionsNames) {
      functions.set(functionName, {
        status: 'PAUSADO',
        startTime: Date.now(),
      });
    }

    this.services.set(serviceName, functions);
  }

  setStatus(
    serviceName: string,
    functionName: string,
    status: 'PROCESSANDO' | 'PAUSADO',
  ) {
    const functionLogger = this.services.get(serviceName)?.get(functionName);

    if (functionLogger) {
      functionLogger.status = status;
      if (status === 'PROCESSANDO') {
        functionLogger.startTime = Date.now();
      }

      this.services.get(serviceName)?.set(functionName, functionLogger);
    }
  }

  async cron() {
    do {
      await delay(1);
      this.logStatus();
    } while (true);
  }

  logStatus() {
    if (this.alreadyLogged) {
      for (const [, functions] of this.services) {
        for (const [,] of functions) {
          this.clearLine();
        }
      }
    }

    this.alreadyLogged = true;

    for (const [serviceName, functions] of this.services) {
      for (const [functionName, functionLogger] of functions) {
        const elapsedMs = Date.now() - functionLogger.startTime;
        const elapsedSeconds = Math.floor(elapsedMs / 1000);
        const minutes = Math.floor(elapsedSeconds / 60);
        const seconds = elapsedSeconds % 60;
        const time = minutes > 0 ? `${minutes}m${seconds}s` : `${seconds}s`;

        const status =
          functionLogger.status === 'PROCESSANDO'
            ? seconds % 2 === 0
              ? '⌛'
              : '⏳'
            : '⏸';

        process.stdout.write(
          `\n${serviceName} - ${functionName}: ${status} - Tempo: ${time}`,
        );
      }
    }
  }

  private clearLine() {
    process.stdout.moveCursor(0, -1);
    process.stdout.clearLine(1);
  }
}

export const dynamicStatusLogger = new DynamicStatusLogger();
