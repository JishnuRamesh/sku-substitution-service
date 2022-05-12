import { noop } from "@domain/lib/noop";
import { Log } from "@domain/logger/log";
import { Logger } from "@services/logging/logger";

process.env.LOG_LEVEL = "RAW";
// tslint:disable-next-line: no-console
const originalLogFn: any = console.log;
// tslint:disable-next-line: no-console
const originalWarnFn: any = console.warn;
// tslint:disable-next-line: no-console
const originalErrorFn: any = console.error;
const TAG = "logger.spec.ts";
describe("testing cases for the logger", () => {
  it("prints the required keys", () => {
    const L: Log = new Logger({
      enabled: true,
      env: "test",
      reporter: {
        captureError: noop,
      },
    });
    // tslint:disable-next-line: no-console
    console.log = (...args: any[]) => {
      originalLogFn(args);
      expect(args).toBeDefined();
      expect(args.length).toBe(2);
      expect(args[1].env).toBe("test");
      expect(args[1].level).toBe("DEBUG");
      expect(args[1].message).toBe("testing, prints the required keyse");
      expect(args[1].trace).toBeDefined();
      expect(args[1].module).toBe("logger.spec.ts");
      expect(args[1].service).toBe("katana-front");
      expect(args[1].error).toBeUndefined();
    };
    L.debug(TAG, "testing, prints the required keys");
  });

  it("debug level", () => {
    const L: Logger = new Logger();
    // tslint:disable-next-line: no-console
    console.log = (...args: any[]) => {
      originalLogFn(args);
      expect(args).toBeDefined();
      expect(args.length).toBe(2);
      expect(args[1].level).toBe("DEBUG");
    };
    L.debug(TAG, "debug level");
  });

  it("trace level", () => {
    const L: Logger = new Logger();
    // tslint:disable-next-line: no-console
    console.log = (...args: any[]) => {
      originalLogFn(args);
      expect(args).toBeDefined();
      expect(args.length).toBe(2);
      expect(args[1].level).toBe("TRACE");
    };
    L.trace(TAG, "trace level");
  });

  it("info level", () => {
    const L: Logger = new Logger();
    // tslint:disable-next-line: no-console
    console.log = (...args: any[]) => {
      originalLogFn(args);
      expect(args).toBeDefined();
      expect(args.length).toBe(2);
      expect(args[1].level).toBe("INFO");
    };
    L.info(TAG, "info level");
  });

  it("warn level", () => {
    const L: Logger = new Logger();
    // tslint:disable-next-line: no-console
    console.warn = (...args: any[]) => {
      originalWarnFn(args);
      expect(args).toBeDefined();
      expect(args.length).toBe(2);
      expect(args[1].level).toBe("WARN");
    };
    L.warn(TAG, "warn level");
  });

  it("error level", () => {
    const L: Logger = new Logger();
    // tslint:disable-next-line: no-console
    console.error = (...args: any[]) => {
      originalErrorFn(args);
      expect(args).toBeDefined();
      expect(args.length).toBe(2);
      expect(args[1].level).toBe("ERROR");
    };
    L.error(TAG, "error level");
  });
});
