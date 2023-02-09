class RightArrow extends Button {
    constructor(config) {
        super(config);
        this.initView();
    }

    private arrow: egret.Bitmap;

    initView() {
        this.arrow = new egret.Bitmap();
        this.arrow.texture = RES.getRes(ResEnum.ARROW_BTN_PNG);
        this.arrow.anchorOffsetX = this.arrow.width / 2;
        this.arrow.anchorOffsetY = this.arrow.height / 2;
        this.addChild(this.arrow);

        super.initView();

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, UIManager.getInstance().uiRightArrowTouched, this);
    }

}