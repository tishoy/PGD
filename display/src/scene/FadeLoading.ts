class FadeLoading extends egret.DisplayObjectContainer {
    constructor() {
        super();
    }



    private fadeOut() {
        let renderTexture = new egret.RenderTexture();
        let bmpData = new egret.BitmapData(SceneManager.getInstance().currentScene);
        let textrue = new egret.Texture();
        textrue.bitmapData = bmpData;
        textrue.getPixels(0, 0, 20, 20);
        let bmp = new egret.Bitmap();
        // bmp.setImageData(bmpData, 0, 0, 20, 20, 0, 0, 20, 20, 20, 20);
    }

    private fadeIn() {

    }
}