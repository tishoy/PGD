/**
 * 引导控制器
 * create by tishoy
 * 2020.7.6
 */
class GuideController {

    static instance: GuideController = null;

    private _guidePassed;
    private _guideStep;
    private _showGuide = false;

    constructor() {
        this.init();
    }

    private init() {
        this._guideStep = 0;
        this._guidePassed = !SaveDataManager.getInstance().isNewPlayer;
    }

    public static getInstance(): GuideController {
        if (this.instance === null) {
            this.instance = new GuideController();
        }
        return this.instance;
    }

    public resetStep() {
        this._guideStep = 0;
    }

    public nextStep() {
        this._guideStep++;
    }

    public passGuide(stageId) {
        this._guidePassed = true;
        SaveDataManager.getInstance().passGuide(stageId);
    }

    public get guideStep() {
        return this._guideStep;
    }

    public get showGuide() {
        return !this._guidePassed && this._showGuide;
    }
}