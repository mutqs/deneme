class Currency {
    constructor(firstCurrency, secondCurrency) {

        this.firstCurrency = firstCurrency;
        this.secondCurrency = secondCurrency;
        this.url = "https://api.exchangeratesapi.io/latest?base=";

        this.amount = null;
    }



    async exchange() {
        const response = await fetch(this.url + this.firstCurrency);
      
        const data = await response.json();

        const parity = data.rates[this.secondCurrency];

        const amount2 = Number(this.amount);

        let total = parity * amount2;

        // console.log(total);

        return total;


    };

    changeAmount(amount) {
        this.amount = amount;
    }

    changeFirstCurrency(newFirstCurrency) {
        this.firstCurrency = newFirstCurrency;
    }
    changeSecondCurrency(newSecondCurrency) {
        this.secondCurrency = newSecondCurrency;
    }
}