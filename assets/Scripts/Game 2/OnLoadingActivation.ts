import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('OnLoadingActivation')
export class OnLoadingActivation extends Component {
    @property(Node)    private activationObj: Node = null;
    @property(Number)  private timer: number = 0.5;

    onLoad() {
        this.scheduleOnce(() => {
            this.activationObj.active = true;
        }, this.timer);
    }
}


