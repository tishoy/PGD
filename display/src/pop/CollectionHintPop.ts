/**
 * 
 * create by tishoy
 * 2018.10.17
 */
class CollectionHintPop extends egret.Sprite implements PopBase {

    private bg_view: egret.Bitmap;
    private close_btn: egret.Bitmap;
    private sheet: egret.SpriteSheet;
    private config;
    private hint: HintItem;
    private cardId;
    private i18n;
    private darkSprite: egret.Sprite;
    private chance_text: egret.TextField;

    constructor(detail, status) {
        super();
        this.cardId = detail["No"];
        this.getRes();
    }

    private async getRes() {
        this.sheet = await RES.getRes("tip_sheet");
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



        this.bg_view = new TSBitmap("bg0", true);
        this.bg_view.x = Util.curWidth() / 2 - this.bg_view.width / 2;
        this.bg_view.y = Util.curHeight() / 2 - this.bg_view.height / 2;
        this.addChild(this.bg_view);

        // let tip = ;

        // this.chance_text = new egret.TextField();
        // this.chance_text.text = "您有一次免费观看提示的机会";
        // this.chance_text.textColor = 0x000000;
        // this.chance_text.x = this.bg_view.x + 50;
        // this.chance_text.y = this.bg_view.y + this.bg_view.height / 2 - 80;
        // this.chance_text.visible = SaveDataManager.getInstance().isTipGot && !SaveDataManager.getInstance().isTipUsed;
        // this.addChild(this.chance_text);



        this.hint = new HintItem(HintTypeEnum.COLLECTION_HINT_ITEM, this.cardId);
        this.hint.x = this.bg_view.x + this.bg_view.width / 2;
        this.hint.y = this.bg_view.y + this.bg_view.height / 2 + 40;
        this.hint.touchEnabled = true;
        this.hint.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hintTouched, this);
        this.addChild(this.hint);


        this.close_btn = new TSBitmap("close_btn", true);
        this.close_btn.x = this.bg_view.x + this.bg_view.width / 2 - this.close_btn.width / 2 + 252.6;
        this.close_btn.y = this.bg_view.y + this.bg_view.height / 2 - this.close_btn.height / 2 - 156.25;
        this.addChild(this.close_btn);
        this.close_btn.touchEnabled = true;
        this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeTouched, this);



        this.updateView();

        // this.x = Util.x_fix();
        // this.y = Util.curHeight() / 2 - this.bg_view.height / 2;
    }

    private hintTouched(e) {
        let hintItem = e.target as HintItem;
        if (hintItem.isShow) {

        } else {

            if (AdvertiseManager.getInstance().vedioOK) {
                this.seeVedio();
            } else {
                UIManager.getInstance().openNoVedioPop();
            }
        }

        // this.hintList[hintItem.hintId - 1];
    }

    private closeTouched(e) {
        this.destroy();
        UIManager.getInstance().closeCollectionHintPop();
    }

    private destroy() {

    }

    private seeVedio() {
        /**
         * 成功
         */
        AdvertiseManager.getInstance().vedioPlay(function () {
            SoundManager.getInstance().stopBGM();
        }.bind(this), function (isFinish) {
            SoundManager.getInstance().playBGM();
            if (isFinish) {
                HintController.getInstance().setCardHintStatus(this.cardId);
                this.updateView();
                GameAnalyticsController.getInstance().cardVedioPlayAnalytics(this.cardId);
            }
        }.bind(this));
    }


    private updateView() {
        // let cardStatus = SaveDataManager.getInstance().getCardStatus(this.cardId);
        // if (cardStatus > 0) {
        //     this.hint.updateHintShow(true);
        // } else {
        //     this.hint.updateHintShow(false);
        // }
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