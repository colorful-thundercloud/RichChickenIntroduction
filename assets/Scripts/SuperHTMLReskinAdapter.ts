import { _decorator, Component, Node } from 'cc';
import super_html_playable from './super_html_playable';

const { ccclass, property } = _decorator;

@ccclass('SuperHTMLReskinAdapter')
export class SuperHTMLReskinAdapter extends Component 
{
    @property linkActive: boolean = true;

    onClick()
    {
        let linkUse = window.LINKACTIVE === undefined ? this.linkActive : window.LINKACTIVE;
        if (!linkUse) return;

        super_html_playable.game_end();
        super_html_playable.download();
    }
}


