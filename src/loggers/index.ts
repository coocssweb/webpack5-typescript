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

interface IMessageContent {
  msg?: string;
  url?: string;
  col?: string;
  line?: string;
}

interface IMessage {
  content: IMessageContent | string;
  level: 'error' | 'debug' | 'warn';
}

class Logger {
  private vconsoleUrl: string = '';
  private vconsole: any;
  private reportUrl: string = '';
  private uuid: string = '';
  private store = [];

  constructor() {
    // 拦截window.console
    var methodList = ['log', 'info', 'warn', 'debug', 'error'];
    methodList.forEach(function (item) {
      var method = window.console[item];
      window.console[item] = function () {
        // vconsole未就绪，推入vconsole
        if (typeof this.vconsole === 'undefined' && this.store.length <= 500) {
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

  private windowErrorListener() {
    window.onError = (msg: string, url: string, line: string, col: string, error: any) => {
      let finalMsg = msg;
      if (error?.stack) {
        const stack = error.stack
          .replace(/\n/gi, '')
          .split(/\bat\b/)
          .slice(0, 9)
          .join('@')
          .replace(/\?[^:]+/gi, '');
        let errorMsg = error.toString();
        if (stack.indexOf(errorMsg) < 0) {
          finalMsg = errorMsg + '@' + stack;
        }
      }

      const message: IMessage = {
        content: { msg: finalMsg, url, line, col },
        level: 'error',
      };
      this.report(message);
    };
  }

  async initVconsole() {
    try {
      await loadScript(this.vconsoleUrl);
      this.vconsole = new window.VConsole({
        defaultPlugins: ['system', 'network', 'element', 'storage'],
        maxLogNumber: 500,
      });

      this.store.forEach((item) => {
        this.vconsole.pluginList.default.printLog(item);
      });
      this.store = [];
      this.vconsole.show();
    } catch {}
  }

  report(message: IMessage) {
    try {
      const finalMessage = typeof message.content === 'string' ? message.content : message.content.msg;
      let src =
        this.reportUrl +
        (this.reportUrl.indexOf('?') > -1 ? '&' : '?') +
        'msg=' +
        finalMessage +
        '&level=' +
        message.level +
        '&uuid=' +
        this.uuid +
        '&t=' +
        new Date().getTime();
      new Image().src = src;
      window.console[message.level](message.content);
    } catch {}
  }
}

export default new Logger();
