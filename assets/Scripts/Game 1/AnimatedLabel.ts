import { _decorator, Component, Label, tween, Tween, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimatedLabel')
export class AnimatedLabel extends Component {
    @property(Label)
    label: Label = null;

    @property
    targetValue: number = 100;

    @property
    duration: number = 3.5;

    @property(Node)
    private audioSource: Node = null;

    private _tween: Tween<{ value: number }> | null = null;

    public animateLabel(to: number, duration: number) {
        const data = { value: 0 };

        if(this.audioSource != null) { this.audioSource.active = true; }

        this._tween?.stop();

        this._tween = tween(data)
            .to(duration, { value: to }, {
                onUpdate: () => {
                    this.label.string = `€ ${data.value.toFixed(0)}`;
                }
            })
            .start();

        if(this.audioSource != null) { this.audioSource.active = false; }
    }

    onDisable() {
        this._tween?.stop(); // Очистка при выключении компонента
    }
}
