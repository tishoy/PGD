/**
 * 
 * create by tishoy
 * 2018.8.10
 */
class HintPop extends egret.Sprite implements PopBase {

    private bg_view: egret.Bitmap;
    private close_btn: egret.Bitmap;
    private config;
    private hintList: Array<HintItem>
    private stageId;
    private i18n;
    private darkSprite: egret.Sprite;
    private chance_text: egret.TextField;

    constructor(stageId) {
        super();
        this.stageId = stageId;
        this.getRes();
    }

    private async getRes() {
        // this.sheet = await RES.getRes("tip_sheet");
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



        this.bg_view = new TSBitmap(ResEnum.HINT_POP_PNG);
        this.bg_view.x = Util.curWidth() / 2 - this.bg_view.width / 2;
        this.bg_view.y = Util.curHeight() / 2 - this.bg_view.height / 2;
        this.addChild(this.bg_view);

        // this.chance_text = new egret.TextField();
        // this.chance_text.text = "您有一次免费观看提示的机会";
        // this.chance_text.textColor = 0x000000;
        // this.chance_text.x = this.bg_view.x + 50;
        // this.chance_text.y = this.bg_view.y + this.bg_view.height / 2 - 250;
        // this.chance_text.visible = SaveDataManager.getInstance().isTipGot && !SaveDataManager.getInstance().isTipUsed;
        // this.addChild(this.chance_text);

        let posY = [-182.75, 0, 185.65];
        // let tips = I18nManager.getInstance().getLanguageInGroupByName(LanguageEnum.GROUP_HINT, "stage" + this.stageId);
        let tips = HintController.getInstance().Hints;

        this.hintList = [];
        let hint: HintItem;



        for (let i = 1; i <= tips.length; i++) {
            hint = new HintItem(i, this.stageId);
            hint.x = this.bg_view.x + this.bg_view.width / 2;
            hint.y = this.bg_view.y + this.bg_view.height / 2 + posY[i - 1];
            hint.touchEnabled = true;
            hint.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hintTouched, this);
            this.hintList.push(hint);
            this.addChild(hint);
        }


        this.close_btn = new TSBitmap(ResEnum.CLOSE_BTN_PNG);
        this.close_btn.x = this.bg_view.x + this.bg_view.width / 2 - this.close_btn.width / 2 + 292.6;
        this.close_btn.y = this.bg_view.y + this.bg_view.height / 2 - this.close_btn.height / 2 - 365.5;
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
                this.seeVedio(e.hintId);
            } 
            // this.updateView();
        }

        // this.hintList[hintItem.hintId - 1];
    }

    private closeTouched(e) {
        this.destroy();
        UIManager.getInstance().closeHintPop();
    }

    private destroy() {

    }

    async seeVedio(hintId) {
        // await platform.vedioPlay(AdManager.getInstance().vedioAd);
        /**
         * 成功
         */
        AdvertiseManager.getInstance().vedioPlay(function () {
            SoundManager.getInstance().stopBGM();
        }.bind(this), function (isFinish) {
            SoundManager.getInstance().playBGM();
            if (isFinish) {
                HintController.getInstance().setStageHintStatus(this.stageId);
                // SaveData.getInstance().saveStageHintRead(this.stageId);
                this.updateView();
                GameAnalyticsController.getInstance().stageVedioPlayAnalytics(this.stageId, hintId);
            }
        }.bind(this));

    }


    private updateView() {
        let stageStatus = SaveDataManager.getInstance().getStageStatus(this.stageId);
        for (let i = 0; i < this.hintList.length; i++) {
            if (this.hintList[i].hintType <= stageStatus.hint) {
                this.hintList[i].visible = true;
                this.hintList[i].updateHintShow(true);
            } else if (this.hintList[i].hintType === stageStatus.hint + 1) {
                this.hintList[i].visible = true;
                this.hintList[i].updateHintShow(false);
            } else {
                // TODO调试状态
                this.hintList[i].visible = false;
            }
        }
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