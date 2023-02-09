
/**
 * 
 */
class CollectionManager {
    private static instance: CollectionManager = null;

    private collections = [];

    constructor() {
        this.init();
    }

    private init() {

    }

    public static getInstance(): CollectionManager {
        if (this.instance === null) {
            this.instance = new CollectionManager();
        }
        return this.instance;
    }

    public getCollectionList() {
        return ConfigManager.getInstance().collectionConfigData.data;
    }

}