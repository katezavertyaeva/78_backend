interface Cook {
    cookFood(foodName: string): { name: string; tasty: boolean }
}

class ChefCook implements Cook {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    cookFood(foodName: string) {
        return { name: foodName, tasty: true }
    }
}

class JuniorCook implements Cook {
    juniorName: string;

    constructor(name: string) {
        this.juniorName = name
    }

    cookFood(foodName: string){
        return {name: foodName, tasty: false}
    }
}

const michelleChef = new ChefCook("Michelle");
const tomJuniorCook = new JuniorCook("Tom");
// console.log(michelleChef.name);
// console.log(michelleChef.cookFood("Eggs"));


class Butler {
    constructor(
        public name: string,
        private chef: Cook
    ) {
        this.name = name;
        this.chef = chef;
    }

    bring(order: string) {
        const food = this.chef.cookFood(order);
        return { ...food, drink: "orange juice" }
    }
}

const freddyButler = new Butler("Freddy", tomJuniorCook);
// console.log(freddyButler.bring("Bacon beans"));


class Queen {
    constructor(
        public name: string,
        private butler: Butler,
    ) {
        this.name = name;
        this.butler = butler;
    }

    breakfast(queenOrder: string) {
        return this.butler.bring(queenOrder);
    }
}

const elisabethQueen = new Queen("Elisabeth", freddyButler);
console.log(elisabethQueen.breakfast("Pancakes"));