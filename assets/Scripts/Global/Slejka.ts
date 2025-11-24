import { _decorator, Component, Node, Vec3, Camera, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Slejka')
export class Slejka extends Component {
    @property({ type: Node })
    public slejka: Node | null = null;

    @property
    public clampMinX: boolean = false;
    @property
    public minX: number = 50;
    @property
    public minXLand: number = 300;
    @property
    public clampMaxX: boolean = false;
    @property
    public maxX: number = 1000;
    @property
    public maxXLand: number = 700;

    // Камера (компонент) — перетащи сюда Camera компонента (узел с камерой)
    @property({ type: Camera })
    public cam: Camera | null = null;

    // Нода, которую нужно масштабировать при смене ориентации
    @property({ type: Node })
    public nodeToScale: Node | null = null;

    // Значения орто и скейла — при необходимости можно выставить в инспекторе
    @property
    public orthoLandscape: number = 500;
    @property
    public orthoPortrait: number = 960;

    @property({ type: Vec3 })
    public fixedPosition: Vec3 = new Vec3();

    update(dt: number) {
        if (!this.slejka) return;

        // Определяем ориентацию экрана через размер фрейма
        const frameSize = view.getFrameSize();
        const isLandscape = frameSize.width > frameSize.height;

        // --- изменить ортографический размер камеры ---
        if (this.cam) {
            const targetOrtho = isLandscape ? this.orthoLandscape : this.orthoPortrait;
            // Пытаемся поддержать разные имена свойства в API камеры
            try {
                if ((this.cam as any).orthoHeight !== undefined) {
                    (this.cam as any).orthoHeight = targetOrtho;
                } else if ((this.cam as any).orthographicSize !== undefined) {
                    (this.cam as any).orthographicSize = targetOrtho;
                } else if ((this.cam as any).orthoSize !== undefined) {
                    (this.cam as any).orthoSize = targetOrtho;
                } else {
                    // Если нет известных полей — пробуем установить через any
                    (this.cam as any).orthoHeight = targetOrtho;
                }
            } catch (e) {
                // если доступ к полю невозможен — молча игнорируем (чтобы не падало)
                // можно вывести лог, если нужно:
                // console.warn('Не удалось установить ortho на cam:', e);
            }
        }

        // --- масштабировать nodeToScale ---
        if (this.nodeToScale) {
            if (isLandscape) {
                this.nodeToScale.setScale(new Vec3(0.85, 0.85, 1));
            } else {
                this.nodeToScale.setScale(new Vec3(1.65, 1.65, 1));
            }
        }

        // --- поведение слежения / клайминг по X (твоя логика) ---
        if (isLandscape) {
            const targetPos: Vec3 = this.slejka.getPosition();
            targetPos.y += 50;

            if (this.clampMinX && targetPos.x < this.minXLand) {
                targetPos.x = this.minXLand;
            }
            if (this.clampMaxX && targetPos.x > this.maxXLand) {
                targetPos.x = this.maxXLand;
            }
            this.node.setPosition(targetPos);
        } else {
            const targetPos: Vec3 = this.slejka.getPosition();
            targetPos.y += 50;

            if (this.clampMinX && targetPos.x < this.minX) {
                targetPos.x = this.minX;
            }
            if (this.clampMaxX && targetPos.x > this.maxX) {
                targetPos.x = this.maxX;
            }
            this.node.setPosition(targetPos);
        }
    }
}
