import { _decorator, Component, Label, tween, Tween, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimatedCoinsLabel')
export class AnimatedCoinsLabel extends Component {
    @property(Label)
    label: Label = null;

    @property
    targetValue: number = 100; // Конечное значение

    @property
    duration: number = 0.75; // Длительность анимации в секундах

    @property(Node)
    private audioSource: Node = null;

    private _tween: Tween<{ value: number }> | null = null;

    onEnable() {
        this.animateLabel(this.targetValue, this.duration);
    }

    animateLabel(to: number, duration: number) {
        const data = { value: 0 };

        this._tween?.stop(); // Остановить предыдущую анимацию, если есть

        if(this.audioSource != null) { this.audioSource.active = true; }

        this._tween = tween(data)
            .to(duration, { value: to }, {
                onUpdate: () => {
                    // Обновляем текст на каждом кадре
                    this.label.string = `€ ${data.value.toFixed(2)}`;
                }
            })
            .start();
        
        if(this.audioSource != null) { this.audioSource.active = false; }
    }

    onDisable() {
        this._tween?.stop(); // Очистка при выключении компонента
    }
}
