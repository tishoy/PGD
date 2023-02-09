
/**
 * 選擇關卡 的每一関界面
 * create by tishoy
 * 2018.8.20
 */

class SelectStageView extends egret.Sprite {

    private acts: egret.Bitmap;
    private clear: egret.Bitmap;

    private id: number;

    private titleText: egret.TextField;
    private stageName: string;
    private textBG: egret.Shape;
    private newTag: egret.Bitmap;

    // private closedMask: egret.Shape;

    constructor(id: number, json) {
        super()
        this.id = id;
        this.init(id, json);
    }

    private init(id: number, json) {
        let act = new TSBitmap("st" + id + "btn_png", true);
        act.x = json["act" + id].x;
        act.y = json["act" + id].y;
        this.addChild(act);

        // let idbg = new TSBitmap("idbg", RES.getRes("select_sheet"));
        // idbg.anchorOffsetX = 0;
        // idbg.anchorOffsetY = 0;
        // idbg.x = json["act" + id].idbg.x - idbg.width / 2;
        // idbg.y = json["act" + id].idbg.y - idbg.height / 2;
        // this.addChild(idbg);

        // let idText = new egret.TextField();
        // idText.textColor = 0x000000
        // idText.text = id.toString();
        // idText.anchorOffsetX = idText.width / 2;
        // idText.anchorOffsetY = idText.height / 2;
        // idText.x = idbg.x + idbg.width / 2;
        // idText.y = idbg.y + idbg.height / 2;
        // this.addChild(idText);

        // this.titleText = new egret.TextField();
        // this.textBG = new egret.Shape();
        // this.titleText.textColor = 0xffffff;
        // this.stageName = I18nManager.getInstance().getLanguageInGroupByName("stageLang", "stage" + id);
        // if (json["act" + id].title === "right") {
        //     this.titleText.text = this.stageName;
        //     this.titleText.x = idbg.x + idbg.width;
        //     this.titleText.y = idbg.y + this.titleText.height / 2 - 10;
        //     this.textBG.graphics.beginFill(0x000000);
        //     this.textBG.graphics.drawRect(this.titleText.x, this.titleText.y, this.titleText.width, this.titleText.height);
        //     this.textBG.graphics.endFill();
        //     this.addChild(this.textBG);
        //     this.addChild(this.titleText);
        // } else {
        //     this.titleText.text = json["act" + id].name;
        //     this.titleText.x = idbg.x - this.titleText.width;
        //     this.titleText.y = idbg.y + this.titleText.height / 2 - 10;
        //     this.textBG.graphics.beginFill(0x000000);
        //     this.textBG.graphics.drawRect(this.titleText.x, this.titleText.y, this.titleText.width, this.titleText.height);
        //     this.textBG.graphics.endFill();
        //     this.addChild(this.textBG);
        //     this.addChild(this.titleText);
        // }
        // this.titleText.visible = false;
        // this.textBG.visible = false;

        // this.acts = new TSBitmap("act" + id + "s", RES.getRes("selects_sheet"));
        // this.acts.x = json["act" + id].view.x;
        // this.acts.y = json["act" + id].view.y;
        // this.addChild(this.acts);

        // this.closedMask = new egret.Shape();
        // this.closedMask.graphics.beginFill(0x000000);
        // this.closedMask.graphics.drawRect(act.x, act.y, act.width, act.height);
        // this.closedMask.graphics.endFill();
        // this.closedMask.alpha = 0;
        // this.addChild(this.closedMask);

        // this.newTag = new TSBitmap("new", RES.getRes("pops_sheet"), true);
        // this.newTag.x = json["act" + id].clear.x;
        // this.newTag.y = json["act" + id].clear.y;
        // this.newTag.visible = false;
        // this.addChild(this.newTag);

        this.clear = new TSBitmap("clearImage_png");
        this.clear.anchorOffsetX = this.clear.width / 2;
        this.clear.anchorOffsetY = this.clear.height / 2;
        this.clear.x = json["act" + id].x + json["act" + id].clear.x;
        this.clear.y = json["act" + id].y + json["act" + id].clear.y;
        this.addChild(this.clear);

        this.updateStatus();

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelected, this);
    }

    private onSelected() {
        SoundManager.getInstance().playSound(SoundEnum.SELECTSOUND_MP3)
        StageController.getInstance().setSelect(this.id);
        // if () {
        // this.setSelected();
        // } else {

        // }
    }

    public updateStatus() {
        /**
         * 遮罩未啓用
         */
        if (StageController.getInstance().isStageOpen(this.id)) {
            this.filters = [];
            // this.closedMask.alpha = 0;
        } else {
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];

            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.filters = [colorFlilter];
            // this.closedMask.alpha = 0.2;
        }
        if (StageController.getInstance().isStageClear(this.id)) {
            this.clear.visible = true;
        } else {
            this.clear.visible = false;
        }
        // if (StageController.getInstance().isStageNew(this.id)) {
        //     this.setNewTagShow(true);
        // } else {
        //     this.setNewTagShow(false);
        // }
        // if (StageController.getInstance().getCurrentSelected() === this.id) {
        // this.setSelected(true);
        // } else {
        //     this.setSelected(false);
        // }
    }

    // public setNewTagShow(visible: boolean) {
    //     if (visible) {
    //         egret.Tween.get(this.newTag, { loop: true }).to(
    //             { y: this.newTag.y + 10 }, 800
    //         ).to(
    //             { y: this.newTag.y - 10 }, 800
    //         )
    //     } else {
    //         if (this.newTag.visible === true) {
    //             egret.Tween.removeTweens(this.newTag);
    //         }
    //     }
    //     this.newTag.visible = visible;
    // }

    public setSelected(visible: boolean) {
        // this.acts.visible = visible;
        // this.titleText.visible = visible;
        // this.textBG.visible = visible;
    }

    public getStageName() {
        return this.stageName;
    }

}