/**
 * 物品类
 * create by tishoy
 * 2018.8.9
 */


class Item extends egret.Bitmap {
    private item_name;
    private png;
    constructor(name = "") {
        super();
        this.item_name = name;
        this.png = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        this.png.texture = texture;
        // this.png.width = this.png.width * 101 / 250;
        // this.png.height = this.png.height * 101 / 250;
        // this.png.x = this.png.x;
        // this.png.y = this.png.y;
        // this.png.touchEnabled = true;
    }

    public getName() {
        return this.item_name;
    }
}