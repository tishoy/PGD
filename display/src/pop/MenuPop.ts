/**
 * 菜单窗
 * create by tishoy
 * 2018.8.10
 */
class MenuPop extends egret.Sprite implements PopBase {

    private bg_view: egret.Bitmap;
    private help: egret.Bitmap;
    private retry: egret.Bitmap;
    private vedio_retry: egret.Bitmap;
    private other: egret.Bitmap;
    private share: egret.Bitmap;
    private jump: egret.Bitmap;
    private close: egret.Bitmap;
    private darkSprite: egret.Sprite;

    constructor() {
        super();
        this.initView();
    }

    private initView() {
        this.darkSprite = new egret.Sprite();
        this.darkSprite.graphics.clear();
        this.darkSprite.graphics.beginFill(0x000000, 0.3);
        this.darkSprite.graphics.drawRect(0, 0, Util.curWidth(), Util.curHeight());
        this.darkSprite.graphics.endFill();
        this.darkSprite.width = Util.curWidth();
        this.darkSprite.height = Util.curHeight();
        this.addChild(this.darkSprite)
        this.darkSprite.touchEnabled = true;

        egret.Tween.get(this.darkSprite).to({ alpha: 1 }, 150);
        this.darkSprite.visible = true;

        this.bg_view = new TSBitmap(ResEnum.MENU_POP_PNG, null);
        this.addChild(this.bg_view);

        // this.help = new TSBitmap("help", null);
        // this.help.x = this.bg_view.width / 2 - this.help.width / 2;
        // this.help.y = this.bg_view.height / 2 - this.help.height / 2 - 138.2;
        // this.help.touchEnabled = true;
        // this.help.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpTouched, this);
        // this.help.visible = platform.hasVedioSDK();
        // this.addChild(this.help);

        this.retry = new TSBitmap(ResEnum.MENU_RETRY_BTN_PNG, null);
        this.retry.x = this.bg_view.width / 2 - this.retry.width / 2;
        this.retry.touchEnabled = true;
        this.retry.visible = MemeryController.getInstance().getRetryTimes() > 0;
        this.retry.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRetryTouched, this);
        this.addChild(this.retry);

        this.vedio_retry = new TSBitmap(ResEnum.MENU_VEDIO_RETRY_BTN_PNG, null);
        this.vedio_retry.x = this.bg_view.width / 2 - this.vedio_retry.width / 2;
        this.vedio_retry.touchEnabled = true;
        this.vedio_retry.visible = MemeryController.getInstance().getRetryTimes() == 0;
        this.vedio_retry.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onVedioRetryTouched, this);
        this.addChild(this.vedio_retry);

        this.other = new TSBitmap(ResEnum.MENU_SELECT_BTN_PNG, null);
        this.other.x = this.bg_view.width / 2 - this.other.width / 2;
        this.other.touchEnabled = true;
        this.other.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOtherTouched, this);
        this.addChild(this.other);

        this.jump = new TSBitmap(ResEnum.MENU_JUMP_BTN_PNG, null);
        this.jump.x = this.bg_view.width / 2 - this.other.width / 2;
        this.jump.touchEnabled = true;
        this.jump.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJumpTouched, this);
        this.addChild(this.jump);



        // if (platform.hasVedioSDK()) {
        //     this.other.y = this.bg_view.height / 2 - this.other.height / 2 + 39.75;
        //     this.retry.y = this.bg_view.height / 2 - this.retry.height / 2 - 46.3;
        // } else {
        //     this.other.y = this.bg_view.height / 2 - this.other.height / 2 + 9.75;
        //     this.retry.y = this.bg_view.height / 2 - this.retry.height / 2 - 76.3;
        // }
        this.other.y = this.bg_view.height / 2 - this.other.height / 2 - 100;
        this.retry.y = this.bg_view.height / 2 - this.retry.height / 2 + 100;
        this.vedio_retry.y = this.bg_view.height / 2 - this.vedio_retry.height / 2 + 100;
        this.jump.y = this.bg_view.height / 2 - this.retry.height / 2 + 0;

        this.share = new TSBitmap(ResEnum.MENU_SHARE_BTN_PNG, null);
        this.share.x = this.bg_view.width / 2 - this.share.width / 2;
        this.share.y = this.bg_view.height / 2 - this.share.height / 2 + 179.5;
        this.share.touchEnabled = true;
        this.share.visible = platform.hasShareSDK();
        this.share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareTouched, this);
        this.addChild(this.share);

        this.close = new TSBitmap(ResEnum.CLOSE_BTN_PNG, null);
        this.close.x = this.bg_view.width / 2 - this.close.width / 2 + 203;
        this.close.y = this.bg_view.height / 2 - this.close.height / 2 - 160.9;
        this.close.touchEnabled = true;
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePop, this);
        this.addChild(this.close);

        this.x = Util.curWidth() / 2 - this.bg_view.width / 2;
        this.y = Util.curHeight() / 2 - this.bg_view.height / 2;
        this.darkSprite.x = -(Util.curWidth() / 2 - this.bg_view.width / 2);
        this.darkSprite.y = -(Util.curHeight() / 2 - this.bg_view.height / 2);

        // platform.pauseRecord();
    }

    private onShareTouched() {
        platform.share("老弟，你能帮我翘掉这堂课么？", "https://cdn.joypac.cn/skipschool/resource/share.jpg");
    }

    private onOtherTouched() {
        this.destroy();
        platform.stopRecord();
        AdvertiseManager.getInstance().interstitialTimesShow();
        SceneManager.getInstance().currentScene.onReset();
        UIManager.getInstance().closeMenuPop();
        SceneManager.getInstance().toSelectScene();
    }

    private onHelpTouched() {
        this.destroy();
        UIManager.getInstance().openHintPop(StageController.getInstance().getCurrentSelected());
    }

    private onVedioRetryTouched() {
        platform.stopRecord();
        AdvertiseManager.getInstance().vedioPlay(() => { }, (isFinished) => {
            if (isFinished) {
                AdvertiseManager.getInstance().interstitialTimesShow();
                SceneManager.getInstance().currentScene.onReset();
                UIManager.getInstance().closeMenuPop();
                SceneManager.getInstance().toGameScene();
            }
        })
    }

    private onRetryTouched() {
        this.destroy();
        platform.stopRecord();
        if (MemeryController.getInstance().recordRetry()) {
            AdvertiseManager.getInstance().interstitialTimesShow();
            SceneManager.getInstance().currentScene.onReset();
            UIManager.getInstance().closeMenuPop();
            SceneManager.getInstance().toGameScene();
        }
    }

    private onJumpTouched() {
        this.destroy();
        platform.stopRecord();
        AdvertiseManager.getInstance().vedioPlay(
            () => {

            }, (isFinish) => {
                if (isFinish) {
                    var stageId = StageController.getInstance().getCurrentSelected() + 1;
                    StageController.getInstance().unlockStage(stageId);

                    UIManager.getInstance().closeMenuPop();
                    SceneManager.getInstance().toGameScene();
                    StageController.getInstance().setSelectAndStart(stageId);
                    UIManager.getInstance().updateStageNo();
                    SceneManager.getInstance().currentScene.onClear();
                    AdvertiseManager.getInstance().interstitialTimesShow();

                }
            }
        )





    }

    private closePop() {
        this.destroy();
        // platform.resumeRecord();
        UIManager.getInstance().closeMenuPop();
    }

    private destroy() {

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