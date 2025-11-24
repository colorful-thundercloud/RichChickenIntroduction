import { _decorator, Component, Node, Prefab, instantiate, math } from 'cc';
import { CarTweenMover } from './CarTweenMover';
const { ccclass, property } = _decorator;

@ccclass('LaneSpawner')
export class LaneSpawner extends Component {

    @property([Prefab])             private carPrefabs: Prefab[] = [];
    @property(Number)               private minDelay: number = 0.5;
    @property(Number)               private maxDelay: number = 3.0;
    @property(Node)                 private barrier: Node;
    @property(Node)                 private goldLuk: Node;
    @property(Boolean)              public isBusy: boolean = false;

    private barrierActive: boolean = false;
    private _currentCarNode: Node | null = null;

    public onCarReachedEnd: (() => void) | null = null;

    start() {
        this._scheduleNextSpawn();
    }

    public goldLukActive(active: boolean) {
        this.goldLuk.active = active;
    }

    public setBarrierActive(active: boolean) {
        this.barrierActive = active;
        this.barrier.active = active;

        if (this._currentCarNode) {
            const mover = this._currentCarNode.getComponent(CarTweenMover);
            mover?.setBarrierActive(active);
        }
    }

    public trySpawnNow(): boolean {
        if (this._currentCarNode) return false;
        this._spawnRandomCar();
        return true;
    }

    private _scheduleNextSpawn() {
        if (this._currentCarNode) return;

        const delay = math.randomRange(this.minDelay, this.maxDelay);
        this.scheduleOnce(() => {
            this._spawnRandomCar();
        }, delay);
    }

    private _spawnRandomCar() {
        if (this._currentCarNode) return;
        if (!this.carPrefabs || this.carPrefabs.length === 0) return;

        const idx = Math.floor(Math.random() * this.carPrefabs.length);
        const prefab = this.carPrefabs[idx];
        const carNode = instantiate(prefab);

        this.node.addChild(carNode);

        this._currentCarNode = carNode;

        const mover = carNode.getComponent(CarTweenMover);
        if (mover) {
            mover.setBarrierActive(this.barrierActive);

            mover.onReachedEnd = () => {
                this._currentCarNode = null;
                this.isBusy = false;
                this.onCarReachedEnd?.();
                this._scheduleNextSpawn();
            };

            mover.onZoneStateChange = (inZone: boolean) => {
                this.isBusy = inZone;
            };

            mover.startMoving();
        }
    }
}
