import { Sequelize } from 'sequelize-typescript';
import config from '../../config/db';

const { mysql } = config;
const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
  host: mysql.host,
  port: mysql.port,
  /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  dialect: 'mysql',
  pool: {
    max: mysql.connectionLimit, // 连接池中最大连接数
    min: 0,
    idle: 10000, // 10秒空闲,释放线程
  },
  timezone: '+08:00',
});

sequelize
  .authenticate()
  .then(() => console.log('连接数据库'))
  .catch((err: any) => {
    console.error(err);
    throw err;
  });

export default sequelize;
