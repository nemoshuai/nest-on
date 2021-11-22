import * as path from 'path';

const baseLogPath = path.resolve(__dirname, '../../logs'); // 日志文件保存

const log4jsConfig = {
  // 配置日志输出位置
  appenders: {
    // 默认配置 打印到控制台
    console: {
      type: 'console',
    },
    access: {
      type: 'dateFile', // 日期分类
      filename: `${baseLogPath}/access/access.log`, // 日志文件
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd.log', // 生成日志文件名 access-2021-01-01.log
      category: 'http', // 日志类别
    },
    app: {
      type: 'dateFile', // 日期分类
      filename: `${baseLogPath}/app/app.log`, // 日志文件
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd.log', // 生成日志文件名 access-2021-01-01.log
      layout: {
        // 日志输出的格式
        type: 'pattern',
        pattern:
          '{"date": "%d", "level": "%p", "category": "%c", "host": "%h", "pid": "%z", "data": "%m"}',
      },
    },
    errorFile: {
      type: 'dateFile',
      filename: `${baseLogPath}/errors/error.log`,
      layout: {
        // 日志输出的格式
        type: 'pattern',
        pattern:
          '{"date": "%d", "level": "%p", "category": "%c", "host": "%h", "pid": "%z", "data": "%m"}',
      },
      pattern: '-yyyy-MM-dd.log', // 生成日志文件名 access-2021-01-01.log
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'app', 'errors'],
      level: 'DEBUG',
    },
    info: {
      appenders: ['console', 'app', 'errors'],
      level: 'info',
    },
    access: {
      appenders: ['console', 'app', 'errors'],
      level: 'info',
    },
    http: {
      appenders: ['access'],
      level: 'DEBUG',
    },
  },
};

export default log4jsConfig;
