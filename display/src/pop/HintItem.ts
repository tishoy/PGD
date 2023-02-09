/**
 * 
 * create by tishoy
 * 2018.10.2
 */
class HintItem extends egret.Sprite {

    /**
     * 
     */

    private type: number;
    private id: number;
    private hintText: egret.TextField;
    private vedioButton: egret.Bitmap;
    private hintShow: boolean = true;

    constructor(type, id) {
        super();
        this.type = type;
        // stageId 或者 cardId
        this.id = id;
        this.initView();
    }

    private initView() {
        let textBg: egret.Bitmap;
        this.hintText = new egret.TextField();
        let tipTitle = new egret.TextField();
        if (this.type === HintTypeEnum.COLLECTION_HINT_ITEM) {
            // let config = Config.getInstance().card_tip[this.id];
            // textBg = new TSBitmap("hintLog_png", true);
            // this.hintText.x = -215;
            // this.hintText.width = 434.7;
            // tipTitle.text = I18nManager.getInstance().getLanguageByName(LanguageEnum.STAGE_NO).replace("$d", config["stage"]);
            // this.hintText.text = I18nManager.getInstance().getLanguageInGroupByName(LanguageEnum.GROUP_CARD, this.id).tip;
        } else {
            textBg = new TSBitmap(ResEnum.HINT_ITEM_PNG, true);
            this.hintText.x = -185.6
            this.hintText.width = 396.75
            if (typeof HintController.getInstance().Hints[this.type - 1] === "string") {
                this.hintText.text = HintController.getInstance().Hints[this.type - 1]
            } else {
                // TODO
                tipTitle.text = HintController.getInstance().Hints[this.type - 1].title;
                // I18nManager.getInstance().getLanguageByName(LanguageEnum.HINT_TITLE).replace("$d", this.type > 0 ? this.type : "");
                // this.hintText.text = I18nManager.getInstance().getLanguageInGroupByName(LanguageEnum.GROUP_HINT, "stage" + this.id)[this.type - 1];
                this.hintText.text = HintController.getInstance().Hints[this.type - 1].hint;
            }

        }
        textBg.anchorOffsetX = textBg.width / 2;
        textBg.anchorOffsetY = textBg.height / 2;
        this.addChild(textBg);

        tipTitle.textAlign = egret.HorizontalAlign.CENTER;
        tipTitle.x = -102.65;
        tipTitle.y = - 59.25;
        tipTitle.width = 205.35;
        tipTitle.height = 30.85;
        tipTitle.size = 24;
        tipTitle.textColor = 0x000000;
        this.addChild(tipTitle);


        this.hintText.y = - 29.65;
        this.hintText.height = 95.15;
        this.hintText.size = 26;
        this.hintText.textColor = 0x000000;
        this.addChild(this.hintText);


        this.vedioButton = new TSBitmap(ResEnum.HINT_SHOW_BTN_PNG, true);
        this.vedioButton.anchorOffsetX = this.vedioButton.width / 2;
        this.vedioButton.anchorOffsetY = this.vedioButton.height / 2;
        this.vedioButton.visible = !this.hintShow;
        // this.vedioButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.seeVedio, this);
        this.addChild(this.vedioButton);

        this.touchEnabled = true;
    }

    get hintType() {
        return this.type;
    }

    get isShow() {
        return this.hintShow;
    }

    public updateHintShow(isShow: boolean) {
        this.hintShow = isShow;
        this.vedioButton.visible = !isShow;
    }

    get hintId() {
        return this.id;
    }

}
