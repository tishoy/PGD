/**
 * 跳关提示窗
 * create by tishoy
 * 2019.2.13
 */
class JumpStagePop extends egret.Sprite implements PopBase {
    private darkSprite: egret.Sprite;
    private jumpPop: egret.Sprite;
    private ok_btn: egret.Bitmap;

    constructor() {
        super();
        this.initView();
    }

    private initView() {
        this.darkSprite = new egret.Sprite();
        this.darkSprite.graphics.clear();
        this.darkSprite.graphics.beginFill(0x000000, 0.3);
        this.darkSprite.graphics.drawRect(0, 0, Util.curWidth(), Util.curHeight());
        this.darkSprite.graphics.endFill();
        this.darkSprite.width = Util.curWidth();
        this.darkSprite.height = Util.curHeight();
        this.addChild(this.darkSprite);
        this.darkSprite.touchEnabled = true;

        egret.Tween.get(this.darkSprite).to({ alpha: 1 }, 150);
        this.darkSprite.visible = true;

        this.jumpPop = new egret.Sprite();
        this.addChild(this.jumpPop);

        let board = new egret.Bitmap();
        board.texture = RES.getRes("board_png");
        this.jumpPop.addChild(board);


        let sorryText = new egret.TextField();
        sorryText.text = "需完成上一关卡才能解锁哟，";
        this.jumpPop.addChild(sorryText);
        let helpText = new egret.TextField();
        helpText.text = "或者求助好友帮忙解锁？";
        this.jumpPop.addChild(helpText);

        this.ok_btn = new egret.Bitmap();
        this.ok_btn.texture = RES.getRes("okbtn_png");;
        this.ok_btn.x = board.width / 2 - this.ok_btn.width / 2;
        this.ok_btn.y = board.height / 2 - this.ok_btn.height / 2 + 120;
        this.ok_btn.touchEnabled = true;
        this.jumpPop.addChild(this.ok_btn);
    }

    private onSharetouched() {
        platform.share("老弟，你能帮我翘掉这堂课么？", "https://cdn.joypac.cn/skipschool/resource/share.jpg");
    }


    // 获取面板宽度
    public getWidth(): number {
        return this.width;
    }

    // 获取面板高度
    public getHeight(): number {
        return this.height;
    }

    public play_loop() {

    }

}