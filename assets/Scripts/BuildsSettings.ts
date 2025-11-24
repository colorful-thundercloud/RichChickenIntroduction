import { _decorator, Component, Node } from 'cc';

declare global {
    interface Window {
        LINKACTIVE?: boolean;
    }
}

const { ccclass, property } = _decorator;

@ccclass('BuildsSettings')
export class BuildsSettings extends Component {

    @property addIronStr: boolean = false;

    @property([Node]) ironsLabel: Node[] = [];

    start() {
        this.ironsLabel.forEach((ir) => ir.active = this.addIronStr);
    }
}

