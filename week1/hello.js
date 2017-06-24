class Shape {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    move(x,y){
        this.x = x;
        this.y = y;
    }

    distanceFromOrigin(){
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
}

const s = new Shape();

s.move(10,10);
console.log(s.distanceFromOrigin());