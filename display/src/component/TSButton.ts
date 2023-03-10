/**
 * 图片button类
 * create by tishoy
 * 2018.8.13
 */

class TSButton extends egret.DisplayObjectContainer {

    private textField: egret.TextField;
    private assets: egret.SpriteSheet = RES.getRes("assets");//名称不一样的话需要修改
    private btnImg: egret.Bitmap;
    private backFun: Function;
    private isPlayCartoon: Boolean = false;
    private cartoonType: number = 1;
    private param = { context: null, data: null };//回调参数

    //新增功能
    private cdEffect: TSEffect.CooldownEffect;
    _cooldownTime: number = 0;
    /**
    * imgName       图片
    * backFun       点击方法 如果需要在backFun中使用this的，小心使用这个
    * descStr       按钮描述
    * fontSize      字体大小
    * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
    * 注意：如果有动画的话，只有动画结束才会触发click事件
    */
    public constructor(context: any, imgName: string, assetsName: string = "assets", backFun: Function = null, descStr: string = "", fontSize: number = 30, cartoonType: number = 1) {
        super();
        this.param.context = context;
        this.init(imgName, backFun, descStr, fontSize, cartoonType, assetsName);
    }

    private init(imgName: string, backFun: Function = null, descStr: string = "", fontSize: number = 30, cartoonType: number = 1, assetsName: string = "assets"): void {
        this.cartoonType = cartoonType;
        this.backFun = backFun;
        this.btnImg = new egret.Bitmap();
        if (assetsName != "assets") {
            this.assets = RES.getRes(assetsName);
        }
        this.btnImg.texture = this.assets.getTexture(imgName);
        this.addChild(this.btnImg);

        if (descStr != "") {
            this.textField = new egret.TextField();
            this.addChild(this.textField);
            this.textField.size = fontSize;
            this.textField.textAlign = "center";
            this.textField.stroke = 1;
            this.textField.strokeColor = 0x000000;
            this.textField.text = descStr;
            this.textField.width = this.btnImg.width;
            this.textField.x = this.btnImg.width / 2 - this.textField.width / 2;
            this.textField.y = this.btnImg.height / 2 - this.textField.height / 2;
        }
        this.touchEnabled = true;

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbuttonTouchTap, this);
    }

    private onbuttonTouchTap(e): void {
        if (this.isPlayCartoon) {
            return;
        }
        this.isPlayCartoon = true;
        var onComplete2: Function = function () {
            this.isPlayCartoon = false;
        };
        var onComplete1: Function = function () {
            if (this.cartoonType == 1) {
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
            } else if (this.cartoonType == 2) {
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
            } else if (this.cartoonType == 3) {
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 100).call(onComplete2, this);
            }
        };
        egret.Tween.get(this).to({ scaleX: 0.5, scaleY: 0.5, x: this.x + this.btnImg.width / 4, y: this.y + this.btnImg.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);

        egret.setTimeout(function () {
            if (this.backFun != null) {
                this.backFun.apply(this.param.context, [this.param.data]);
            }
        }, this, 300);
    }


    private onClick(e: egret.TouchEvent): void {
        this.cdEffect.start(this._cooldownTime);
        this.touchEnabled = false;
    }

    private initCooldownEffect(): void {
        if (this.cdEffect == null) {
            this.cdEffect = new TSEffect.CooldownEffect(this.width, this.height);
            this.addChild(this.cdEffect);
            this.cdEffect.addEventListener(TSEffect.CooldownEffect.COOLDOWN_END, this.onCDEnd, this);
        }
    }

    private onCDEnd(e: Event): void {
        this.touchEnabled = true;
    }


    public get cooldownTime(): number {
        return this._cooldownTime;
    }

    public set cooldownTime(value: number) {
        if (this._cooldownTime == value) {
            return;
        }
        this._cooldownTime = value;
        if (this._cooldownTime > 0) {
            this.initCooldownEffect();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
        else {
            if (this.cdEffect) {
                if (this.cdEffect.parent) {
                    this.removeChild(this.cdEffect);
                }
                this.cdEffect.removeEventListener(TSEffect.CooldownEffect.COOLDOWN_END, this.onCDEnd, this);
                this.cdEffect = null;
            }
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
    }

    public startCooldown(time: number = 0): void {
        this.initCooldownEffect();
        this.cdEffect.start(time);
        this.touchEnabled = false;
    }

    //设置绑定数据
    public setBindData(data): void {
        this.param.data = data;
    }

    //获取绑定数据
    public getBindData(): any {
        return this.param.data;
    }

    public getBitmap(): egret.Bitmap {
        return this.btnImg;
    }
}
