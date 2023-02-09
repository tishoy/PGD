/**
 * create by tishoy
 * 2018.8.12
 */
class LoadingUI extends egret.DisplayObjectContainer {

    private data;
    private timer: egret.Timer;
    private loadingParse: LoadingParse;

    public constructor() {
        super();
        this.initView();
    }

    private initView() {


        let bg = new egret.Bitmap(RES.getRes("bg_png"));
        bg.width = ScreenAdaptManager.getDisplayWidth();
        bg.height = ScreenAdaptManager.getDisplayHeight();
        this.addChild(bg);

        let script = RES.getRes("loading_script_json");
        this.loadingParse = new LoadingParse(script);
        this.loadingParse.y = ScreenAdaptManager.getInstance().fixedHeight;
        this.addChild(this.loadingParse);

        this.stageText = new egret.TextField();
        this.stageText.size = 160;
        this.addChild(this.stageText);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.start_loop, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.stop_loop, this);
    }

    private start_loop(e: egret.Event) {
        // this.egretStage.addEventListener(egret.Event.ENTER_FRAME, this.play_loop, this);
        this.timer = new egret.Timer(1000 / 30, 0)
        this.timer.addEventListener(egret.TimerEvent.TIMER, () => {
            this.loadingParse.play_loop();
        }, this);
        this.timer.start();

    }


    private stop_loop(e: egret.Event) {
        if (this.timer.hasEventListener(egret.Event.ENTER_FRAME) === true) {
            // this.egretStage.removeEventListener(egret.Event.ENTER_FRAME, this.play_loop, this);
            this.timer.removeEventListener(egret.TimerEvent.TIMER, () => {
                this.loadingParse.play_loop();
            }, this);
            this.timer.stop();
        }
    }

    private stageText: egret.TextField;


    public showStage(value) {
        this["stageText"].visible = value;
        if (this['logo']) {
            this['logo'].visible = !value;
        }
    }

    public onShow() {

        UIManager.getInstance().getLoadingLayer().addChild(this);
        this.stageText.text = "关卡" + StageController.getInstance().getCurrentSelected();
        this.stageText.textAlign = egret.HorizontalAlign.CENTER;
        this.stageText.x = Util.curWidth() / 2 - this.stageText.width / 2;
        this.stageText.y = 960;
    }

    public beforeHide() {
        this.loadingParse.loaded = true;
        this.loadingParse.onFinish();
    }

    public onHide() {
        if (this.parent === UIManager.getInstance().getLoadingLayer()) {
            UIManager.getInstance().getLoadingLayer().removeChild(this);
        }
        // this.loadingParse.
    }


    public onProgress(current: number, total: number): void {

    }




}
