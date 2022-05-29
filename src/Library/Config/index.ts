import GlobalVar from '../../GlobalVar/index';
class Config {
  private static development = {
    baseURL: 'http://192.168.14.219:9080',
    webSocketUrl: 'ws://192.168.14.219:9002/ws/', //开发ws://192.168.14.219:9002/ws/  秀勤ws://192.168.22.93:9002/ws/
    baseURLLogin: 'http://192.168.14.214:4000',
    pubKeyLogin:
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUoHGYCV0xrvQacKnd81bR5jY5ph50bGa8ixpl6siyfdL8GDStVUaatqFrfaExzg0Gi0i399ZG9xSVn5iIsdrUq4HDQHZXqfmC+Ss3GBTPkYickTUpmnPzod9AMyEDnddVD1vyfuePw1JaeEpqhEtyRs6bra8q4LtVQIdYtBmJdwIDAQAB',
  };
  private static test = {
    baseURL: 'https://cssgatewaytest.bndxqc.com',
    baseURLLogin: 'http://119.23.17.10:8080/api',
    webSocketUrl: 'wss://cssgatewaytest.bndxqc.com/customer-im/ws/',
    pubKeyLogin:
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUoHGYCV0xrvQacKnd81bR5jY5ph50bGa8ixpl6siyfdL8GDStVUaatqFrfaExzg0Gi0i399ZG9xSVn5iIsdrUq4HDQHZXqfmC+Ss3GBTPkYickTUpmnPzod9AMyEDnddVD1vyfuePw1JaeEpqhEtyRs6bra8q4LtVQIdYtBmJdwIDAQAB',
  };
  private static experience = {
    baseURL: 'https://cssgatewaybeta.bndxqc.com',
    baseURLLogin: 'https://ztybxbeta.bndxqc.com/api',
    webSocketUrl: 'wss://cssgatewaybeta.bndxqc.com/customer-im/ws/',
    pubKeyLogin:
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXRyojOxs5Z8KBfnb6s+KcpE2bZdj+TPclUyKFNDV8oeXsoV6aUSuCOTBuNUTL31NgpqLNqJqNZU0q91O46xmbhzNbYanSbRqhdx9C/pgAElkXB3C/SoBHAZ/Lm/SyFaZoJoAOkD5p2IsrLLh7yt07MT3qrTr991B+5Je58CIizQIDAQAB',
  };
  private static production = {
    baseURL: 'https://cssgateway.bndxqc.com/',
    baseURLLogin: 'https://ztybx.bndxqc.com/api',
    webSocketUrl: 'wss://cssgateway.bndxqc.com/customer-im/ws/',
    pubKeyLogin:
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXRyojOxs5Z8KBfnb6s+KcpE2bZdj+TPclUyKFNDV8oeXsoV6aUSuCOTBuNUTL31NgpqLNqJqNZU0q91O46xmbhzNbYanSbRqhdx9C/pgAElkXB3C/SoBHAZ/Lm/SyFaZoJoAOkD5p2IsrLLh7yt07MT3qrTr991B+5Je58CIizQIDAQAB',
  };
  public static getConfig() {
    switch (Number(GlobalVar.env)) {
      // 开发
      case 1:
        return Config.development;
      // 测试
      case 2:
        return Config.test;
      // 体验
      case 3:
        return Config.experience;
      // 生产
      case 4:
        return Config.production;
      default:
        return Config.development;
    }
  }
}
export default Config;
