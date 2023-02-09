/**
 * creat by tishoy
 * 游戏主场景
 * 2018.8.9
 */

class GameScene extends egret.DisplayObjectContainer {
    // 游戏场景

    constructor(egretStage: egret.Stage) {
        super();
        this.initView(egretStage);
    }

    private timer: egret.Timer;

    private currentStage: StageParse = null;


    // private itemCtrl: ItemCtrlView;


    private egretStage: egret.Stage;

    private initView(egretStage: egret.Stage): void {



        /**
         * 获取UI 配置 动态实现UI功能
         */
        this.egretStage = egretStage;

        for (var i = 0; i < UIManager.getInstance().uiList.length; i++) {
            UIManager.getInstance().show(UIManager.getInstance().uiList[i]);
        }

        // this.game_head = new GameHead();


        // this.itemCtrl = ItemCtrlView.getInstance(egretStage);
        // this.itemCtrl.scene = this;
        // this.setUI();
        // this.setGameStage();


        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.start_loop, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.stop_loop, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
    }

    private onAdd(e: egret.Event) {
        // SceneManager.getInstance().getUILayer().addChild(this.game_head);
        // SceneManager.getInstance().getUILayer().addChild(this.itemCtrl);
        // this.game_head.updateView();
        for (var i = 0; i < UIManager.getInstance().uiList.length; i++) {
            UIManager.getInstance().show(UIManager.getInstance().uiList[i]);
        }

    }

    private onRemoved() {
        for (var i = 0; i < UIManager.getInstance().uiList.length; i++) {
            UIManager.getInstance().hide(UIManager.getInstance().uiList[i]);
        }
    }

    public async setGameStage() {
        let stageId = StageController.getInstance().getCurrentSelected();
        // let stage = new window["Stage" + id]();
        // stage.name = "stage" + id;
        await ResourceManager.getInstance().loadingStage(stageId);
        let script = RES.getRes("stage" + stageId + "_script_json");
        let stage = new StageParse(script);
        this.currentStage = stage;
        StageController.getInstance().parse = stage;
        stage.scene.scaleX = stage.scene.scaleY = ScreenAdaptManager.scaleRate();
        stage.y = ScreenAdaptManager.getInstance().fixedHeight;
        // if (ScreenAdaptManager.getInstance().scaleMode === egret.StageScaleMode.FIXED_WIDTH) {
        //     stage.scaleX = stage.scaleY = ScreenAdaptManager.scaleRate();
        // } else if (Util.scaleMode() === egret.StageScaleMode.FIXED_HEIGHT) {

        // }
        this.addChild(stage);

        StageController.getInstance().parse = stage;

        // this.game_head.updateView();
        // this.game_head.touchEnabled = true;
        // this.game_head.touchChildren = true;

        // this.itemCtrl.touchEnabled = true;
        // this.itemCtrl.touchChildren = true;

    }

    private onGameOver() {
        ItemController.getInstance().resetList();
        this.removeChild(this.currentStage);
        this.currentStage._remove();
        this.currentStage = null;

        UIManager.getInstance().resetUI();
        // if (this.dragId !== -1) {
        //     this.drag.visible = false;
        // }
    }

    private onClear() {
        ItemController.getInstance().resetList();
        this.removeChild(this.currentStage);
        this.currentStage._remove();
        this.currentStage = null

        UIManager.getInstance().resetUI();

        // if (this.dragId !== -1) {
        //     this.drag.visible = false;
        // }
    }

    private onReset() {
        ItemController.getInstance().resetList();
        this.removeChild(this.currentStage);
        this.currentStage._remove();
        this.currentStage = null

        UIManager.getInstance().resetUI();
        // this.itemCtrl.touchEnabled = false;
        // this.itemCtrl.updateItems();
        // if (this.dragId !== -1) {
        //     this.drag.visible = false;
        // }
    }


    private start_loop(e: egret.Event) {
        // this.egretStage.addEventListener(egret.Event.ENTER_FRAME, this.play_loop, this);

        this.timer = new egret.Timer(1000 / 30, 0)
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.play_loop, this);
        this.timer.start();
    }


    private stop_loop(e: egret.Event) {
        if (this.egretStage.hasEventListener(egret.Event.ENTER_FRAME) === true) {
            // this.egretStage.removeEventListener(egret.Event.ENTER_FRAME, this.play_loop, this);
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.play_loop, this);
            this.timer.stop();
        }
    }

    private play_loop(e: egret.TimerEvent) {
        if (UIManager.getInstance().isPopUp) {
            UIManager.getInstance().getCurrentPop().play_loop();
        } else {
            if (this.currentStage !== null) {
                this.currentStage.play_loop();
            }
        }
    }

    public getCurrentStage() {
        return this.currentStage;
    }


}