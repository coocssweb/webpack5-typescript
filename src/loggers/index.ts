import { loadScript } from '@utils';

declare global {
  interface Window {
    VConsole: any;
    onError: any;
  }
}

interface IConfig {
  vconsole: string;
  reportUrl: string;
  uuid: string;
}

interface IMessage {
  content: Object | string;
  level: 'error' | 'debug' | 'warn';
}

class Logger {
  private vconsole: string;

  private reportUrl: string;

  private uuid: string;

  constructor() {}

  setConfig({ vconsole, reportUrl, uuid }: IConfig): void {
    this.vconsole = vconsole;
    this.reportUrl = reportUrl;
    this.uuid = uuid;

    this.initVconsole();
    this.addWinowErrorListener();
  }

  // 错误日志
  private addWinowErrorListener() {
    window.onError = (msg: string, url: string, line: string, col: string, error: any) => {
      let stack = error.stack
        .replace(/\n/gi, '')
        .split(/\bat\b/)
        .slice(0, 9)
        .join('@')
        .replace(/\?[^:]+/gi, '');
      let errorMsg = error.toString();
      if (stack.indexOf(msg) < 0) {
        stack = errorMsg + '@' + stack;
      }

      const message: IMessage = {
        content: { msg: errorMsg, url, line, col, stack },
        level: 'error',
      };

      this.report(message);
    };
  }

  // 初始化vConsole
  initVconsole() {
    loadScript(this.vconsole).then(() => {
      const vConsoleInstance = new window.VConsole({
        defaultPlugins: ['system', 'network', 'element', 'storage'],
        maxLogNumber: 500,
      });
      try {
        vConsoleInstance.show();
      } catch (e) {}
    });
  }

  report(message: IMessage) {
    let src = '';
    new Image().src = src;
  }
}

export default new Logger();
