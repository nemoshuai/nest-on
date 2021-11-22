import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from 'src/database/squelize';
import { makeSalt, encryptPassword } from 'src/utils/cryptogram';

const moment = require('moment');

@Injectable()
export class UserService {
  async findOne(username: string): Promise<any | undefined> {
    const sql = `
      SELECT
        user_id id, real_name realName, role, account_name username, passwd password, passwd_salt
      FROM
       admin_user
      WHERE
        account_name = '${username}'
     `;

    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 数组组装
        logging: true, // 是否sql打印到控制台
      });
      return res[0];
    } catch (err) {
      return void 0;
    }
  }

  async register(user: any): Promise<any> {
    const { accountName, password, mobile, realName } = user;
    const res = await this.findOne(accountName);
    if (res) {
      return {
        code: -1,
        success: false,
        msg: '已存在',
      };
    }
    const salt = makeSalt();
    const pwd = encryptPassword(password, salt);
    const sql = `INSERT INTO admin_user 
                  (account_name, real_name, passwd, passwd_salt, mobile, create_time, role, user_status, create_by) 
                  VALUES ('${accountName}', '${realName}', '${pwd}', '${salt}', '${mobile}', '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}', 0, 1, 1)`;
    try {
      await sequelize.query(sql, {
        logging: true,
      });

      return {
        code: 200,
        success: true,
        msg: '新增成功',
      };
    } catch (err) {
      return {
        code: 503,
        msg: `服务错误，${err}`,
      };
    }
  }
}
