/** @format */

class BaseCommon {
  /**
   * 获取后缀名
   */
  public getSuffix(filename: string): string {
    const pos = filename.lastIndexOf('.');
    let suffix = '';
    if (pos !== -1) {
      suffix = filename.substring(pos);
    }
    return suffix;
  }
  /**
   * 随机字符串
   */
  public randomString(len: number): string {
    len = len || 32;
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    const maxPos = chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
  /**
   * 获取凭证
   */
  public getSignature(
    data: {
      host?: string;
      policy?: string;
      accessId?: string;
      signature?: string;
      callback?: string;
      dir?: string;
    },
    fileName: string,
  ): {
    host: string;
    multipartParams: {
      [index: string]: any;
      key: string;
      policy: string;
      OSSAccessKeyId: string;
      successActionStatus: string;
      callback: string;
      signature: string;
    };
  } {
    const host = data.host;
    const { policy, accessId, signature, callback, dir } = data;
    return {
      host, // 上传路径
      multipartParams: {
        // 上传参数
        key: dir + this.randomString(32) + this.getSuffix(fileName), //拼接键名
        policy,
        OSSAccessKeyId: accessId,
        successActionStatus: '200', //让服务端返回200,不然，默认会返回204
        callback,
        signature,
      },
    };
  }
  public getUuid(): string {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    s[19] = hexDigits.substr(((s[19] as any) & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';

    const uuid = s.join('');
    return uuid;
  }
}
export default BaseCommon;
