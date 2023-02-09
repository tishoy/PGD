class LeftArrow extends Button {
    constructor(config) {
        super(config);
        this.initView();
    }

    private arrow: egret.Bitmap;

    initView() {
        this.arrow = new TSBitmap(ResEnum.ARROW_BTN_PNG, true);
        this.arrow.scaleX = -1;
        this.addChild(this.arrow);

        super.initView();

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, UIManager.getInstance().uiLeftArrowTouched, this);
    }

}