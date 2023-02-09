class HintButton extends Button {
    constructor(config) {
        super(config);
        this.initView();
    }


    private hintButton;

    initView() {

        this._isCenterAnchor = true;

        this.hintButton = new TSBitmap(ResEnum.HINT_BTN_PNG, true);
        this.addChild(this.hintButton);

        super.initView();

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, UIManager.getInstance().uiHintBtnTouched, this);
    }
}