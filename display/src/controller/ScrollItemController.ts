/**
 * 滚动控制器
 */
class ScrollItemController {
    static instance: ScrollItemController = null;

    private itemList: Array<number> = [];


    constructor() {
    }

    public static getInstance(): ScrollItemController {
        if (this.instance === null) {
            this.instance = new ScrollItemController();
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

    public addItem(item) {
        if (this.hasItem(item.id)) {
            return false;
        } else {
            this.itemList.push(item.id);

            ScrollCtrlView.getInstance().updateItems();
            return true;
        }

    }

    public useItem(id: number) {
        if (this.hasItem(id)) {
            this.itemList.splice(this.getIndexOf(id), 1);
            ScrollCtrlView.getInstance().updateItems();
            return true;
        }
        return false;
    }

    public getItem(id: number) {
        return this.itemList[id];
    }

    public resetList() {
        ScrollCtrlView.getInstance().cancelItemCurrentDrag();
        this.itemList = [];
        ScrollCtrlView.getInstance().updateItems();
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