class StageParse extends BaseParse {

    constructor(script) {
        super(script);
    }

    private leftArrow;
    private rightArrow;

    async _init() {
        this.leftArrow = UIManager.getInstance().getUILeftArrow();
        this.rightArrow = UIManager.getInstance().getUIRightArrow();
        super._init();
        if (this.stageScript.position === undefined) {
            UIManager.getInstance().getUILeftArrow().visible = false;
            UIManager.getInstance().getUIRightArrow().visible = true;
        }
        SceneManager.getInstance().hideLoading();
    }
}