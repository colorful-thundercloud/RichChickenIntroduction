import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import playable from "./super_html_playable"; 

@ccclass('supetHtmlController')
export class supetHtmlController extends Component {
    @property linkActive: boolean = false;

    start() {

    }

    public gameEnd() {
        let linkUse = window.LINKACTIVE === undefined ? this.linkActive : window.LINKACTIVE;
        if (!linkUse) return;
        playable.game_end();
    }

    public downLoad() {
        let linkUse = window.LINKACTIVE === undefined ? this.linkActive : window.LINKACTIVE;
        if (!linkUse) return;
        playable.download();
    }
}

