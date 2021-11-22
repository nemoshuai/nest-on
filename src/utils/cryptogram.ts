import * as crypto from 'crypto';

// 制作随机盐
export function makeSalt(): string {
  // 生成的字节数 3
  return crypto.randomBytes(3).toString('base64');
}

// 加密密码
// 迭代次数10000
// 哈希子节长度 16
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) return '';

  const tempSalt = Buffer.from(salt, 'base64');
  return crypto
    .pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1')
    .toString('base64');
}
