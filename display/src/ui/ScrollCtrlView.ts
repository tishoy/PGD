/**
 * 以下示例演示了 ScrollView 滚动组件的使用。
 */
class ScrollCtrlView extends egret.DisplayObjectContainer implements UIInterface {

    private drag: egret.Bitmap = new egret.Bitmap();
    private dragId;

    private egretStage: egret.Stage;
    private static instance: ScrollCtrlView;
    private scrollView: egret.ScrollView;

    constructor(egretStage: egret.Stage) {
        super();
        this.egretStage = egretStage;
        this.initView();
    }

    static getInstance(egretStage: egret.Stage = null) {
        if (this.instance === null) {
            this.instance = new ScrollCtrlView(egretStage);
        } else {
            if (egretStage != null && this.instance.egretStage === null) {
                this.instance.egretStage = egretStage;
            }
        }
        return this.instance;
    }


    initView() {
        // 通过表 读取item 位置信息  并且注册item  registItem
        var container = new egret.Sprite();

        // TODO

        this.scrollView = new egret.ScrollView();

        //设置滚动内容
        this.scrollView.setContent(container);
        //设置滚动区域宽高
        // this.scrollView.width = 100;
        // this.scrollView.height = 100;
        this.addChild(this.scrollView);
    }

    updateItems() {

    }


    _isCenterAnchor: boolean;

    isCenterAnchor(): boolean {
        return true;
    }

    setPosition(config): void {
        UIManager.getInstance().setUIPosition(this, config.type, config.x, config.y);
    }


    public getItem(id): egret.Bitmap {
        return this['item' + id];
    }

    public cancelItemCurrentDrag(): void {
        if (this.dragId !== -1) {
            this.drag.visible = false;
            this.dragId = -1;
        }
    }
}