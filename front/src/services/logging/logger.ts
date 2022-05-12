import { noop } from "@domain/lib/noop";
import { Log } from "@domain/logger/log";
import moment from "moment";
import uuid from "uuid-random";

export enum Level {
  DEBUG = "DEBUG",
  ERROR = "ERROR",
  INFO = "INFO",
  OFF = "OFF",
  RAW = "RAW",
  TRACE = "TRACE",
  WARN = "WARN",
}
enum LevelWeight {
  RAW = 0,
  TRACE = 1,
  DEBUG = 2,
  INFO = 3,
  WARN = 4,
  ERROR = 5,
  OFF = 6,
}

export type StructuredLog = {
  timestamp: string;
  level: Level;
  service: string;
  env: string;
  module: string;
  trace: string;
  message: string;
  error: Error | undefined;
};

type LogOptions = {
  enabled?: boolean;
  env?: string;
  reporter?: ErrorReporter;
};

const defaultLogOptions: LogOptions = {
  enabled: true,
  env: "development",
  reporter: {
    captureError: noop,
  },
};

export interface ErrorReporter {
  captureError(log: StructuredLog): void;
}

export class Logger implements Log {
  private service = "katana-front";
  private traceId: string;
  private options: LogOptions;

  constructor(options?: LogOptions) {
    this.traceId = uuid();
    this.options = {
      ...defaultLogOptions,
      ...options,
    };
  }

  public debug(tag: string, ...args: any[]): void {
    this.log(Level.DEBUG, tag, args);
  }

  public error(tag: string, ...args: any[]): void {
    this.log(Level.ERROR, tag, args);
  }

  public info(tag: string, ...args: any[]): void {
    this.log(Level.INFO, tag, args);
  }

  public raw(tag: string, ...args: any[]): void {
    this.log(Level.RAW, tag, args);
  }

  public trace(tag: string, ...args: any[]): void {
    this.log(Level.TRACE, tag, args);
  }

  public warn(tag: string, ...args: any[]): void {
    this.log(Level.WARN, tag, args);
  }

  private log(logEntryLevel: Level, tag: string, args: any[]): void {
    if (this.options.enabled && this.shouldLog(logEntryLevel)) {
      const logEntry = this.format(tag, logEntryLevel, args);
      this.chooseLogFn(logEntryLevel)(logEntry.message, logEntry);

      this.options.reporter.captureError(logEntry);
    }
  }

  private extractErrorFromArgs(args: any[]): Error | undefined {
    return args.find((arg) => arg instanceof Error);
  }

  private format(tag: string, level: Level, args: any[]): StructuredLog {
    const dateFormat = "YYYY-MM-DD HH:mm:ss Z";

    const asString = (arg: any): string => {
      return fromError(arg) || fromObject(arg) || String(arg);
    };

    const fromError = (arg: any): string | undefined => {
      if (arg instanceof Error) {
        return arg.message;
      }
      return undefined;
    };

    const fromObject = (arg: any): string | null => {
      if (isPlainObject(arg)) {
        return JSON.stringify(arg, null, 2);
      }
      return null;
    };

    const isPlainObject = (arg: any) => {
      return (
        arg !== null &&
        typeof arg === "object" &&
        arg.constructor === Object &&
        Object.prototype.toString.call(arg) === "[object Object]"
      );
    };

    return {
      timestamp: `${moment().format(dateFormat)}`,
      level,
      service: this.service,
      env: this.options.env,
      module: tag,
      trace: this.traceId,
      message: args
        .filter((arg) => !(arg instanceof Error))
        .map(asString)
        .join(" "),
      error: this.extractErrorFromArgs(args),
    };
  }

  private chooseLogFn(level: Level): any {
    switch (level) {
      case Level.RAW:
      case Level.TRACE:
        // tslint:disable-next-line: no-console
        return console.trace;
      case Level.DEBUG:
        // tslint:disable-next-line: no-console
        return console.debug;
      case Level.INFO:
        // tslint:disable-next-line: no-console
        return console.info;
      case Level.WARN:
        // tslint:disable-next-line: no-console
        return console.warn;
      case Level.ERROR:
        // tslint:disable-next-line: no-console
        return console.error;
      default:
        // tslint:disable-next-line: no-console
        return console.log;
    }
  }

  private shouldLog(logEntryLevel: Level): boolean {
    if (LevelWeight[logEntryLevel] === LevelWeight.RAW) {
      return true;
    }
    const a = LevelWeight[logEntryLevel] || LevelWeight.TRACE;
    const b = LevelWeight.RAW;
    return a >= b;
  }
}
