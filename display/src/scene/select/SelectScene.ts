/**
 * 选择关卡页面
 * create by tishoy
 * 2020.7.8
 */
class SelectScene extends egret.DisplayObjectContainer {

    private egretStage: egret.Stage;

    constructor(egretStage: egret.Stage) {
        super();
        this.initView(egretStage);
    }

    private config;

    private amount = 1;

    private num_textfield: egret.TextField;
    private name_textfield: egret.TextField;

    private bg: egret.Bitmap;
    private logo: egret.Bitmap;
    private left_arrow: egret.Bitmap;
    private right_arrow: egret.Bitmap;
    private start_btn: egret.Bitmap;
    private unlock_btn: egret.Bitmap;
    private lottery_btn: egret.Bitmap;
    private collection_btn: egret.Bitmap;

    private hint_amount_icon: egret.Bitmap;
    private stage_amount_icon: egret.Bitmap;

    private hint_amount_text: egret.TextField;
    private stage_amount_text: egret.TextField;

    private touchTime: number = 0;
    // private status_clear: egret.Bitmap;
    // private status_locked: egret.Bitmap;

    private stage_no_txt: egret.TextField;
    private stage_no_bg: egret.Bitmap;
    private stage_name_txt: egret.TextField;

    private scrollContainer: egret.Sprite;

    private selected: number;

    private stages = [];
    private stageStatus = [];

    private initView(egretStage: egret.Stage): void {
        /**
         * 获取UI 配置 动态实现UI功能
         */

        this.egretStage = egretStage;

        this.config = ConfigManager.getInstance().selectConfigData;
        let settings = this.config.settings;

        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("select_scene_png");
        this.bg.width = ScreenAdaptManager.getDisplayWidth();
        this.bg.height = ScreenAdaptManager.getDisplayHeight();
        this.addChild(this.bg);

        this.scrollContainer = new egret.Sprite();
        this.scrollContainer.y = ScreenAdaptManager.getDisplayHeight() / 2;
        this.addChild(this.scrollContainer);

        this.logo = new TSBitmap(ResEnum.LOGO_PNG, true);
        UIManager.getInstance().setUIPosition(this.logo, PosTypeEnum.T, 0, 0);
        this.addChild(this.logo);

        if (settings.show_name) {
            this.name_textfield = new egret.TextField();
            UIManager.getInstance().setUIPosition(this.name_textfield, settings.name_pos.type, settings.name_pos.x, settings.name_pos.y);
            this.addChild(this.name_textfield);
        }

        if (settings.show_number) {
            this.num_textfield = new egret.TextField();
            this.num_textfield.textAlign = egret.HorizontalAlign.CENTER;
            this.num_textfield.size = 40;
            this.addChild(this.num_textfield);
        }

        this.lottery_btn = new TSBitmap("select_lottery_btn_png", true);
        UIManager.getInstance().setUIPosition(this.lottery_btn, PosTypeEnum.L_T, 40, 300)
        this.lottery_btn.touchEnabled = true;
        this.addChild(this.lottery_btn);
        this.lottery_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLotteryTouched, this);

        this.collection_btn = new TSBitmap("select_collection_btn_png", true);
        UIManager.getInstance().setUIPosition(this.collection_btn, PosTypeEnum.L_T, 160, 305);
        this.collection_btn.touchEnabled = true;
        this.addChild(this.collection_btn);
        this.collection_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCollectionTouched, this);

        this.hint_amount_icon = new TSBitmap("lottery_hint_png", true);
        UIManager.getInstance().setUIPosition(this.hint_amount_icon, PosTypeEnum.R_T, 230, 310);
        this.addChild(this.hint_amount_icon);

        this.hint_amount_text = new egret.TextField();
        UIManager.getInstance().setUIPosition(this.hint_amount_text, PosTypeEnum.R_T, 220, 410);
        this.hint_amount_text.text = "x" + SaveDataManager.getInstance().getHintTimes();
        this.hint_amount_text.textColor = ColorEnum.black;
        this.addChild(this.hint_amount_text);

        this.stage_amount_icon = new TSBitmap("lottery_stage_png", true);
        UIManager.getInstance().setUIPosition(this.stage_amount_icon, PosTypeEnum.R_T, 60, 310)
        this.addChild(this.stage_amount_icon);

        this.stage_amount_text = new egret.TextField();
        UIManager.getInstance().setUIPosition(this.stage_amount_text, PosTypeEnum.R_T, 50, 410);
        this.stage_amount_text.text = "x" + SaveDataManager.getInstance().getKeyTimes();
        this.stage_amount_text.textColor = ColorEnum.black;
        this.addChild(this.stage_amount_text);

        this.left_arrow = new TSBitmap(ResEnum.ARROW_BTN_PNG, true);
        this.left_arrow.scaleX = -1;
        UIManager.getInstance().setUIPosition(this.left_arrow, PosTypeEnum.L, 50, 0);
        this.left_arrow.touchEnabled = true;
        this.left_arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftArrow, this);
        this.left_arrow.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onLeftArrowTouchStart, this);
        this.addChild(this.left_arrow);

        this.right_arrow = new TSBitmap(ResEnum.ARROW_BTN_PNG, true);
        UIManager.getInstance().setUIPosition(this.right_arrow, PosTypeEnum.R, 50, 0);
        this.right_arrow.touchEnabled = true;
        this.right_arrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightArrow, this);
        this.addChild(this.right_arrow);

        this.stage_no_bg = new TSBitmap(ResEnum.SELECT_STAGE_NUM_PNG, true);
        UIManager.getInstance().setUIPosition(this.stage_no_bg, 2, 0, 400);
        this.addChild(this.stage_no_bg);

        this.stage_no_txt = new egret.TextField();
        this.stage_no_txt.textColor = 0x000000;
        this.addChild(this.stage_no_txt);

        this.start_btn = new TSBitmap(ResEnum.START_BTN_PNG, true);
        this.start_btn.x = ScreenAdaptManager.getDisplayWidth() / 2;
        this.start_btn.y = ScreenAdaptManager.getDisplayHeight() - 300;
        this.start_btn.touchEnabled = true;
        this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtn, this);
        this.addChild(this.start_btn);

        this.unlock_btn = new TSBitmap(ResEnum.UNLOCK_BTN_PNG, true);
        this.unlock_btn.x = ScreenAdaptManager.getDisplayWidth() / 2;
        this.unlock_btn.y = ScreenAdaptManager.getDisplayHeight() - 300;
        this.unlock_btn.visible = false;
        this.unlock_btn.touchEnabled = true;
        this.unlock_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUnlockBtn, this);
        this.addChild(this.unlock_btn);


        if (settings.is_default) {
            this.amount = settings.default.amount;
            for (let i = 0; i < settings.default.amount; i++) {
                let stageNo = i + 1;
                let stage = new TSBitmap(settings.default.regEx.replace(settings.default.replace, stageNo), true);
                stage.x = ScreenAdaptManager.getDisplayWidth() / 2 + i * ScreenAdaptManager.getDisplayWidth();
                stage.y = 0;
                if (settings.mask) {
                    if (!StageController.getInstance().isStageOpen(stageNo)) {
                        var colorMatrix = [
                            0.3, 0.6, 0, 0, 0,
                            0.3, 0.6, 0, 0, 0,
                            0.3, 0.6, 0, 0, 0,
                            0, 0, 0, 1, 0
                        ];

                        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                        stage.filters = [colorFlilter];
                    }
                }

                this.stages.push(stage);
                this.scrollContainer.addChild(stage);
                let status_clear = new TSBitmap(ResEnum.CLEAR_SIGN_PNG, true);
                status_clear.visible = false;
                UIManager.getInstance().setUIRelation(stage, status_clear, [PosTypeEnum.I, PosTypeEnum.R_T], 20, 20);
                this.scrollContainer.addChild(status_clear);
                this.stageStatus.push(status_clear);
            }
        } else {
            for (let i = 0; i < this.config.stage.length; i++) {
                this.amount = this.config.stage.length;
                let status_clear = new TSBitmap(ResEnum.CLEAR_SIGN_PNG, true);
            }
        }


        this.addEventListener(egret.Event.ADDED, this.onAdd, this);
        this.scrollToLastPlay();
    }

    private onAdd(e) {
        SceneManager.getInstance().hideLoading();
        for (let i = 0; i < this.stages.length; i++) {
            let stageNo = i + 1;

            if (this.config.settings.mask) {
                if (!StageController.getInstance().isStageOpen(stageNo)) {
                    var colorMatrix = [
                        0.3, 0.6, 0, 0, 0,
                        0.3, 0.6, 0, 0, 0,
                        0.3, 0.6, 0, 0, 0,
                        0, 0, 0, 1, 0
                    ];

                    var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                    this.stages[i].filters = [colorFlilter];
                } else {
                    this.stages[i].filters = [];
                }

            }

            this.stageStatus[i].visible = StageController.getInstance().isStageClear(stageNo);
        }
        this.setHintNumber();
        this.setStageNumber();
    }

    onStartBtn() {
        if (StageController.getInstance().isStageOpen(this.selected)) {
            StageController.getInstance().startStage(this.selected);
        }
    }

    onUnlockBtn() {
        if (SaveDataManager.getInstance().useKey()) {
            StageController.getInstance().startStage(this.selected);
            StageController.getInstance().unlockStage(this.selected);
        } else {
            AdvertiseManager.getInstance().vedioPlay(() => {

            }, (isFinish) => {
                if (isFinish) {
                    StageController.getInstance().startStage(this.selected);
                    StageController.getInstance().unlockStage(this.selected);
                }
            })
        }

    }

    select(stageId) {
        this.selected = stageId;
        StageController.getInstance().setSelect(stageId);
    }


    onLeftArrow() {
        if (this.selected > 1) {
            this.select(this.selected - 1);
            this.scrollTo(this.selected);
            this.right_arrow.visible = true;
        } else {
            // TODO 
        }
    }

    onLeftArrowTouchStart() {
        this.touchTime = new Date().getTime();
        this.left_arrow.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onLeftArrowReleaseOutside, this);
        this.left_arrow.addEventListener(egret.TouchEvent.TOUCH_END, this.onLeftArrowTouchEnd, this);
    }

    onLeftArrowReleaseOutside() {

    }

    onLeftArrowTouchEnd() {
        let now = new Date().getTime();
        if (now - this.touchTime > 2000) {
            this.scrollToLastPlay();
        }
    }


    onRightArrow() {
        if (this.selected < this.amount) {
            this.select(this.selected + 1);
            this.scrollTo(this.selected);
            this.left_arrow.visible = true;
        } else {
            // TODO 
        }
    }

    scrollTo(id) {
        egret.Tween.get(this.scrollContainer).to({ x: (-id + 1) * ScreenAdaptManager.getDisplayWidth() }, 1000, egret.Ease.bounceInOut)
        let settings = this.config.settings;
        if (settings.show_name) {

        }
        if (settings.show_number) {
            this.num_textfield.text = settings.num_text.replace(
                settings.num_replace, id
            )
            this.num_textfield.anchorOffsetX = this.num_textfield.width / 2;
            this.num_textfield.anchorOffsetY = this.num_textfield.height / 2;
            UIManager.getInstance().setUIPosition(this.num_textfield, settings.num_pos.type, settings.num_pos.x, settings.num_pos.y);
        }

        if (StageController.getInstance().isStageOpen(id)) {
            this.start_btn.visible = true;
            this.unlock_btn.visible = false;
        } else {
            this.start_btn.visible = false;
            this.unlock_btn.visible = true;
        }

        this.stage_no_txt.text = this.selected + "/" + this.amount;
        this.stage_no_txt.x = this.stage_no_bg.x - this.stage_no_txt.width / 2;
        this.stage_no_txt.y = this.stage_no_bg.y - this.stage_no_txt.height / 2;

        if (id === 1) {
            this.left_arrow.visible = false;
        } else if (id === this.amount) {
            this.right_arrow.visible = false;
        }
    }

    scrollToLastPlay() {
        this.selected = StageController.getInstance().getCurrentSelected();
        this.scrollTo(this.selected);
    }

    scrollToNewStage() {

    }

    onLotteryTouched() {
        UIManager.getInstance().openLotteryPop();
    }

    onCollectionTouched() {
        SceneManager.getInstance().toCollectionScene();
    }

    public setHintNumber() {
        this.hint_amount_text.text = "x" + SaveDataManager.getInstance().getHintTimes();
    }

    public setStageNumber() {
        this.stage_amount_text.text = "x" + SaveDataManager.getInstance().getKeyTimes();
    }
}
