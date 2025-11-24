import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WorldTimer')
export class WorldTimer extends Component {
    @property(Number)         private startMinutes: number = 40;
    @property(Number)         private startSeconds: number = 0;
    @property([Label])        private timers: Label[] = [];

    private nowMinutes: number = 0;
    private nowSeconds: number = 0;

    start() {
        this.nowMinutes = this.startMinutes;
        this.nowSeconds = this.startSeconds;
        this.schedule(this.reduceTimer, 1);
    }

    private reduceTimer() {
        if(this.nowSeconds <= 0) {
            if(this.nowMinutes > 0) {
                this.nowMinutes -= 1;
                this.nowSeconds = 59;
            } else {
                console.warn("[WorldTimer]: timed out, download this game!!! Are user lost in UI???");
            }
        } else {
            this.nowSeconds -= 1;
        }
        this.updateTimers();
    }

    private updateTimers() {
        const minStr = ('0' + this.nowMinutes).slice(-2);
        const secStr = ('0' + this.nowSeconds).slice(-2);

        this.timers.forEach((label) => {
            label.string = `${minStr}:${secStr}`;
        });
    }

}


