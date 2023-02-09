/**
 * 过关弹窗
 * create by tishoy
 * 2018.8.10
 */
class ClearPop extends egret.Sprite implements PopBase {

    private resultPic: egret.Bitmap;

    private retry: egret.Bitmap;
    private vedio_retry: egret.Bitmap;
    private other: egret.Bitmap;
    private next: egret.Bitmap;
    private share: egret.Bitmap;
    private shareVedio: egret.Bitmap;
    private collection: egret.Bitmap;
    // private ad_bg: egret.Bitmap;
    // private light: egret.Bitmap;

    // 回避成功四個字
    // private clear_hui: egret.Bitmap;
    // private clear_bi: egret.Bitmap;
    // private cheng: egret.Bitmap;
    // private gong: egret.Bitmap;
    // private word: egret.Bitmap;

    private stageId: number;
    private popViewRes: string;
    private popViewPic: egret.Bitmap;

    //彩帶
    // private red: egret.Bitmap;
    // private yellow: egret.Bitmap;
    // private wathet: egret.Bitmap;
    // private blue: egret.Bitmap;
    // private green: egret.Bitmap;
    // private purple: egret.Bitmap;
    // private pink: egret.Bitmap;

    private boy: egret.MovieClip;

    private newSign: egret.Bitmap;

    // private collections: egret.Sprite;

    private cardGot: Array<number> = [];
    private share_tip_text: egret.TextField;

    /**
     * 廣告
     */
    private advertisement: egret.Bitmap;

    private darkSprite;

    constructor(stage, popViewRes = null) {
        super();
        this.stageId = stage;
        this.popViewRes = popViewRes;
        this.initView();

    }

    private initView() {

        SoundManager.getInstance().playSound("result0_mp3")

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




        this.retry = new TSBitmap(ResEnum.CLEAR_RETRY_BTN_PNG, true);
        this.retry.x = Util.curWidth() / 4 - 40;
        this.retry.y = Util.curHeight() / 2;
        this.retry.touchEnabled = true;
        this.retry.visible = MemeryController.getInstance().getRetryTimes() > 0;
        this.addChild(this.retry);
        
        this.vedio_retry = new TSBitmap(ResEnum.CLEAR_VEDIO_RETRY_BTN_PNG, true);
        this.vedio_retry.x = Util.curWidth() / 4 - 40;
        this.vedio_retry.y = Util.curHeight() / 2;
        this.vedio_retry.touchEnabled = true;
        this.vedio_retry.visible = MemeryController.getInstance().getRetryTimes() == 0;
        this.addChild(this.vedio_retry);

        this.other = new TSBitmap(ResEnum.CLEAR_SELECT_BTN_PNG, true);
        this.other.x = Util.curWidth() / 2 - 10;
        this.other.y = Util.curHeight() / 2;
        this.other.touchEnabled = true;
        this.addChild(this.other);

        this.next = new TSBitmap(ResEnum.CLEAR_NEXT_BTN_PNG, true);
        this.next.x = Util.curWidth() * 3 / 4 + 40;
        this.next.y = Util.curHeight() / 2
        this.next.touchEnabled = true;
        this.next.visible = (this.stageId !== 20)
        this.addChild(this.next);

        /**
         * 普通分享
         */
        this.share = new TSBitmap(ResEnum.CLEAR_SHARE_BTN_PNG, true);
        this.share.x = ScreenAdaptManager.getDisplayWidth() / 4;
        this.share.y = Util.curHeight() / 2 + 200;
        this.share.touchEnabled = true;
        // this.share.visible = true;
        this.share.visible = !platform.hasShareVedioSDK() && platform.hasShareSDK();
        // this.addChild(this.share);

        this.collection = new TSBitmap(ResEnum.CLEAR_COLLECTION_BTN_PNG, true);
        this.collection.x = ScreenAdaptManager.getDisplayWidth() * 3 / 4;
        this.collection.y = Util.curHeight() / 2 + 200;
        this.collection.touchEnabled = true;
        this.collection.visible = true;
        this.addChild(this.collection);


        this.shareVedio = new egret.Bitmap();
        // if (platform.name === "tt" && !SaveData.getInstance().isTipGot) {
        //     this.shareVedio.texture = RES.getRes("tip_share_vedio");
        // } else {
        //     this.shareVedio.texture = RES.getRes("share_vedio_png");
        // }
        this.shareVedio.texture = RES.getRes(ResEnum.CLEAR_SHARE_BTN_PNG);

        this.shareVedio.anchorOffsetX = this.shareVedio.width / 2;
        this.shareVedio.anchorOffsetY = this.shareVedio.height / 2;
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
            this.shareVedio.y = Util.curHeight() / 2 + 200;
        } else {
            this.shareVedio.y = Util.curHeight() / 2 + 200;
            // this.shareVedio.y = 926 - 150;
        }
        this.shareVedio.x = ScreenAdaptManager.getDisplayWidth() / 4;
        this.shareVedio.touchEnabled = true;
        this.shareVedio.visible = true;
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
        }





        this.vedio_retry.addEventListener(egret.TouchEvent.TOUCH_TAP, this.vedioRetryTouched, this);
        this.retry.addEventListener(egret.TouchEvent.TOUCH_TAP, this.retryTouched, this);
        this.share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareTouched, this);
        this.shareVedio.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareVedioTouched, this);
        this.other.addEventListener(egret.TouchEvent.TOUCH_TAP, this.otherTouched, this);
        this.next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextTouched, this);
        this.collection.addEventListener(egret.TouchEvent.TOUCH_TAP, this.collectionTouched, this);

        if (platform.name === "wxgame") {
        }

        if (StageController.getInstance().isStageOpen(AdvertiseManager.getInstance().getInterstitialAdStage())) {
            AdvertiseManager.getInstance().showInterstitial();
        }
        // this.x = Util.x_fix();
    }

    private retryTouched() {
        this.destroy();
        MemeryController.getInstance().recordRetry();
        AdvertiseManager.getInstance().interstitialTimesShow();
        UIManager.getInstance().closeClearPop();
        SceneManager.getInstance().currentScene.onClear();
        SceneManager.getInstance().toGameScene();
    }

    private vedioRetryTouched() {
        AdvertiseManager.getInstance().vedioPlay(() => {

        }, () => {
            this.destroy();
            AdvertiseManager.getInstance().interstitialTimesShow();
            UIManager.getInstance().closeClearPop();
            SceneManager.getInstance().currentScene.onClear();
            SceneManager.getInstance().toGameScene();
        });

    }

    private shareVedioTouched() {
        if (platform.name === "tt" || platform.name === "baidu") {
            platform.shareVedio(() => {
                console.log("share success");
                // SaveData.getInstance().saveTip(1);
            });
        }
    }

    private shareTouched() {
        // this.destroy();
        if (platform.name === "tt") {
            platform.shareVedio(() => {
                // SaveData.getInstance().saveTip(1);
            });
        } else {
            platform.share("老弟，你能帮我翘掉这堂课么？", "https://cdn.joypac.cn/skipschool/resource/share.jpg");
        }
    }

    private collectionTouched(e) {
        AdvertiseManager.getInstance().vedioPlay(() => {

        }, (isFinished) => {
            if (isFinished) {
                let rewardItem = CollectionController.getInstance().getCollectionByStageId(this.stageId);
                UIManager.getInstance().openItemGetPop(rewardItem.res);
                SaveDataManager.getInstance().saveGotItem(rewardItem.res);
            }
        });
    }

    private nextTouched(e) {
        if (StageController.getInstance().isStageOpen(this.stageId + 1)) {
            AdvertiseManager.getInstance().interstitialTimesShow();
            UIManager.getInstance().closeClearPop();
            StageController.getInstance().setSelectAndStart(this.stageId + 1);
            UIManager.getInstance().updateStageNo();
            SceneManager.getInstance().currentScene.onClear();
        }
    }

    private otherTouched() {

        this.destroy();
        AdvertiseManager.getInstance().interstitialTimesShow();
        UIManager.getInstance().closeClearPop();
        SceneManager.getInstance().showLoading();
        SceneManager.getInstance().currentScene.onClear();
        SceneManager.getInstance().toSelectScene();
    }

    private cardViewTouched(e) {
        // UIManager.getInstance().openCardPop(this.cardGot);
    }

    private advertisementTouched() {
        this.destroy();
    }

    private destroy() {

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