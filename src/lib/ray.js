import {Vector2} from "./vector2.js";

export class Ray {
    constructor(p1, dir, dir2) {
        if (dir2 === undefined) {
            this.p = p1;
            this.dir = dir;
        } else {
            this.p = new Vector2(p1, dir);
            this.dir = dir2;
        }
    }

    show(canvas, boundaries) {

        let p2 = new Vector2(this.p.x + Math.cos(this.dir), this.p.y - Math.sin(this.dir));
        let a = (this.p.y - p2.y) / (this.p.x - p2.x);
        let b = a !== Infinity ? this.p.y - this.p.x * a : 0;
        let ocol = new Vector2(this.p.x + 10000 * Math.cos(this.dir), this.p.y - 10000 * Math.sin(this.dir));
        let col = new Vector2(ocol.x, ocol.y);
        let p;
        if(boundaries){
            for (let bound of boundaries) {
                if (bound.a !== a) {
                    let x = Number.isFinite(a) ? (bound.b - b) / (a - bound.a) : this.p.x;
                    if (!Number.isFinite(bound.a)) {
                        x = bound.minX;
                    }
                    let y = Number.isFinite(a) ? a * x + b : x * bound.a + bound.b;
                    if (x <= bound.maxX && x >= bound.minX && y <= bound.maxY && y >= bound.minY) {
                        p = new Vector2(x, y);
                        if (Vector2.distance(this.p, p) < Vector2.distance(this.p, col) && Vector2.distance(this.p, p) > Vector2.distance(p2, p)) {
                            col = p;
                        }
                    }
                }
            }
        }
        if (Vector2.distance(col, this.p) < Vector2.distance(col, p2)) {
            col = ocol;
        }
        canvas.drawLine(this.p, col);
    }

}