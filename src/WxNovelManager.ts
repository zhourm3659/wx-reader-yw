import chalk from 'chalk';
interface NovelPlugin {
  onPageLoad(callback: (data: {id: string}) => void): void;
  getNovelManager(id: string): any;
  setLoggerConfig(config: any): void;
}

export default class WxNovelManager {
  public static init(novelPlugin: NovelPlugin, cb?: (manager: any) => void): WxNovelManager {
    return new WxNovelManager(novelPlugin, cb);
  }

  private wxNovelManager: WxNovelManager | null = null;

  // 防止外部直接实例化
  private constructor(novelPlugin: NovelPlugin, cb?: (manager: any) => void) {
    console.log(chalk.green('init WxNovelManager'));
    if (!novelPlugin) throw new Error('novelPlugin is required');

    // 此处是监听 novel-plugin 页面的加载
    novelPlugin.onPageLoad(({id}: {id: string}) => {
      // 此处赋值，后续使用
      this.wxNovelManager = novelPlugin.getNovelManager(id);
      cb && cb(this.wxNovelManager);
    });
  }
}
