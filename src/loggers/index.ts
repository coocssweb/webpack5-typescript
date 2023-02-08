import { loadScript } from '@utils';

declare global {
  interface Window {
    VConsole: any;
    onError: any;
    console: any;
  }
}

interface IConfig {
  vconsoleUrl: string;
  reportUrl: string;
  uuid: string;
}

interface IMessage {
  content: Object | string;
  level: 'error' | 'debug' | 'warn';
}

class Logger {
  private vconsoleUrl: string;
  private vconsole: any;
  private reportUrl: string;
  private uuid: string;
  private store = [];

  constructor() {
    // 拦截window.console
    var methodList = ['log', 'info', 'warn', 'debug', 'error'];
    methodList.forEach(function (item) {
      var method = window.console[item];
      window.console[item] = function () {
        // vconsole未就绪，推入vconsole
        if (typeof this.vconsole === 'undefined') {
          this.store.push({
            logType: item,
            logs: arguments,
          });
        }
        method.apply(console, arguments);
      };
    });
  }

  setConfig({ vconsoleUrl, reportUrl, uuid }: IConfig): void {
    this.vconsoleUrl = vconsoleUrl;
    this.reportUrl = reportUrl;
    this.uuid = uuid;
    this.initVconsole();
    this.windowErrorListener();
  }

  // 错误日志
  private windowErrorListener() {
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
  async initVconsole() {
    try {
      await loadScript(this.vconsoleUrl);
      const vConsoleInstance = new window.VConsole({
        defaultPlugins: ['system', 'network', 'element', 'storage'],
        maxLogNumber: 500,
      });

      this.store.forEach((item) => {
        vConsoleInstance.pluginList.default.printLog(item);
      });
      this.store = [];
      vConsoleInstance.show();
    } catch {}
  }

  report(message: IMessage) {
    let src = '';
    new Image().src = src;
  }
}

export default new Logger();
