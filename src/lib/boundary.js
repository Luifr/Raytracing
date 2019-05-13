export let boundaries = [];

export class Boundary {

    static emptyBoundaries(){
        boundaries = [];
    }

    constructor(p1, p2, x2, y2) {
        if (x2 === undefined) {
            this.p1 = p1;
            this.p2 = p2;
        } else {
            this.p1 = new Vector2(p1, p2);
            this.p2 = new Vector2(x2, y2);
        }

        this.a = (this.p1.y - this.p2.y) / (this.p1.x - this.p2.x);
        this.b = Number.isFinite(this.a) ? this.p1.y - (this.p1.x * this.a) : 0;

        this.maxX = Math.max(this.p1.x, this.p2.x);
        this.minX = Math.min(this.p1.x, this.p2.x);

        this.maxY = Math.max(this.p1.y, this.p2.y);
        this.minY = Math.min(this.p1.y, this.p2.y);

        boundaries.push(this);
    }

    show(canvas) {
        canvas.drawLine(this.p1, this.p2);
    }

}