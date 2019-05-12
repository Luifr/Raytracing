export class Vector2 {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    sum(vector2, y) {
        if (y !== undefined) {
            this.x += vector2
            this.y += y
        } else {
            this.x += vector2.x
            this.y += vector2.y
        }
    }

    distance(p) {
        return Math.sqrt((this.x - p.x) * (this.x - p.x) + (this.y - p.y) * (this.y - p.y));
    }

    static distance(p1,p2){
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    }

}