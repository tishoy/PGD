/**
 * 物品控制栏
 * create by tishoy
 * 2018.8.7
 */

class ItemCtrlView extends egret.Sprite implements UIInterface {
    static instance = null;

    public scene;
    private egretStage: egret.Stage;
    private container: egret.Sprite;

    private config;
    // private dragHand: egret.Bitmap;

    constructor(egretStage: egret.Stage) {
        super();
        this.egretStage = egretStage;
    }

    static getInstance(egretStage: egret.Stage = null) {
        if (this.instance === null) {
            this.instance = new ItemCtrlView(egretStage);
        } else {
            if (egretStage != null && this.instance.egretStage === null) {
                this.instance.egretStage = egretStage;
            }
        }
        return this.instance;
    }

    setConfig(config) {
        this.config = config;
        this.initView();
    }

    private item0: egret.Bitmap;
    private item1: egret.Bitmap;
    private item2: egret.Bitmap;
    private item3: egret.Bitmap;
    private item4: egret.Bitmap;
    private bgs: egret.Bitmap;

    initView() {

        this.container = new egret.Sprite();
        this.addChild(this.container);



        this.addChild(this.drag);
        this.drag.visible = false;

        this.bgs = new TSBitmap(ResEnum.ITEM_CTRL_PNG);
        this.touchEnabled = true;
        this.container.addChild(this.bgs);

        this.scaleX = this.scaleY = ScreenAdaptManager.scaleRate();

        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;

        // this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
        //     if (AdvertiseManager.getInstance().bannerOK) {
        //         UIManager.getInstance().setUIPosition(this, this.config.type, this.config.x, this.bgs.height / 2 - this.height / 2 + this.config.y + AdvertiseManager.getInstance().bannerHeight - ScreenAdaptManager.getInstance().fixedHeight);
        //     } else {
        UIManager.getInstance().setUIPosition(this, this.config.type, this.config.x, this.bgs.height / 2 - this.height / 2 + this.config.y);
        //     }
        // }, this);
    }

    public updateItems() {
        let items = ItemController.getInstance().getItemList();
        for (let i = 0; i < 5; i++) {
            if (i < items.length) {
                if (this['item' + i] === undefined || this['item' + i] === null) {
                    this['item' + i] = new egret.Bitmap();
                }
                this['item' + i].texture = RES.getRes(StageController.getInstance().parse.items[items[i]].res);
                this['item' + i].name = StageController.getInstance().parse.items[items[i]].res;
                this['item' + i].id = items[i];
                this['item' + i].width = 115;
                this['item' + i].height = 115;
                this['item' + i].x = i * 127 + 45;
                this['item' + i].y = 18;
                this['item' + i].visible = true;
                this['item' + i].touchEnabled = true;
                this['item' + i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onItemTouchBegin, this);
                this.container.addChild(this['item' + i]);
            } else {
                if (this['item' + i] !== undefined && this['item' + i] !== null) {
                    if (this['item' + i].parent === this.container) {
                        this.container.removeChild(this['item' + i])
                        this['item' + i] = null;
                    }
                }
            }

        }
        // Tween 减少到 广告的高度
        // if (items.length >= 1) {
        //     egret.Tween.get(this.container, {
        //         loop: false
        //     }).to({ y: Util.displayHeight() - 120 }, 1000)
        //     // }).to({ y: Util.curHeight() / 2 + Util.displayHeight() / 2 - 120 }, 1000)
        // } else if (items.length === 0) {
        //     egret.Tween.get(this.container, {
        //         loop: false
        //     }).to({ y: Util.displayHeight() }, 1000)
        //     // }).to({ y: Util.curHeight() / 2 + Util.displayHeight() / 2 }, 1000)
        // }
    }

    private onFireOpend() {

    }

    // private onItemTouchBegin(e: egret.TouchEvent) {
    //     e.target.visible = false;
    // }

    public addItem(item: Item) {
        this.container.addChild(item);
    }


    public useItem(id): void {
        this['item' + id] = null;
        this.container.removeChild(this['item' + id]);
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

    public cancelItem(id): void {
        let index = ItemController.getInstance().getIndexOf(id);
        if (this['item' + index]) {
            this['item' + index].visible = true;
        }
    }

    private drag: egret.Bitmap = new egret.Bitmap();
    private dragId;

    private onItemTouchBegin(e: egret.TouchEvent) {
        e.target.visible = false;
        this.drag.texture = RES.getRes(e.target.name);
        // RES.getRes(e.target.name);
        // this.drag = e.target;
        this.drag.width = this.drag.height = 100 * ScreenAdaptManager.scaleRate();
        this.drag.anchorOffsetX = this.drag.width / 2;
        this.drag.anchorOffsetY = this.drag.height / 2;
        // this.drag.anchorOffsetX = this.drag.anchorOffsetY = 125;
        this.dragId = e.target.id;
        this.drag.x = this.globalToLocal(e.stageX).x;
        this.drag.y = this.globalToLocal(0, e.stageY).y;
        this.drag.visible = true;
        // this.egretStage.touchEnabled = true;
        this.egretStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onItemTouchMove, this);
        this.egretStage.addEventListener(egret.TouchEvent.TOUCH_END, this.onItemTouchEnd, this);
    }

    private onItemTouchMove(e: egret.TouchEvent) {
        this.drag.x = this.globalToLocal(e.stageX).x;
        this.drag.y = this.globalToLocal(0, e.stageY).y;
    }

    private onItemTouchEnd(e: egret.TouchEvent) {
        // this.egretStage.touchEnabled = false;
        this.egretStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onItemTouchMove, this);
        this.egretStage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onItemTouchEnd, this);

        if ((SceneManager.getInstance().currentScene as GameScene).getCurrentStage().useItem(this.dragId, e.stageX, e.stageY)) {
            ItemController.getInstance().useItem(this.dragId)
        } else {
            this.cancelItem(this.dragId);
        }
        this.drag.visible = false;
        this.dragId = -1;
    }

    // public showDragGuide(targetX, targetY) {
    //     if (GuideController.getInstance().guideStep === 1) {
    //         let p: egret.Point = this.localToGlobal(this.container.x + this.item0.x - Util.x_fix(), this.container.y + this.item0.y - Util.y_fix());
    //         this.dragHand.x = p.x;
    //         this.dragHand.y = p.y;
    //         this.dragHand.visible = true;
    //         egret.Tween.get(this.dragHand, { loop: true }).to({ x: targetX - Util.x_fix(), y: targetY - Util.y_fix() }, 2000);
    //     }
    // }

    // public hideDragGuide() {
    //     egret.Tween.removeTweens(this.dragHand);
    // }

    public finishDragGuide() {
        GuideController.getInstance().nextStep();
    }

    public get currentDragId() {
        if (this.dragId === undefined) {
            this.dragId = -1;
        }
        return this.dragId;
    }

    _isCenterAnchor: boolean;
    isCenterAnchor(): boolean {
        return this._isCenterAnchor;
    }

    setPosition(config = this.config): void {
        UIManager.getInstance().setUIPosition(this, config.type, config.x, config.y);
        // if (AdvertiseManager.getInstance().bannerOK) {
        //     UIManager.getInstance().setUIPosition(this, config.type, config.x, config.y + AdvertiseManager.getInstance().bannerHeight - ScreenAdaptManager.getInstance().fixedHeight);
        // } else {
        //     UIManager.getInstance().setUIPosition(this, config.type, config.x, config.y);
        // }


    }


}