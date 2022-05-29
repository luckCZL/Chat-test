/** @format */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// 观察者
class Watcher {
  public list: any;
  constructor() {
    this.list = {};
  }
  // 订阅
  public $on(key: string, fn: any): void {
    if (!this.list[key]) {
      this.list[key] = [];
    }
    this.list[key].push(fn);
  }
  // 发布
  public $emit(key: string, param?: any): void | boolean {
    const fns = this.list[key];
    // 检测是否有注册  注册后是否有注入方法
    if (!fns || fns.length === 0) {
      return false;
    }
    // 依次执行 并传入参数
    fns.forEach((fn: any) => {
      fn(param);
    });
  }
  // 清空
  public $clear(key: string) {
    this.list[key] = [];
  }
  public $clearAll() {
    this.list = {};
  }
}

export default new Watcher();
