class Node
{
    constructor(lambdaE,lambdaU,costS,costE,costU,de,du)
    {
        this.id = this.getId();
        this.lambdaE=lambdaE;
        this.lambdaU=lambdaU;
        this.costS=costS;
        this.costE=costE;
        this.costU=costU;
        this.vn=this.getVn(de,du)
    }
    getVn(de,du)
    {
        return this.lambdaE*de+this.lambdaU*du;
    }
    getId()
    {
        return getRandomArbitrary(0,255)+"."+getRandomArbitrary(0,255)+"."+getRandomArbitrary(0,255)+"."+getRandomArbitrary(0,255);
    }
}

function getRandomArbitrary(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}