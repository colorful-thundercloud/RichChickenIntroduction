import { _decorator, Component, Node, tween, Vec3, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CarTweenMover')
export class CarTweenMover extends Component {
    @property
    startY: number = 1000;

    @property
    endY: number = 0;

    @property
    moveTime: number = 5;

    @property
    barrierY: number = 650;

    @property(AudioSource)
    audioSource: AudioSource = null;

    public onZoneStateChange: ((inZone: boolean) => void) | null = null;
    private barrierActive: boolean = false;
    private _carTween: any = null;
    private _lastZoneState: boolean = false;

    public onReachedEnd: (() => void) | null = null;

    onLoad() {
        this.node.setPosition(this.node.position.x, this.startY, this.node.position.z);
    }

    onDestroy() {
        this._carTween?.stop();
        this._carTween = null;
    }

    update(dt: number) {
        const y = this.node.position.y;
        const inZone = (y <= 600 && y >= -400);

        if (inZone !== this._lastZoneState) {
            this._lastZoneState = inZone;
            this.onZoneStateChange?.(inZone);
        }
    }

    public startMoving() {
        this._startToTarget(this.barrierActive ? this.barrierY : this.endY, true);
    }

    public setBarrierActive(active: boolean) {
        if (this.barrierActive === active) return;
        this.barrierActive = active;
        this.audioSource.volume = 0;
        const currentY = this.node.position.y;

        if (active) {
            if (currentY > this.barrierY) {
                this._carTween?.stop();
                this._startToTarget(this.barrierY, false);
            }
        } else {
            if (currentY > this.endY + 0.001) {
                this._carTween?.stop();
                this._startToTarget(this.endY, true);
            }
        }
    }

    private _startToTarget(targetY: number, callOnEnd: boolean) {
        const currentPos = this.node.position.clone();
        const totalDist = Math.abs(this.startY - this.endY);
        const remainDist = Math.abs(currentPos.y - targetY);

        if (remainDist < 0.001) {
            if (callOnEnd && Math.abs(targetY - this.endY) < 0.001) {
                this._onReachedEnd();
            }
            return;
        }

        const duration = (totalDist > 0)
            ? (remainDist / totalDist) * this.moveTime
            : 0.01;

        this._carTween = tween(this.node)
            .to(duration, { position: new Vec3(currentPos.x, targetY, currentPos.z) })
            .call(() => {
                this._carTween = null;
                if (callOnEnd && Math.abs(targetY - this.endY) < 0.001) {
                    this._onReachedEnd();
                }
            })
            .start();
    }

    private _onReachedEnd() {
        this.onReachedEnd?.();
        this.node.destroy();
    }
}
