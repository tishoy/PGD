/**
 * create by tishoy
 * 2020.7.9
 * 关卡接口
 */

interface UIInterface extends egret.DisplayObjectContainer {

    _isCenterAnchor: boolean;
    initView(config): void;
    isCenterAnchor(): boolean;
    setPosition(config): void;

}