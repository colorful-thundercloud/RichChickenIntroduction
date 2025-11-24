import { _decorator, Component, Label, Node, tween } from 'cc';
import { GeoAdapter } from '../GeoAdapter';
const { ccclass, property } = _decorator;

@ccclass('MoneyIncomer')
export class MoneyIncomer extends Component {

    @property(Label) money: Label = null;
    @property(GeoAdapter) geoAdapter: GeoAdapter = null;

    private currentMoney: number = 0;

    public addMoney(amount: number, duration: number = 0.5) {
        const startValue = this.currentMoney;
        const endValue = this.currentMoney + amount;

        tween({ value: startValue })
            .to(duration, { value: endValue }, {
                onUpdate: (obj) => {
                    this.currentMoney = obj.value;
                    if (this.money) {
                        this.money.string = this.currentMoney.toFixed(2) + this.geoAdapter.getValutStr();
                    }
                }
            })
            .call(() => {
                this.currentMoney = parseFloat(this.currentMoney.toFixed(2));
                this.money.string = this.currentMoney.toFixed(2) + this.geoAdapter.getValutStr();
            })
            .start();
    }
}

