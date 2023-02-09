/**
 * 关卡数字展示UI
 * create by tishoy
 * 2020.7.10
 */
class StageNo extends egret.Sprite implements UIInterface {

    private stageNameText: egret.TextField;
    private stageNoText: egret.TextField;

    _isCenterAnchor: boolean;
    private config;
    private stageBg;


    constructor(config) {
        super();
        this.config = config;

        this.initView();
    }

    initView() {

        this.stageBg = new egret.Bitmap();
        this.stageBg.texture = RES.getRes(ResEnum.STAGE_NUM_PNG);
        this.stageBg.anchorOffsetX = this.stageBg.width / 2;
        this.stageBg.anchorOffsetY = this.stageBg.height / 2;
        this.addChild(this.stageBg);

        this.stageNameText = new egret.TextField();
        this.stageNameText.text = ""

        this.stageNoText = new egret.TextField();
        this.stageNoText.text = "关卡100";
        this.stageNoText.size = 30;
        this.stageNoText.multiline = false;
        this.stageNoText.textColor = ColorEnum[this.config.textColor];
        // this.stageNoText.x = (stageBg.width - this.stageNoText.width) / 2;
        // this.stageNoText.y = (stageBg.height - this.stageNoText.height) / 2;
        this.addChild(this.stageNoText);

        this.setPosition(this.config);
        this.addEventListener(egret.Event.ADDED, this.onAdd, this);
    }

    private onAdd(e) {
        this.update();
        // this.stageNoText.text = this.config.text.replace("#Num", StageController.getInstance().getCurrentSelected())
        //     .replace("#Name", "");
        // this.stageNoText.anchorOffsetX = this.stageNoText.width / 2;
        // this.stageNoText.anchorOffsetY = this.stageNoText.height / 2;
        // UIManager.getInstance().setUIRelation(this.stageBg, this.stageNoText, this.config.textPosType, this.config.textPos.x, this.config.textPos.y);

    }

    public update() {
        this.stageNoText.text = this.config.text.replace("#Num", StageController.getInstance().getCurrentSelected())
            .replace("#Name", "");
        this.stageNoText.textAlign = egret.HorizontalAlign.CENTER;
        this.stageNoText.anchorOffsetX = this.stageNoText.width / 2;
        this.stageNoText.anchorOffsetY = this.stageNoText.height / 2;
        UIManager.getInstance().setUIRelation(this.stageBg, this.stageNoText, this.config.textPosType, this.config.textPos.x, this.config.textPos.y);

    }

    public isCenterAnchor() {
        return this._isCenterAnchor;
    }

    public setPosition(config) {
        UIManager.getInstance().setUIPosition(this, config.type, config.x, config.y);
    }

    public showName() {
        this.stageNameText.visible = false;
    }

    public showNo() {
        this.stageNoText.visible = false;
    }
}