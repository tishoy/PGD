/**
 * 声音管理
 * create by tishoy
 * 2018.8.8
 */

class SoundManager {

    private static instance: SoundManager = null;

    private config;

    private bgm: egret.Sound;

    private bgmChannel: egret.SoundChannel;
    private soundChannel: egret.SoundChannel;

    private bgmPlaying: boolean = false;

    private map: { [key: string]: egret.Sound; };

    constructor() {
        this.init();
    }

    private init(): void {
        if (SoundManager.instance !== null) {
            throw new Error("single instance error");
        }
    }

    public static getInstance(): SoundManager {
        if (this.instance === null) {
            this.instance = new SoundManager();
        }
        return this.instance;
    }

    playBGM() {
        if (SettingController.getInstance().SoundPlaying && !this.bgmPlaying) {
            this.bgm = RES.getRes(SoundEnum.MAIN1SOUND_1_MP3);
            if (this.bgm === undefined || this.bgm === null) {
                return;
            }
            this.bgmChannel = this.bgm.play(0, 0);
            this.bgmPlaying = true;
        }
    }



    playSound(sound_res, loop: number = 1) {
        if (SettingController.getInstance().SoundPlaying) {
            let sound: egret.Sound = RES.getRes(sound_res);
            if (sound === undefined || sound === null) {
                return;
            }
            this.soundChannel = sound.play(0, loop);
        }
    }

    private onPlayOver() {
        // this.map[sound_res] = null;
    }

    public stopBGM(): void {
        if (this.bgmPlaying) {
            this.bgmChannel.stop();
            this.bgmPlaying = false;
        }
        if (this.soundChannel !== undefined) {
            this.soundChannel.stop();
        }
    }
}