/**
 * 解锁剩余关卡弹窗
 * 
 */
class MysteryStagePop extends egret.Sprite implements PopBase {
    constructor() {
        super();
        this.initView();
    }

    private bg: egret.Bitmap;

    private title: egret.Bitmap;
    private stage_show: egret.Bitmap;

    private close_button: egret.Bitmap;
    private unlcok_button: egret.Bitmap;
    private not_now_button: egret.Bitmap;

    private light1: egret.Bitmap;
    private light2: egret.Bitmap;

    private initView() {
        this.bg = new TSBitmap("mystery_pop_png", true);
        this.addChild(this.bg);

        this.title = new TSBitmap("mystery_title_png", true);
        UIManager.getInstance().setUIRelation(this, this.title, [PosTypeEnum.I, PosTypeEnum.T], 0, 150);
        this.addChild(this.title);

        this.light2 = new TSBitmap("mystery_light2_png", true);
        UIManager.getInstance().setUIRelation(this, this.light2, [PosTypeEnum.I, PosTypeEnum.M], 0, -90);
        this.addChild(this.light2);

        this.light1 = new TSBitmap("mystery_light1_png", true);
        UIManager.getInstance().setUIRelation(this, this.light1, [PosTypeEnum.I, PosTypeEnum.M], 0, -90);
        this.addChild(this.light1);


        this.unlcok_button = new TSBitmap("mystery_unlock_btn_png", true);
        this.unlcok_button.touchEnabled = true;
        UIManager.getInstance().setUIRelation(this, this.unlcok_button, [PosTypeEnum.I, PosTypeEnum.B], 0, 350);
        this.addChild(this.unlcok_button);

        this.not_now_button = new TSBitmap("mystery_refuse_btn_png", true);
        this.not_now_button.touchEnabled = true;
        UIManager.getInstance().setUIRelation(this, this.not_now_button, [PosTypeEnum.I, PosTypeEnum.B], 0, 200);
        this.addChild(this.not_now_button);

        this.close_button = new TSBitmap("mystery_close_btn_png", true);
        this.close_button.touchEnabled = true;
        UIManager.getInstance().setUIRelation(this, this.close_button, [PosTypeEnum.I, PosTypeEnum.L_T], 100, 150);
        this.addChild(this.close_button);



        this.stage_show = new TSBitmap("mystery_stage_png", true);
        UIManager.getInstance().setUIRelation(this, this.stage_show, [PosTypeEnum.I, PosTypeEnum.M], 0, -90);
        this.addChild(this.stage_show);


        UIManager.getInstance().setUIPosition(this, PosTypeEnum.M);

        this.addEventListener(egret.Event.ENTER_FRAME, this.play_loop, this);

        this.close_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.unlcok_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUnlock, this);
        this.not_now_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRefuse, this);
    }

    private onClose() {
        UIManager.getInstance().closeMysteryStagePop();
    }

    private onRefuse() {
        AdvertiseManager.getInstance().vedioPlay(() => {

        }, (isFinished) => {

        })
    }

    private onUnlock() {
        AdvertiseManager.getInstance().vedioPlay(() => {

        }, (isFinished) => {
            if (isFinished) {
                StageController.getInstance().unlockStage(16);
                StageController.getInstance().unlockStage(17);
                StageController.getInstance().unlockStage(18);
                StageController.getInstance().unlockStage(19);
                StageController.getInstance().unlockStage(20);
            }
        })
    }

    getWidth(): number {
        return this.width;
    }
    // 获取面板高度
    getHeight(): number {
        return this.height;
    }

    play_loop(): void {
        this.light1.rotation += 0.4;
        this.light2.rotation -= 0.4;
    }
}