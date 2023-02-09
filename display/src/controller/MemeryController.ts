/**
 * 临时存档
 */
class MemeryController {

    static instance: MemeryController = null;

    constructor() {
        this.init();
    }

    public static getInstance(): MemeryController {
        if (this.instance === null) {
            this.instance = new MemeryController();
        }
        return this.instance;
    }

    interstitialMemery = 0;

    rewardMemery = 0;
    retryMemery = [];

    init() {
        for (var i = 0; i < StageController.getInstance().stageAmount; i++) {
            this.retryMemery.push(2);
        }

    }


    addInterstitialShow(paramete) {
        console.log(paramete);
        console.log("是否显示广告" + this.interstitialMemery % paramete)
        this.interstitialMemery++;
        return this.interstitialMemery % paramete === 0;
    }

    getRewardTimes() {
        return this.rewardMemery--;
    }

    addRewardTimesByTime() {

    }

    /**
     * 执行一次retry
     * @param stageId 
     */
    recordRetry() {
        let stageId = StageController.getInstance().getCurrentSelected();
        if (this.retryMemery[stageId] > 0) {
            this.retryMemery[stageId]--;
            return true;
        }
        return false;
    }

    getRetryTimes() {
        let stageId = StageController.getInstance().getCurrentSelected();
        return this.retryMemery[stageId];
    }
}