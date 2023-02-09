
class LotteryPop extends egret.Sprite implements PopBase {
    constructor() {
        super();
        this.initView();
    }

    private config;

    private darkSprite: egret.Sprite;
    private darkSprite2: egret.Sprite;
    private reward_bg: egret.Bitmap;
    private title: egret.Bitmap;
    private backButton: egret.Bitmap;
    private close_button: egret.Bitmap;
    private circle: egret.Bitmap;
    private circle_bg: egret.Bitmap;
    private pointer: egret.Bitmap;
    private start_button: egret.Bitmap;
    private reward_show: egret.Bitmap;
    private reward_retry_button: egret.Bitmap;
    private reward_double_button: egret.Bitmap;

    private lottery_container: egret.Sprite;
    private rewardPop: egret.Sprite;

    private timer: egret.Timer;

    private tempReward = -1;

    private rewardRes = [];
    private rewardPosition = [];

    private initView() {
        // this.config =  GameManager.getInstance().getGameConfig().pops.lottery;

        // for (var key in this.config) {
        //     this[key] = new TSBitmap(this.config[key].res, true);

        // }
        this.rewardRes = RewardController.getInstance().getRes();
        this.rewardPosition = RewardController.getInstance().getPosition();


        this.darkSprite = new egret.Sprite();
        this.darkSprite.graphics.clear();
        this.darkSprite.graphics.beginFill(0x000000, 0.3);
        this.darkSprite.graphics.drawRect(-Util.curWidth() / 2, - Util.curHeight() / 2, Util.curWidth(), Util.curHeight());
        this.darkSprite.graphics.endFill();
        this.darkSprite.width = Util.curWidth();
        this.darkSprite.height = Util.curHeight();
        this.addChild(this.darkSprite)
        this.darkSprite.touchEnabled = true;

        this.backButton = new TSBitmap("lottery_back_btn_png", true);
        UIManager.getInstance().setUIRelation(this, this.backButton, [PosTypeEnum.I, PosTypeEnum.L_T], 100, 100);
        this.addChild(this.backButton);
        this.backButton.visible = false;
        this.backButton.touchEnabled = true;
        this.backButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);

        this.title = new TSBitmap("lottery_title_png", true);
        UIManager.getInstance().setUIRelation(this, this.title, [PosTypeEnum.I, PosTypeEnum.T], 0, 200);
        this.addChild(this.title);

        this.lottery_container = new egret.Sprite();
        this.addChild(this.lottery_container);


        this.circle = new TSBitmap("lottery_circle_png", true);
        this.lottery_container.addChild(this.circle);

        this.circle_bg = new TSBitmap("lottery_bg_png", true);
        this.circle_bg.y = this.lottery_container.y + 12;
        this.addChildAt(this.circle_bg, this.getChildIndex(this.lottery_container));

        for (var i = 0; i < this.rewardRes.length; i++) {
            let rewardIcon = new TSBitmap(this.rewardRes[i], true);
            for (var key in this.rewardPosition[i]) {
                rewardIcon[key] = this.rewardPosition[i][key];
            }
            this.lottery_container.addChild(rewardIcon);
        }

        this.pointer = new TSBitmap("lottery_pointer_png", true);
        this.pointer.y = -50;
        this.addChild(this.pointer);


        this.start_button = new TSBitmap("lottery_start_btn_png", true);
        this.start_button.y = this.circle.y + this.circle.height / 2 + 100;
        this.start_button.touchEnabled = true;
        this.addChild(this.start_button);

        this.start_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);


        this.rewardPop = new egret.Sprite();
        this.addChild(this.rewardPop);

        this.darkSprite2 = new egret.Sprite();
        this.darkSprite2.graphics.clear();
        this.darkSprite2.graphics.beginFill(0x000000, 0.3);
        this.darkSprite2.graphics.drawRect(-Util.curWidth() / 2, - Util.curHeight() / 2, Util.curWidth(), Util.curHeight());
        this.darkSprite2.graphics.endFill();
        this.darkSprite2.width = Util.curWidth();
        this.darkSprite2.height = Util.curHeight();
        this.darkSprite2.touchEnabled = true;

        this.reward_bg = new TSBitmap("lottery_reward_pop_png", true);
        this.rewardPop.addChild(this.reward_bg);

        this.reward_show = new egret.Bitmap();
        this.rewardPop.addChild(this.reward_show);

        this.reward_double_button = new TSBitmap("lottery_double_btn_png", true);
        this.reward_double_button.touchEnabled = true;
        UIManager.getInstance().setUIRelation(this.reward_bg, this.reward_double_button, [PosTypeEnum.I, PosTypeEnum.B], 0, 200);
        this.rewardPop.addChild(this.reward_double_button);
        this.reward_double_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDouble, this);

        this.reward_retry_button = new TSBitmap("lottery_reward_retry_btn_png", true);
        UIManager.getInstance().setUIRelation(this.reward_bg, this.reward_retry_button, [PosTypeEnum.I, PosTypeEnum.B], 0, 100);
        this.reward_retry_button.touchEnabled = true;
        this.rewardPop.addChild(this.reward_retry_button);
        this.reward_retry_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetRewardAndStart, this);

        this.close_button = new TSBitmap("lottery_close_btn_png", true);
        UIManager.getInstance().setUIRelation(this.reward_bg, this.close_button, [PosTypeEnum.I, PosTypeEnum.R_T]);
        this.close_button.touchEnabled = true;
        this.rewardPop.addChild(this.close_button);

        this.rewardPop.visible = false;

        this.close_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);

        UIManager.getInstance().setUIPosition(this, PosTypeEnum.M);

        this.timer = new egret.Timer(2000, 1);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.start();
    }

    private onTimer(e) {
        this.backButton.visible = true;
    }

    private onGetRewardAndStart() {
        this.onStart();
    }

    private onStart(e = null) {


        // this.lottery_container.rotation = 0;
        // egret.Tween.get(this.lottery_container).to({ rotation: 10800 + randRotation }, 25500, egret.Ease.quadInOut).call(() => {
        //     this.showRewardPop();
        // });
        if (AdvertiseManager.getInstance().vedioOK) {
            this.start_button.texture = RES.getRes("lottery_retry_btn_png");
            let timer = new egret.Timer(1000, 1);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onRotationCircle, this);
            AdvertiseManager.getInstance().vedioPlay(() => {
            }, (isFinished) => {
                if (isFinished) {
                    timer.start();
                    this.backButton.touchEnabled = false;
                    this.start_button.touchEnabled = false;
                }
            });
        } else {
            UIManager.getInstance().openNoVedioPop();
        }

        // this.circle.rotation
    }

    onRotationCircle(e) {
        if (this.contains(this.darkSprite2)) {
            this.removeChild(this.darkSprite2);
        }
        this.rewardPop.visible = false;
        this.tempReward = RewardController.getInstance().randomReward();
        let randRotation = RewardController.getInstance().getRotation(this.tempReward);

        egret.Tween.get(this.lottery_container).to({ rotation: 3600 + randRotation }, 5000, egret.Ease.quadInOut).call(() => {
            this.showRewardPop();
        });
    }


    getReward() {
        this.lottery_container.rotation = 0;
        RewardController.getInstance().getReward(this.tempReward);
    }

    private showRewardPop() {
        this.backButton.touchEnabled = true;
        this.start_button.touchEnabled = true;
        this.reward_show.texture = RES.getRes(this.rewardRes[this.tempReward]);
        this.reward_show.anchorOffsetX = this.reward_show.width / 2;
        this.reward_show.anchorOffsetY = this.reward_show.height / 2;
        this.reward_show.y = -100;
        this.addChildAt(this.darkSprite2, this.getChildIndex(this.rewardPop));
        this.getReward();
        this.reward_double_button.visible = true;
        this.rewardPop.visible = true;
        this.rewardPop.scaleX = 0.5;
        this.rewardPop.scaleY = 0.5;
        egret.Tween.get(this.rewardPop).to({ scaleX: 1, scaleY: 1 }, 500);
    }

    private onBack() {
        UIManager.getInstance().closeLotteryPop();
    }

    private onDouble() {
        AdvertiseManager.getInstance().vedioPlay(() => {

        }, (isFinished) => {
            if (isFinished) {
                RewardController.getInstance().doubleGetReward(this.tempReward);
                this.tempReward = -1;
                this.reward_double_button.visible = false;
            }
        });
    }

    private onClose() {
        this.backButton.touchEnabled = true;
        this.start_button.touchEnabled = true;
        if (this.contains(this.darkSprite2)) {
            this.removeChild(this.darkSprite2);
        }
        this.rewardPop.visible = false;
        // RewardController.getInstance().getReward(this.tempReward);
        this.tempReward = -1;
    }

    // 获取面板宽度
    getWidth(): number {
        return this.width;
    }
    // 获取面板高度
    getHeight(): number {
        return this.height;
    }

    play_loop(): void {

    }
}