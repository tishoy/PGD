/**
 * 收集控制器
 * create by tishoy
 * 2020.7.6
 */
class CollectionController {

    static instance: CollectionController = null;

    private config;
    private saveData: SaveDataManager;

    private dataList: Array<number> = [];


    constructor() {
        this.init();
    }

    private init() {
        this.config = CollectionManager.getInstance().getCollectionList();
        this.saveData = SaveDataManager.getInstance();

    }

    public static getInstance(): CollectionController {
        if (this.instance === null) {
            this.instance = new CollectionController();
        }
        return this.instance;
    }

    public getCanCollectionCard() {
        let openCard = [];

        return openCard;
    }

    public getCollectionedCards(cardId) {
        let cardsAndIndx = {
            cards: [],
            index: 0
        }
        for (let i = 1; i < this.config.length; i++) {
            if (this.saveData["cardSave"][i] >= 3) {
                if (cardId === i) {
                    cardsAndIndx.index = cardsAndIndx.cards.length;
                }
                cardsAndIndx.cards.push(i);
            }
        }
        return cardsAndIndx;
    }

    public getCollectionedCardsNumber() {
        // let num = 0;
        // for (let i = 0; i < this.saveData["cardSave"].length; i++) {
        //     if (this.saveData["cardSave"][i] >= 3) {
        //         num++
        //     }
        // }
        // return num;
        return 0;
    }

    public cardShowHint(cardId) {
        // this.saveData.saveCardHintRead(cardId)
    }

    public newCardGot(cardId) {
        // let cardStatus = this.saveData.getCardStatus(cardId);
        // if (cardStatus < 3) {
        //     this.saveData.saveCardGot(cardId);
        //     return true
        // } else {
        //     return false;
        // }
    }

    // public getPreCard(id) {
    //     for (let i = id - 1; i >= 0; i--) {
    //         if (this.saveData["cardSave"][i] >= 3) {
    //             return i;
    //         }
    //     }
    //     return -1;
    // }

    // public getNextCard(id) {
    //     for (let i = id + 1; i < this.saveData["cardSave"].length; i++) {
    //         if (this.saveData["cardSave"][i] >= 3) {
    //             return i;
    //         }
    //     }
    //     return -1;
    // }

    /**
     * 未使用
     * @param stage 
     * @param result 
     */
    public getCardId(stage, result) {
        for (let i = 0; i < this.config.length; i++) {

        }
    }

    public randomCollection() {
        let index = Math.floor(Math.random() * this.config.length);
        return this.config[index];
    }

    public getCollectionByStageId(id) {
        let tempList = [];
        for (let i = 0; i < this.config.length; i++) {
            if (this.config[i].stage === id) {
                tempList.push(this.config[i]);
            }
        }
        let index = Math.floor(Math.random() * tempList.length);
        return tempList[index];
    }
} 
