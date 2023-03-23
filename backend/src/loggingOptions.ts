import { PrettyOptions } from 'pino-pretty'

interface baseLogOpt {
    transport: {
        target: string
        options: PrettyOptions
    }
}

interface loggingOptionsType {
    development: baseLogOpt
    production: boolean
    testing: boolean
}

const loggingOptions: loggingOptionsType = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
        colorize: true,
      },
    },
  },
  production: true,
  testing: false,
};

export default loggingOptions;
