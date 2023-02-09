/**
 * 通过资源显示图片
 * create by tishoy
 * 2018.8.14
 */

class TSBitmap extends egret.Bitmap {
    constructor(imgName: string, anchor = false) {
        super();
        this.init(imgName, anchor);
    }

    // private sheet;

    private init(imgName: string, centerAnchor = false) {
        if (RES.hasRes(imgName)) {
            this.texture = RES.getRes(imgName);
        }
        if (centerAnchor) {
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        }
    }
}