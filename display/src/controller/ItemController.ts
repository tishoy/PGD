/**
 * 
 */

class ItemController {

    static instance: ItemController = null;

    private itemList: Array<number> = [];


    constructor() {
    }

    public static getInstance(): ItemController {
        if (this.instance === null) {
            this.instance = new ItemController();
        }
        return this.instance;
    }

    public hasItem(item: number) {
        let result = false
        for (let i = 0; i < this.itemList.length; i++) {
            if (this.itemList[i] === item) {
                result = true;
                break;
            }
        }
        return result;
    }

    public addItem(item, pop: boolean = true) {
        if (this.itemList.length === 5) {
            UIManager.getInstance().showItemFullTip();
            // Dispatch full_event;
            return false;
        } else {
            if (this.hasItem(item.id)) {
                return false;
            } else {
                SaveDataManager.getInstance().saveGotItem(item.res);
                this.itemList.push(item.id);
                if (pop) {
                    UIManager.getInstance().openItemGetPop(item.res);
                }
                ItemCtrlView.getInstance().updateItems();
                return true;
            }
        }

    }

    public useItem(id: number) {
        if (this.hasItem(id)) {
            this.itemList.splice(this.getIndexOf(id), 1);
            ItemCtrlView.getInstance().updateItems();
            return true;
        }
        return false;
    }

    public getItem(id: number) {
        return this.itemList[id];
    }

    public resetList() {
        ItemCtrlView.getInstance().cancelItemCurrentDrag();
        this.itemList = [];
        ItemCtrlView.getInstance().updateItems();
    }

    public getItemList() {
        return this.itemList;
    }

    public getIndexOf(id: number) {
        var index = -1;
        for (var i = 0; i < this.itemList.length; i++) {
            if (this.itemList[i] === id) {
                index = i
                break;
            }
        }
        return index;
    }
}