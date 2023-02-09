class LoadingParse extends BaseParse {

    public loaded = false;

    constructor(script) {
        super(script);
    }

    async _init() {
        super._init();
    }

    executeDo() {
        if (UIManager.getInstance().isPopUp) {
            return;
        }
        if (this.actionNowDo < this.doingList.length) {
            this.doAction(this.doingList[this.actionNowDo]);
        } else {
            this.actionNowDo = 0;
            this.doingList = [];
            this.isDoing = false;
            UIManager.getInstance().canMoveScene = true;
            // 完成整个parse;
            if (this.finishing) {
                PuzzleGameController.getInstance().finish();
            } else {
                this.onFinish();
            }
        }
    }

    onStart() {
        this.onFinish();
    }

    onFinish() {
        if (this.loaded && !this.isDoing) {
            if (this.endActionList.length === 0) {
                // SceneManager.getInstance().hideLoading();
            } else {
                PuzzleGameController.getInstance().finishFunc = () => {
                    SceneManager.getInstance().hideLoading();
                };
                console.log(this.endActionList);
                this.doActionList(this.endActionList);
            }

        }
    }

    finishAll() {
        PuzzleGameController.getInstance().finish();
    }
}