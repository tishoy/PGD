/**
 * 道具图鉴
 */
class ItemPicView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private item;
    public res;

    initView() {


        this.item = new egret.Bitmap();
        this.item.x = 0;
        this.item.y = 0;
        this.item.texture = RES.getRes("collection_video_btn_png");
        this.addChild(this.item);
    }

    setItem(res) {
        this.res = res;
    }


    showItem() {
        let bg = new egret.Bitmap();
        bg.texture = RES.getRes("itemFrame_png");
        this.addChildAt(bg, this.getChildIndex(this.item));

        this.item.texture = RES.getRes("c" + this.res);
        this.item.scaleX = 0.4;
        this.item.scaleY = 0.4;
        this.item.x = 25;
        this.item.y = 25;
    }
}