class CGScene extends egret.DisplayObjectContainer {
    constructor(stage) {
        super();
        this.initView();
    }

    private timer;
    private cgParse;

    private initView() {
        let script = RES.getRes("cg_script_json");
        this.cgParse = new CGParse(script);
        this.addChild(this.cgParse);


        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.start_loop, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.stop_loop, this);
    }

    private start_loop(e: egret.Event) {
        // this.egretStage.addEventListener(egret.Event.ENTER_FRAME, this.play_loop, this);
        this.timer = new egret.Timer(1000 / 30, 0)
        this.timer.addEventListener(egret.TimerEvent.TIMER, () => {
            this.cgParse.play_loop();
        }, this);
        this.timer.start();

    }


    private stop_loop(e: egret.Event) {
        if (this.timer.hasEventListener(egret.Event.ENTER_FRAME) === true) {
            // this.egretStage.removeEventListener(egret.Event.ENTER_FRAME, this.play_loop, this);
            this.timer.removeEventListener(egret.TimerEvent.TIMER, () => {
                this.cgParse.play_loop();
            }, this);
            this.timer.stop();
        }
    }
}