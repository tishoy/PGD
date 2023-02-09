/**
 * 获得物品的pop界面
 * create by tishoy
 * 2018.8.10
 * 
 */

class ItemGetPop extends egret.Sprite implements PopBase {
    private ok_btn: egret.Bitmap;
    private item_icon: egret.Bitmap;
    private bg_view: egret.Bitmap;

    private handTouch: egret.Bitmap;
    private guideHand: egret.Bitmap;

    constructor() {
        super();
        this.initView();
    }

    public setIcon(icon_name) {
        SoundManager.getInstance().playSound(SoundEnum.ITEMSOUND_MP3);
        this.item_icon = new egret.Bitmap();
        this.item_icon.texture = RES.getRes(icon_name);
        this.item_icon.x = this.bg_view.width / 2 - this.item_icon.width / 2;
        this.item_icon.y = this.bg_view.height / 2 - this.item_icon.height / 2;
        this.addChild(this.item_icon);
    }

    private initView() {


        this.bg_view = new egret.Bitmap();
        this.bg_view.texture = RES.getRes(ResEnum.ITEM_POP_PNG);
        this.addChild(this.bg_view);

        // this.ok_btn = new TSButton(this, "okbtn_png");

        this.ok_btn = new egret.Bitmap();
        this.ok_btn.texture = RES.getRes(ResEnum.OK_BTN_PNG);;
        this.ok_btn.x = this.bg_view.width / 2 - this.ok_btn.width / 2;
        this.ok_btn.y = this.bg_view.width / 2 - this.ok_btn.height / 2 + 180;
        this.ok_btn.touchEnabled = true;
        this.addChild(this.ok_btn);

        this.x = Util.curWidth() / 2 - this.bg_view.width / 2;
        this.y = Util.curHeight() / 2 - this.bg_view.height / 2;



        if (!GuideController.getInstance().showGuide) {
            // this.handTouch = new TSBitmap("touch_png");
            // this.handTouch.anchorOffsetX = this.handTouch.width / 2;
            // this.handTouch.anchorOffsetY = this.handTouch.height / 2;
            // this.handTouch.visible = true;
            // this.handTouch.x = this.ok_btn.x + this.ok_btn.width / 2;
            // this.handTouch.y = this.ok_btn.y + this.ok_btn.height / 2;
            // this.addChild(this.handTouch);

            // this.guideHand = new TSBitmap("hand_png");
            // this.guideHand.anchorOffsetX = this.guideHand.width / 2;
            // this.guideHand.anchorOffsetY = this.guideHand.height / 2;
            // this.guideHand.visible = true;
            // this.guideHand.x = this.ok_btn.x + this.ok_btn.width / 2;
            // this.guideHand.y = this.ok_btn.y + this.ok_btn.height;
            // this.addChild(this.guideHand);

            // egret.Tween.get(this.handTouch, { loop: true }).to({ scaleX: 1.5, scaleY: 1.5 }, 1000)
        }


        this.ok_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePop, this);
    }

    private closePop() {
        if (GuideController.getInstance().showGuide) {
            this.guideHand.visible = false;
            this.handTouch.visible = false;
            egret.Tween.removeTweens(this.handTouch);
        }
        SoundManager.getInstance().playSound(SoundEnum.CLICKSOUND_MP3);
        UIManager.getInstance().closeItemGetPop();
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