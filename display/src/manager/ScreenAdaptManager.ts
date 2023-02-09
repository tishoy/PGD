/**
 * 屏幕适配管理器
 * create by tishoy
 * 2020.7.1
 */
class ScreenAdaptManager {

    private static instance: ScreenAdaptManager = null;
    private static egretStage: egret.Stage;

    private _scaleMode;

    private _fixedHeight = 0;
    private _fixedWidth = 0;

    constructor() {
    }

    public init(egretStage: egret.Stage): void {
        ScreenAdaptManager.egretStage = egretStage;
        ScreenAdaptManager.gameScreenAdapt(egretStage);
    }

    public static getInstance(): ScreenAdaptManager {
        if (this.instance === null) {
            this.instance = new ScreenAdaptManager();
        }
        return this.instance;
    }

    /**
     * 手机宽度 像素
     */
    static getPixelWidth() {
        return platform.curWidth();
    }

    /**
     * 手机高度 像素
     */
    static getPixelHeight() {
        return platform.curHeight();
    }

    /**
     * 获取游戏实际展示的宽度 根据游戏不同动态调整
     */
    static getDisplayWidth() {
        return this.egretStage.stageWidth;
    }

    /**
     * 获取游戏实际展示的高度 根据游戏不同动态调整
     */
    static getDisplayHeight() {
        return this.egretStage.stageHeight;
    }

    static scaleRate() {
        return this.getDisplayWidth() / this.getGameWidth();
    }

    //游戏设计的宽度
    static getGameWidth() {
        return GameManager.getInstance().getGameConfig().stageWidth;
    }

    static getGameHeight() {
        return GameManager.getInstance().getGameConfig().stageHeight;
    }

    /**
     * 实际宽高比
     */
    static getPixelRate() {
        return this.getPixelWidth() / this.getPixelHeight();
    }

    static getDisplayRate() {
        return this.getDisplayWidth() / this.getDisplayHeight();
    }

    /**
     * 游戏设计宽高比
     */
    static getGameRate() {
        return this.getGameWidth() / this.getGameHeight();
    }


    static gameScreenAdapt(stage) {

        /**
         * 长宽适配方案
         */
        if (this.getDisplayRate() < this.getGameRate()) {
            ScreenAdaptManager.getInstance()._scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            ScreenAdaptManager.getInstance()._fixedHeight = (stage.stageHeight - this.getGameHeight()) / 2;
        } else {
            ScreenAdaptManager.getInstance()._scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            ScreenAdaptManager.getInstance()._fixedWidth = (stage.stageWidth - this.getGameWidth()) / 2;
        }
        stage.scaleMode = ScreenAdaptManager.getInstance().scaleMode;
    }

    get fixedHeight() {

        return this._fixedHeight;
    }

    get fixedWidth() {
        return this._fixedWidth;
    }

    get scaleMode() {
        return this._scaleMode;
    }

}