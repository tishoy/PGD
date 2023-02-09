/**
 * create by tishoy
 * 2018.10.1
 * 为了中国国际化地位，要做个强大的多语言适配
 */
class I18nManager {
    private static instance: I18nManager = null;

    private lang;

    constructor() {
        this.init();
    }

    private init(): void {
        if (I18nManager.instance !== null) {
            throw new Error("single instance error");
        }
        // this.lang = Config.getInstance().i18n;
    }

    public static getInstance(): I18nManager {
        if (this.instance === null) {
            this.instance = new I18nManager();
        }
        return this.instance;
    }

    public getLanguageInGroupByName(group, name) {
        return this.lang[SettingController.getInstance().Lang][group][name];
    }

    public getLanguageByGroup(group) {
        return this.lang[SettingController.getInstance().Lang][group];
    }

    public getLanguageByName(name) {
        return this.lang[SettingController.getInstance().Lang][name];
    }

    public get language() {
        return this.lang[SettingController.getInstance().Lang];
    }
}