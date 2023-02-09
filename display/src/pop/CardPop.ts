/**
 * create by tishoy
 * 2018.10.19
 */

class CardPop extends egret.Sprite implements PopBase {
    private sheet: egret.SpriteSheet;
    private darkSprite: egret.Sprite;

    private _id: number;

    private cards: Array<number>;

    private detail;

    private cardBg: egret.Bitmap;
    private head: egret.Bitmap;
    private head_title: egret.Bitmap;
    private stage_text: egret.TextField;
    private card_name: egret.TextField;
    private cardBmp: egret.Bitmap;
    private desc: egret.TextField;

    // private leftArrow: egret.Bitmap;
    // private rightArrow: egret.Bitmap;
    private share: egret.Bitmap;

    private stars: egret.Sprite;
    private card: egret.Sprite;

    private data;

    // private bg_list = ["", "ptbg", "goldbg", "diamondbg"];
    // private head_list = ["fun", "fail", "success"];

    constructor(data) {
        super();
        this.data = data;
        // this.cards = cardList;
        // this.index = index;
        // this.detail = Config.getInstance().card_tip[this.cards[this.index]];
        this.getRes();
    }

    private async getRes() {
        // this.sheet = await RES.getRes("card_pop_sheet");
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
        this.addChild(this.darkSprite)
        this.darkSprite.touchEnabled = true;


        this.card = new egret.Sprite();
        this.card.x = 360;
        this.card.y = 640;
        this.addChild(this.card);

        this.cardBg = new egret.Bitmap();
        this.cardBg.texture = RES.getRes("itemDialog_png")
        this.cardBg.anchorOffsetX = this.cardBg.width / 2;
        this.cardBg.anchorOffsetY = this.cardBg.height / 2;
        this.card.addChild(this.cardBg);

        // this.head = new egret.Bitmap();
        // this.head.y = -169.5;
        // this.card.addChild(this.head);

        // this.head_title = new egret.Bitmap();
        // this.head_title.x = -132.85;
        // this.head_title.y = -18 - 169.5;
        // this.card.addChild(this.head_title);

        // this.stage_text = new egret.TextField();
        // this.card.addChild(this.stage_text);

        this.card_name = new egret.TextField();
        this.card_name.y = -297;
        this.card_name.size = 40;
        this.card_name.text = this.data.name;
        this.card_name.textColor = 0x000000
        this.card_name.textAlign = egret.HorizontalAlign.CENTER;
        this.card_name.x = -this.card_name.width / 2;
        this.card.addChild(this.card_name);

        this.cardBmp = new egret.Bitmap();
        this.cardBmp.texture = RES.getRes(this.data.res);
        this.cardBmp.anchorOffsetX = this.cardBmp.width / 2;
        this.cardBmp.anchorOffsetY = this.cardBmp.height / 2;
        this.cardBmp.y = -100;
        this.card.addChild(this.cardBmp);

        this.desc = new egret.TextField();
        this.desc.text = this.data.desc;
        this.desc.textColor = 0x000000;
        this.desc.width = 400;
        this.desc.x = -200;
        this.desc.y = this.cardBmp.y + this.cardBmp.height - 100;
        this.desc.multiline = true;
        this.card.addChild(this.desc);


        // this.share = new TSBitmap("share", RES.getRes("pops_sheet"), true);
        // this.share.x = 320;
        // this.share.y = 758.9;
        // this.share.touchEnabled = true;
        // this.share.visible = platform.hasShareSDK();
        // this.addChild(this.share);

        // this.leftArrow = new TSBitmap("arrow_png");
        // this.leftArrow.x = 40;
        // this.leftArrow.y = 491;
        // this.leftArrow.touchEnabled = true;
        // this.addChild(this.leftArrow);

        // this.rightArrow = new TSBitmap("arrow_png");
        // this.rightArrow.scaleX = -1;
        // this.rightArrow.x = 600;
        // this.rightArrow.y = 491;
        // this.rightArrow.touchEnabled = true;
        // this.addChild(this.rightArrow);

        this.touchChildren = true;

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okTouched, this);
        // this.share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareTouched, this);
        // this.leftArrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leftArrowTouched, this);
        // this.rightArrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightArrowTouched, this);

        // if (this.cards.length === 1) {
        //     this.leftArrow.visible = false;
        //     this.rightArrow.visible = false;
        // } else {
        //     this.leftArrow.visible = true;
        //     this.rightArrow.visible = true;
        // }

        // this.updateView();

    }

    // private updateView() {


    //     this.cardBg.texture = this.sheet.getTexture(this.bg_list[this.detail.star]);
    //     this.head.texture = this.sheet.getTexture(this.head_list[this.detail.type] + "head")
    //     this.head.anchorOffsetX = this.head.width / 2;
    //     this.head.anchorOffsetY = this.head.height / 2;

    //     this.head_title.texture = this.sheet.getTexture(this.head_list[this.detail.type]);


    //     this.stage_text.x = -125.6
    //     this.stage_text.y = -178.35
    //     this.stage_text.text = "No." + this.detail.No;
    //     this.stage_text.width = 251.2;
    //     this.stage_text.textAlign = egret.HorizontalAlign.CENTER;

    //     this.card_name.x = -136.8
    //     this.card_name.y = -127
    //     this.card_name.text = I18nManager.getInstance().getLanguageByGroup(LanguageEnum.GROUP_CARD)[this.detail.No]["name"];
    //     this.card_name.width = 275.2;
    //     this.card_name.textColor = 0x000000
    //     this.card_name.textAlign = egret.HorizontalAlign.CENTER;

    //     this.cardBmp.texture = RES.getRes("card_sheet").getTexture(this.detail["No"] + "_" + this.detail.stage + "_" + this.detail.result);
    //     this.cardBmp.anchorOffsetX = this.cardBmp.width / 2;
    //     this.cardBmp.anchorOffsetY = this.cardBmp.height / 2;

    //     let hard_text = new egret.TextField();
    //     hard_text.x = -72.1;
    //     hard_text.y = 149.6;
    //     hard_text.text = I18nManager.getInstance().getLanguageByName("hard_level");
    //     hard_text.textColor = 0x000000
    //     this.card.addChild(hard_text);

    //     // this.head = new TSBitmap();
    //     this.stars = new egret.Sprite();
    //     let star: egret.Bitmap;
    //     for (var i = 0; i < this.detail.star; i++) {
    //         star = new TSBitmap("star", this.sheet);
    //         star.x = -11 + 28.4;
    //         star.y = -11;
    //         this.stars.addChild(star);
    //     }
    //     this.stars.x = 40.55;
    //     this.stars.y = 162.5;
    //     this.card.addChild(this.stars);


    //     if (this.index <= 0) {
    //         this.leftArrow.visible = false;
    //     }

    //     if (this.index >= this.cards.length - 1) {
    //         this.rightArrow.visible = false;
    //     }

    // }

    // private set id(id) {
    //     this._id = id;
    //     this.detail = Config.getInstance().card_tip[id];
    // }

    private okTouched(e: egret.TouchEvent) {
        UIManager.getInstance().closeCardPop();
    }

    private shareTouched() {
        // this.destroy();
        platform.share("老弟，你能帮我翘掉这堂课么？", "https://cdn.joypac.cn/skipschool/resource/share.jpg");
    }

    // private leftArrowTouched(e) {
    //     // let preCardId = DataController.getInstance().getPreCard(this._id);
    //     // if (preCardId !== -1) {
    //     //     this._id = preCardId;
    //     //     this.detail = Config.getInstance().card_tip[this._id];

    //     // }
    //     if (this.index - 1 < 0) {
    //         return;
    //     }
    //     this.index--;
    //     this.rightArrow.visible = true;
    //     this.detail = Config.getInstance().card_tip[this.cards[this.index]];
    //     this.updateView();
    // }

    // private rightArrowTouched(e) {

    //     if (this.index + 1 >= this.cards.length) {
    //         return;
    //     }
    //     this.index++;
    //     this.leftArrow.visible = true;
    //     this.detail = Config.getInstance().card_tip[this.cards[this.index]];
    //     this.updateView();
    // }

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