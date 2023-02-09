/**
 * 失败弹窗
 * create by tishoy
 * 2018.8.10
 */
class GameOverPop extends egret.Sprite implements PopBase {

    private popViewRes;

    private resultPic: egret.Bitmap;
    // private retry: egret.Bitmap;
    private retry: egret.TextField;
    // private vedio_retry: egret.Bitmap;
    private other: egret.Bitmap;
    private help_btn: egret.Bitmap;
    private jump: egret.Bitmap;
    private ad_bg: egret.Bitmap;
    private onknee: egret.Bitmap;
    private shareVedio: egret.Bitmap;

    private over_hui: egret.Bitmap;
    private over_bi: egret.Bitmap;
    private cheng: egret.Bitmap;
    private gong: egret.Bitmap;
    private word: egret.Bitmap;

    private collections: egret.Sprite;
    private hintPop: HintPop;

    private newSign: egret.Bitmap;
    private share_tip_text: egret.TextField;

    private stageId: number;

    private cardGot: Array<number> = [];
    /**
    * 廣告
    */
    private advertisement: egret.Bitmap;

    private darkSprite;
    private timer: egret.Timer;

    constructor(stage, popViewRes = null) {
        super();
        this.stageId = stage;
        this.popViewRes = popViewRes;
        this.initView()
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

        // 动态资源
        this.resultPic = new TSBitmap(this.popViewRes);
        this.resultPic.x = Util.curWidth() / 2 - this.resultPic.width / 2;
        this.resultPic.y = Util.curHeight() / 2 - this.resultPic.height - 100;
        this.addChild(this.resultPic);


        // this.bg = new TSBitmap("bg", sheet);
        // this.bg.x = -120;
        // this.bg.y = -100;
        // this.bg.alpha = 0.8;
        // this.bg.touchEnabled = true;
        // this.addChild(this.bg);

        this.retry = new egret.TextField();
        this.retry.x = Util.curWidth() / 4;
        this.retry.touchEnabled = true;
        this.retry.textColor = ColorEnum.black;
        this.retry.text = "重 试"
        this.retry.anchorOffsetX = this.retry.width / 2;
        this.retry.anchorOffsetY = this.retry.height / 2;
        this.retry.visible = false;
        this.addChild(this.retry);

        // this.retry = new TSBitmap(ResEnum.OVER_RETRY_BTN_PNG, true);
        // this.retry.x = Util.curWidth() / 4;
        // this.retry.y = Util.curHeight() - AdvertiseManager.getInstance().bannerHeight;
        // this.retry.visible = false;
        // this.retry.touchEnabled = true;
        // this.addChild(this.retry);

        // this.vedio_retry = new TSBitmap(ResEnum.OVER_VEDIO_RETRY_BTN_PNG, true);
        // this.vedio_retry.x = Util.curWidth() / 4;
        // this.vedio_retry.y = Util.curHeight() - AdvertiseManager.getInstance().bannerHeight - 20;
        // this.vedio_retry.touchEnabled = true;
        // this.vedio_retry.visible = false;
        // this.addChild(this.vedio_retry);

        this.jump = new TSBitmap("over_jump_btn_png", true);
        this.jump.x = Util.curWidth() * 3 / 4;
        this.jump.visible = false;
        this.jump.touchEnabled = true;
        this.addChild(this.jump);

        this.other = new TSBitmap(ResEnum.OVER_SELECT_BTN_PNG, true);
        this.other.x = Util.curWidth() * 3 / 4;
        this.other.y = Util.curHeight() / 2;
        this.other.touchEnabled = true;
        // this.addChild(this.other);

        this.help_btn = new TSBitmap(ResEnum.OVER_HINT_BTN_PNG, true);
        this.help_btn.x = Util.curWidth() / 2;
        this.help_btn.y = Util.curHeight() / 2 + 50;
        this.help_btn.touchEnabled = true;
        // this.help_btn.visible = platform.hasVedioSDK();
        this.addChild(this.help_btn);
        egret.Tween.get(this.help_btn, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 500).to({ scaleX: 1, scaleY: 1 }, 500)

        this.hintPop = new HintPop(this.stageId);
        this.hintPop.anchorOffsetX = this.hintPop.width / 2;
        this.hintPop.anchorOffsetY = this.hintPop.height / 2;
        this.hintPop.x = 320;
        this.hintPop.y = 521.35;

        this.shareVedio = new egret.Bitmap();
        // if (platform.name === "tt" && !SaveData.getInstance().isTipGot) {
        //     this.shareVedio.texture = RES.getRes("tip_share_vedio");
        // } else {
        //     this.shareVedio.texture = RES.getRes("share_vedio");
        // }
        this.shareVedio.texture = RES.getRes("share_vedio2_png");
        this.shareVedio.anchorOffsetX = this.shareVedio.width / 2;
        this.shareVedio.anchorOffsetY = this.shareVedio.height / 2;
        this.shareVedio.x = 360;

        if (platform.name === "tt") {
            let shareGetPresentBg = new egret.Shape();
            shareGetPresentBg.graphics.beginFill(0x000000, 0.5);
            shareGetPresentBg.graphics.drawRoundRect(50, 420.35, 540, 150, 20, 20);
            shareGetPresentBg.graphics.endFill();
            // this.addChild(shareGetPresentBg);

            let textGetPresent = new egret.TextField();
            textGetPresent.x = 100;
            textGetPresent.y = 440;
            textGetPresent.width = 440;
            textGetPresent.multiline = true;
            textGetPresent.text = "参与#神回避3 话题活动赢好礼";
            // this.addChild(textGetPresent);

            this.shareVedio.y = Util.curHeight() / 2 + 300;
        } else {
            this.shareVedio.y = Util.curHeight() / 2 + 300;
        }
        this.shareVedio.touchEnabled = true;
        this.shareVedio.visible = platform.hasShareVedioSDK();
        this.addChild(this.shareVedio);

        if (platform.name === "wxgame") {
            this.advertisement = new egret.Bitmap();
            this.advertisement.texture = RES.getRes("board_png");
            this.advertisement.touchEnabled = false;
            this.advertisement.scaleX = 630 / 435;
            this.advertisement.scaleY = 630 / 435;
            this.advertisement.x = (Util.curWidth() - 620) / 2;
            this.advertisement.y = 220.35;
            this.addChild(this.advertisement);
            this.advertisement.addEventListener(egret.TouchEvent.TOUCH_TAP, this.advertisementTouched, this);
        } else {

        }

        this.collections = new egret.Sprite();

        this.collections.y = 520.35;
        this.addChild(this.collections);

        this.retry.addEventListener(egret.TouchEvent.TOUCH_TAP, this.retryTouched, this);
        // this.vedio_retry.addEventListener(egret.TouchEvent.TOUCH_TAP, this.vedioRetryTouched, this);
        this.shareVedio.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareVedioTouched, this);
        this.other.addEventListener(egret.TouchEvent.TOUCH_TAP, this.otherTouched, this);
        this.jump.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJumpStage, this);
        this.help_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.helpTouched, this);

        if (platform.name === "wxgame") {
        }

        if (StageController.getInstance().isStageOpen(AdvertiseManager.getInstance().getInterstitialAdStage())) {
            AdvertiseManager.getInstance().showInterstitial();
        }


        // this.x = Util.x_fix();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
    }

    private onAdd(e) {
        this.timer = new egret.Timer(3000, 1);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onShowButtons, this);
        this.timer.start();
    }

    private onShowButtons(e) {
        this.retry.visible = true;
        // this.retry.visible = MemeryController.getInstance().getRetryTimes() > 0 || !AdvertiseManager.getInstance().vedioOK;
        // this.vedio_retry.visible = MemeryController.getInstance().getRetryTimes() == 0 && AdvertiseManager.getInstance().vedioOK;
        this.jump.visible = true;
        this.retry.y = AdvertiseManager.getInstance().bannerHeight - 20;
        this.jump.y = AdvertiseManager.getInstance().bannerHeight - 20;
    }

    private helpTouched() {
        AdvertiseManager.getInstance().vedioPlay(() => {

        }, (isFinish) => {
            if (isFinish) {
                SaveDataManager.getInstance().saveStageHintRead(this.stageId);
                UIManager.getInstance().openHintPop(this.stageId, true);
            }
        })
    }

    private vedioRetryTouched() {
        AdvertiseManager.getInstance().vedioPlay(() => {

        }, (isFinished) => {
            if (isFinished) {
                this.destroy();
                AdvertiseManager.getInstance().interstitialTimesShow();
                UIManager.getInstance().closeGameOverPop();
                SceneManager.getInstance().currentScene.onGameOver();
                SceneManager.getInstance().toGameScene();
            }

        });
    }

    private retryTouched() {
        this.destroy();
        MemeryController.getInstance().recordRetry();
        AdvertiseManager.getInstance().interstitialTimesShow();
        UIManager.getInstance().closeGameOverPop();
        SceneManager.getInstance().currentScene.onGameOver();
        SceneManager.getInstance().toGameScene();
    }

    private shareVedioTouched() {
        if (platform.name === "tt" || platform.name === "baidu") {
            platform.shareVedio(() => {

            });
        }
    }

    private onJumpStage() {
        AdvertiseManager.getInstance().vedioPlay(() => {

        }, (isFinished) => {
            if (isFinished) {
                UIManager.getInstance().closeGameOverPop();
                StageController.getInstance().setSelectAndStart(this.stageId + 1);
                UIManager.getInstance().updateStageNo();
                SceneManager.getInstance().currentScene.onClear();
                StageController.getInstance().unlockStage(this.stageId + 1);
                AdvertiseManager.getInstance().interstitialTimesShow();
            }
        })
    }

    private otherTouched() {
        this.destroy();
        AdvertiseManager.getInstance().interstitialTimesShow();
        UIManager.getInstance().closeGameOverPop();
        SceneManager.getInstance().currentScene.onGameOver();
        SceneManager.getInstance().toSelectScene();
    }

    private advertisementTouched() {
    }

    private cardViewTouched(e) {
        UIManager.getInstance().openCardPop(this.cardGot);
    }

    private destroy() {
        if (this.newSign && this.collections.contains(this.newSign)) {
            egret.Tween.removeTweens(this.newSign);
        }
        this.timer.stop();
    }


    public setCollections(card: Array<number> = []) {
        if (card.length > 0) {

            this.cardGot = card;

            // let cardView: CardView;
            // let sheet = RES.getRes("data_scene");
            // cardView = new CardView(sheet, card[0]);
            // cardView.x = 320;
            // cardView.touchEnabled = true;
            // this.collections.addChild(cardView);
            // }

            // let circle = new TSBitmap("circle", true);
            // circle.x = 320 - 58.25;
            // circle.y = 43.4 + 20;
            // this.collections.addChild(circle);

            // let cardNum = new egret.TextField();
            // cardNum.text = "" + card.length;
            // cardNum.x = circle.x - cardNum.width / 2;
            // cardNum.y = circle.y - cardNum.height / 2;
            // cardNum.textColor = 0x000000;
            // this.collections.addChild(cardNum);

            // this.newSign = new TSBitmap("new", true);
            // this.newSign.x = 320 + 71;
            // this.newSign.y = -56.5;
            // this.collections.addChild(this.newSign);

            egret.Tween.get(this.newSign, { loop: true }).to(
                { y: -76.5 }, 800
            ).to(
                { y: -56.5 }, 800
            )

            // cardView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cardViewTouched, this);
        }
    }


    getWidth() {
        return this.width;
    }


    getHeight() {
        return this.height;
    }

    play_loop() {

    }
}