class HintController {

    static instance: HintController = null;

    private dataList: Array<number> = [];
    public Hints = [];

    constructor() {
        this.init();
    }

    init() {
    }

    public static getInstance(): HintController {
        if (this.instance === null) {
            this.instance = new HintController();
        }
        return this.instance;
    }

    public getStageHintStatus() {

    }

    // public setNewStageHintStatus(stage, id) {

    // }

    public setStageHintStatus(stage) {
        SaveDataManager.getInstance().saveStageHintRead(stage);
    }

    public setCardHintStatus(card) {
        // SaveDataManager.getInstance().saveCardHintRead(card);
    }

} 
