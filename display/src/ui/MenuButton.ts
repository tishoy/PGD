/**
 * 菜单按钮UI
 * belong ui
 * create by tishoy
 * 2020.7.10
 */
class MenuButton extends Button {
    constructor(config) {
        super(config);
        this.initView();
    }

    private menuBtn;

    initView() {

        this._isCenterAnchor = true;

        this.menuBtn = new TSBitmap(ResEnum.MENU_BTN_PNG, true);
        this.addChild(this.menuBtn);

        super.initView();

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, UIManager.getInstance().uiMenuBtnTouched, this);
    }

}