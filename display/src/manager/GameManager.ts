
/**
 * 游戏管理器
 * create by tishoy
 * 2020.7.1
 */
class GameManager {

    private games: Array<GameVO> = [];
    private _game = 1;

    private static instance: GameManager = null;


    constructor() {
        this.init();
    }

    private init(): void {
        if (GameManager.instance !== null) {
            throw new Error("single instance error");
        }
    }

    public static getInstance(): GameManager {
        if (this.instance === null) {
            this.instance = new GameManager();
        }
        return this.instance;
    }

    setGames(id) {
        this._game = id;
        let config = ConfigManager.getInstance().gameConfigData;
        for (var i = 0; i < config.games.length; i++) {
            if (config.games[i] === null) {
                this.games.push(null);
                continue;
            } else {
                let vo = new GameVO(config.games[i]);
                this.games.push(vo);
            }
        }
        ResourceManager.getInstance().setGameResURL();
    }

    get game() {
        return this._game;
    }

    getGameConfig() {
        return this.games[this._game];
    }
}