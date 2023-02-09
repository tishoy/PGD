class HintButtomButton extends Button {
    constructor(config) {
        super(config);
        this.config = config;
        this.initView();
    }


    private hintButton;

    initView() {

        this._isCenterAnchor = true;

        this.hintButton = new TSBitmap(ResEnum.HINT_BUTTOM_BTN_PNG, true);
        this.addChild(this.hintButton);


        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, UIManager.getInstance().uiHintBtnTouched, this);
        UIManager.getInstance().setUIPosition(this, this.config.type, this.config.x, this.config.y);

        // this.addEventListener(egret.Event.ADDED, () => {
        //     if (!UIManager.getInstance().canMoveScene) {
        //         return;
        //     }
        //     // if (AdvertiseManager.getInstance().bannerOK) {
        //     //     UIManager.getInstance().setUIPosition(this, this.config.type, this.config.x, this.config.y + AdvertiseManager.getInstance().bannerHeight - ScreenAdaptManager.getInstance().fixedHeight);
        //     // } else {
        //     UIManager.getInstance().setUIPosition(this, this.config.type, this.config.x, this.config.y);
        //     // }
        // }, this);
    }



}