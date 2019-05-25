import {Vector2} from "./vector2.js";

export class Canvas{

    constructor(bgColor = "black", lineColor = "white"){
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.ctx.fillStyle = bgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = lineColor;
    }

    drawLine(p1, p2, p3, p4) {
        this.ctx.beginPath();

        if(p3 && p4){
            this.ctx.moveTo(p1, p2);
            this.moveLine(p3,p4);
        }
        else{
            this.ctx.moveTo(p1.x, p1.y);
            this.moveLine(p2);
        }
        
        this.ctx.stroke();
    }

    moveLine(point, point2) {
        if(point2){
            this.ctx.lineTo(point, point2);
        }
        else{
            this.ctx.lineTo(point.x, point.y);
        }
    }

    fillScreen(color){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.bgColor;
    }

    pointToWorld(p1,p2){
        let p;
        let rect = this.canvas.getBoundingClientRect();
        if(p2 === undefined){
            let x = p1.clientX || p1.x;
            let y = p1.clientY || p1.y;
            p = new Vector2(
                (x - rect.left) * (this.canvas.width / rect.width),
                (y - rect.top) * (this.canvas.height / rect.height)
            )
        }
        else{
            p = new Vector2(
                (p1 - rect.left) * (this.canvas.width / rect.width),
                (p2 - rect.top) * (this.canvas.height / rect.height)
            )
        }

        return p;
    }

}