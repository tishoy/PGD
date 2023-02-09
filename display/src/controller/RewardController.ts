class RewardController {
    static instance: RewardController = null;
    private rewardType: number = 0;
    private rewardList: Array<number> = [];
    private probability: Array<number> = [0];
    private positionList: Array<number> = [];
    private rotationList: Array<number> = [];
    private resList: Array<number> = [];
    private sumRate = 0;

    constructor() {
        this.initReward();
    }

    public static getInstance(): RewardController {
        if (this.instance === null) {
            this.instance = new RewardController();
        }
        return this.instance;
    }

    /**
     * 初始化奖励，用于展示给玩家
     */
    public initReward() {
        let rewardConfig = ConfigManager.getInstance().rewardConfigData;
        this.rewardType = rewardConfig.type;
        for (var i = 0; i < rewardConfig.reward.length; i++) {
            this.rewardList.push(rewardConfig.reward[i].type);
            this.positionList.push(rewardConfig.reward[i].position);
            this.sumRate += rewardConfig.reward[i].rate;
            this.probability.push(this.sumRate);
            this.resList.push(rewardConfig.reward[i].res);
            this.rotationList.push(rewardConfig.reward[i].rotation)
        }
    }

    /**
     * 获取随机奖励
     */
    public randomReward() {
        let result = Math.floor(Math.random() * this.sumRate);
        let reward = null;
        let id = this.probability.length - 1;
        for (var i = 0; i < this.probability.length - 1; i++) {
            if (result >= this.probability[i] && result < this.probability[i + 1]) {
                id = i;
                reward = this.rewardList[i];
            }
        }
        return id;
    }

    /**
     * 获取奖励
     */
    public getReward(rewardIndex) {
        if (rewardIndex < 0 || rewardIndex >= this.rewardList.length) {
            return;
        }
        let rewardType = this.rewardList[rewardIndex];
        switch (rewardType) {
            case RewardEnum.REWARD_STAGE_KEY:
                SaveDataManager.getInstance().addKeyTimes(1);
                SceneManager.getInstance().SelectScene.setStageNumber();
                break;

            case RewardEnum.REWARD_HINT:
                SaveDataManager.getInstance().addHintTimes(1);
                SceneManager.getInstance().SelectScene.setHintNumber();
                break;

            case RewardEnum.REWARD_COLLECTION:
                let rewardItem = CollectionController.getInstance().randomCollection();
                UIManager.getInstance().openItemGetPop("c" + rewardItem.res);
                SaveDataManager.getInstance().saveGotItem(rewardItem.res);
                break;
        }
        // SaveDataManager.getInstance().
    }

    /**
     * 双倍领取奖励
     */
    public doubleGetReward(rewardIndex) {
        if (rewardIndex < 0 || rewardIndex >= this.rewardList.length) {
            return;
        }
        let rewardType = this.rewardList[rewardIndex];
        switch (rewardType) {
            case RewardEnum.REWARD_STAGE_KEY:
                SaveDataManager.getInstance().addKeyTimes(1);
                SceneManager.getInstance().SelectScene.setStageNumber();
                break;

            case RewardEnum.REWARD_HINT:
                SaveDataManager.getInstance().addHintTimes(1);
                SceneManager.getInstance().SelectScene.setHintNumber();
                break;

            case RewardEnum.REWARD_COLLECTION:
                let rewardItem = CollectionController.getInstance().randomCollection();
                UIManager.getInstance().openItemGetPop("c" + rewardItem.res);
                SaveDataManager.getInstance().saveGotItem(rewardItem.res);
                break;
        }
    }

    /**
     * 奖励次数控制
     */
    public rewardTimesControl() {

    }

    public getRes() {
        return this.resList;
    }

    public getPosition() {
        return this.positionList;
    }

    public getRotation(index) {
        return this.rotationList[index]
    }
}