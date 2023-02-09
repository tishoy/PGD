

class Button extends egret.Sprite implements UIInterface {
    constructor(config) {
        super();
        this.config = config;
    }

    protected config;
    _isCenterAnchor: boolean;

    initView(): void {
        this.setPosition(this.config);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playSound, this);
    }

    private playSound(e) {
        // if (SettingController.getInstance().SoundPlaying) {

        // }
        SoundManager.getInstance().playSound(SoundEnum.SELECTSOUND_MP3);
    }

    isCenterAnchor(): boolean {
        return this._isCenterAnchor;
    }

    setPosition(config): void {
        UIManager.getInstance().setUIPosition(this, this.config.type, this.config.x, this.config.y);
    }
}