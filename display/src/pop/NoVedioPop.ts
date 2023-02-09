/**
 * 没有视频弹窗
 * create by tishoy
 * 2018.12.18
 */
class NoVedioPop extends egret.Sprite implements PopBase {
    private ok_btn: egret.Bitmap;
    private close_btn: egret.Bitmap;
    private noVedioPop: egret.Sprite;
    private darkSprite: egret.Sprite;

    constructor() {
        super();
        this.initView();
    }

    initView() {
        this.darkSprite = new egret.Sprite();
        this.darkSprite.graphics.clear();
        this.darkSprite.graphics.beginFill(0x000000, 0.3);
        this.darkSprite.graphics.drawRect(0, 0, Util.curWidth(), Util.curHeight());
        this.darkSprite.graphics.endFill();
        this.darkSprite.width = Util.curWidth();
        this.darkSprite.height = Util.curHeight();
        this.addChild(this.darkSprite)
        this.darkSprite.touchEnabled = true;

        this.noVedioPop = new egret.Sprite();
        let board = new TSBitmap("novedio_pop_png", true);
        this.noVedioPop.addChild(board);

        // let noVedioText = new egret.TextField();
        // noVedioText.x = 40;
        // noVedioText.y = 30;
        // noVedioText.size = 30;
        // noVedioText.width = board.width - 80;
        // noVedioText.textColor = 0x000000;
        // noVedioText.text = "视频还在赶来的路上，";
        // this.noVedioPop.addChild(noVedioText);

        // let noVedioText2 = new egret.TextField();
        // noVedioText2.x = 40;
        // noVedioText2.y = 80;
        // noVedioText2.size = 20;
        // noVedioText2.width = board.width - 80;
        // noVedioText2.textColor = 0xdd0000;
        // noVedioText2.text = "・连续看了好几次";
        // this.noVedioPop.addChild(noVedioText2);

        // let noVedioText3 = new egret.TextField();
        // noVedioText3.x = 40;
        // noVedioText3.y = 130;
        // noVedioText3.size = 20;
        // noVedioText3.width = board.width - 80;
        // noVedioText3.textColor = 0xdd0000;
        // noVedioText3.text = "・网络状态不好";
        // this.noVedioPop.addChild(noVedioText3);

        // let noVedioText4 = new egret.TextField();
        // noVedioText4.x = 40;
        // noVedioText4.y = 100;
        // noVedioText4.size = 25;
        // noVedioText4.width = board.width - 80;
        // noVedioText4.textColor = 0x222222;
        // noVedioText4.text = "请稍后再试";
        // noVedioText4.text = "可以等待几十秒后再来看看哦~";
        // this.noVedioPop.addChild(noVedioText4);

        this.close_btn = new TSBitmap(ResEnum.CLOSE_BTN_PNG, true);
        UIManager.getInstance().setUIRelation(board, this.close_btn, [PosTypeEnum.I, PosTypeEnum.R_T]);
        this.close_btn.touchEnabled = true;
        this.noVedioPop.addChild(this.close_btn);

        this.ok_btn = new egret.Bitmap();
        this.ok_btn.texture = RES.getRes("ok_btn_png");;
        this.ok_btn.x = - this.ok_btn.width / 2;
        this.ok_btn.y = - this.ok_btn.height / 2 + 80;
        this.ok_btn.touchEnabled = true;
        this.noVedioPop.addChild(this.ok_btn);


        this.addChild(this.noVedioPop);

        this.touchEnabled = true;

        this.ok_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

        this.x = Util.curWidth() / 2;
        this.y = Util.curHeight() / 2;
        this.darkSprite.x = -(Util.curWidth() / 2);
        this.darkSprite.y = -(Util.curHeight() / 2);
    }

    private onTouch(e) {
        UIManager.getInstance().closeNoVedioPop();
    }

    private destroy() {

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
