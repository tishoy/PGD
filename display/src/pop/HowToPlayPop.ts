/**
 * 新手引导
 * create by tishoy
 * 2018.8.10
 */
class HowToPlayPop extends egret.Sprite implements PopBase {

    private sheet: egret.SpriteSheet;

    private closeBtn: egret.Bitmap;
    private okBtn: egret.Bitmap;
    private retryBtn: egret.Bitmap;
    private itemctrl: egret.Bitmap;

    private boy: egret.Bitmap;

    constructor() {
        super();
        this.getRes();
    }

    private async getRes() {
        this.sheet = await RES.getRes("how_to_play");
        this.initView();
    }

    private initView() {
        

    }


    // 获取面板宽度
    public getWidth(): number {
        return this.width;
    }

    // 获取面板高度
    public getHeight(): number {
        return this.height;
    }

    public play_loop() {

    }
}