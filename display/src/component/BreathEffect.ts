/**
 * create by tishoy
 * 2018.8.20
 */

class BreathEffect extends egret.EventDispatcher {
    private _target: egret.DisplayObject;
    private _time: number;

    private _currTime: number;

    public constructor(target: egret.DisplayObject, time: number, isAuto: boolean = true) {
        super();
        this._target = target;
        this._target.anchorOffsetX = this._target.width / 2;
        this._target.anchorOffsetY = this._target.height / 2;
        this._time = time;

        if (isAuto) {
            this.start();
        }
    }
    public start(): void {
        this._currTime = egret.getTimer();
        this._target.addEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
    }

    private runDown(e: egret.Event): void {
        this._target.scaleX -= 0.01;
        this._target.scaleY -= 0.01;
        if (this.checkOver()) {
            return;
        }
        if (this._target.scaleX <= 1) {
            this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
            this._target.addEventListener(egret.Event.ENTER_FRAME, this.runUp, this);
        }
    }

    private runUp(e: egret.Event): void {
        this._target.scaleX += 0.01;
        this._target.scaleY += 0.01;
        if (this.checkOver()) {
            return;
        }
        if (this._target.scaleX >= 1.05) {
            this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runUp, this);
            this._target.addEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
        }
    }

    private checkOver(): boolean {
        if (this._time === -1) {
            return false
        }
        var nowTime: number = egret.getTimer();
        if (nowTime - this._currTime >= this._time) {
            this.destroy();
            return true;
        }
        return false;
    }

    public destroy(): void {
        this._target.scaleX = 1;
        this._target.scaleY = 1;
        this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runDown, this);
        this._target.removeEventListener(egret.Event.ENTER_FRAME, this.runUp, this);

        this.dispatchEventWith(egret.Event.COMPLETE, false, this._target);

        this._target = null;
    }
}