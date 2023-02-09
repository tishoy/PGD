/**
 * 数据场景  图片展示
 * create by tishoy
 * 2018.8.10
 * 微信版本先不用
 */


class CollectionScene extends egret.DisplayObjectContainer {

    constructor(egretStage: egret.Stage) {
        super();
        this.initData();
        this.initView(egretStage);
    }

    private backBtn: egret.Bitmap;
    private title: egret.Bitmap;

    private cardView: egret.Sprite;
    private cards = [];
    private itemSave;
    private itemData;

    initData() {
        this.itemSave = SaveDataManager.getInstance().getCollections();
        this.itemData = CollectionManager.getInstance().getCollectionList();
    }

    update() {
        this.itemSave = SaveDataManager.getInstance().getCollections();
        for (let i = 0; i < this.cards.length; i++) {
            if (this.itemSave.indexOf(this.itemData[i].res) === -1) {
            } else {
                this.cards[i].showItem();
                this.cards[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.vedioGetCard, this);
                this.cards[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.cardTouched, this);
            }
        }
    }

    initView(stage) {

        let bg = new egret.Bitmap();
        bg.texture = RES.getRes("back_item_png");
        this.addChild(bg);

        this.backBtn = new egret.Bitmap();
        this.backBtn.texture = RES.getRes("returnBtn_png");
        this.backBtn.x = 50;
        this.backBtn.y = 50;
        this.backBtn.touchEnabled = true;
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backBtnTouched, this)
        this.addChild(this.backBtn);

        this.title = new egret.Bitmap();
        this.title.texture = RES.getRes("libraryHeadFrame_png")
        this.title.x = Util.curWidth() / 2 - this.title.width / 2;
        this.title.y = 50;
        this.addChild(this.title);

        let title_text = new egret.TextField();
        title_text.text = "道具图鉴";
        title_text.size = 40;
        title_text.x = this.title.x + this.title.width / 2 - title_text.width / 2;
        title_text.y = this.title.y + this.title.height / 2 - title_text.height / 2;
        this.addChild(title_text);



        this.cardView = new egret.Sprite();
        let card: ItemPicView;
        this.cards = [];
        for (let i = 0; i < this.itemData.length; i++) {
            card = new ItemPicView();
            card.x = (i % 4) * 160;
            card.y = Math.floor(i / 4) * 160;
            this.cardView.addChild(card);
            card.touchEnabled = true;
            card.touchChildren = false;
            card["data"] = this.itemData[i];
            card.setItem(this.itemData[i].res);
            if (this.itemSave.indexOf(this.itemData[i].res) === -1) {
                card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.vedioGetCard, this);
            } else {
                card.showItem();
                card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cardTouched, this);
            }
            this.cards.push(card);
        }
        this.cardView.x = Util.curWidth() / 2 - this.cardView.width / 2;
        this.cardView.y = 150;
        this.addChild(this.cardView);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);

        // this.x = ScreenAdaptManager.getInstance().fixedWidth;
        this.y = ScreenAdaptManager.getInstance().fixedHeight;
    }

    private onAdd(e) {
        SceneManager.getInstance().hideLoading();
        this.update();
    }

    private cardTouched(e) {
        let item = e.target;
        UIManager.getInstance().openCardPop(item.data);
    }

    private vedioGetCard(e) {
        let item = e.target as ItemPicView;
        let res = item.res;
        AdvertiseManager.getInstance().vedioPlay(() => {

        }, (isFinished) => {
            if (isFinished) {
                SaveDataManager.getInstance().saveGotItem(res);
                SceneManager.getInstance().currentScene.update();
            }
        });
    }

    private backBtnTouched(e) {
        SceneManager.getInstance().toSelectScene();
    }

}