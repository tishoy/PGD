class GameVO {
    private _id: number;
    private _name: string;
    private _stageWidth: number;
    private _stageHeight: number;
    private _stageAmount: number;
    private _res_url: string;
    private _cg: boolean;
    private _guide: boolean;
    private _select_pics: boolean;
    private _icon: string;
    private _cn_name: string;
    private _has_collection: boolean;
    private _game_ui = [];
    private _pops;
    private _collections = [];
    private _advertise;
    constructor(data) {
        for (var key in data) {
            this["_" + key] = data[key];
        }
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get stageWidth() {
        return this._stageWidth;
    }

    public get stageHeight() {
        return this._stageHeight;
    }

    public get stageAmount() {
        return this._stageAmount;
    }

    public get res_url() {
        return this._res_url;
    }

    public get select_pics() {
        return this._select_pics;
    }

    public get icon() {
        return this._icon;
    }

    public get cn_name() {
        return this._cn_name;
    }

    public get has_collection() {
        return this._has_collection;
    }

    public get pops() {
        return this._pops;
    }

    public get game_ui() {
        return this._game_ui;
    }

    public get cg() {
        return this._cg;
    }

    public get guide() {
        return this._guide;
    }

    public get advertise() {
        return this._advertise;
    }
}