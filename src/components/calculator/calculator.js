import React from 'react';
import './calculator.css';

class Calculator extends React.Component {
    state = {
        showChange: false,
        productPrice: 0,
        amountGiven: 0,
        changeTotal: 0,
        totalString: ''
    }

    productPrice = (price) => {
        this.setState({ productPrice: parseFloat(price) })
    }

    amountGiven = (amount) => {
        this.setState({ amountGiven: parseFloat(amount) })
    }

    onSubmit = () => {
        this.calculateChange();
        this.setState({
            showChange: true
        })
    }


    calculateChange = () => {
        let changeLeft = this.state.amountGiven - this.state.productPrice;

        this.setState({ changeTotal: changeLeft });

        let totalString = "";

        if (changeLeft > 0) {
            let i;
            for (i = 0; i < changeLeft;) {
                let breakdown = this.getMoneyBreakdown(changeLeft);
                changeLeft = breakdown.changeLeftAfterDeduction;
                totalString = totalString.concat(breakdown.moneyString);
            }
        } else {
            totalString = 'You have not given enough money to purchase this item!';
        }

        this.setState({ totalString: totalString });
    }

    getMoneyBreakdown = (changeLeft) => {
        let breakdown = {
            changeLeftAfterDeduction: 0,
            moneyString: ''
        };
        switch (true) {
            case (changeLeft >= 20):
                let twentyPoundNotes = Math.floor(changeLeft/20);
                breakdown.moneyString = '<p>' + twentyPoundNotes + ' x £20</p>';
                let lessTwenties = twentyPoundNotes * 20;
                breakdown.changeLeftAfterDeduction = changeLeft - lessTwenties;
                break;
            case (changeLeft >= 10):
                let tenPoundNotes = Math.floor(changeLeft/10);
                breakdown.moneyString = '<p>' + tenPoundNotes + ' x £10</p>';
                let lessTens = tenPoundNotes * 10;
                breakdown.changeLeftAfterDeduction = changeLeft - lessTens;
                break;
            case (changeLeft >= 5):
                let fivePoundNotes = Math.floor(changeLeft/5);
                breakdown.moneyString = '<p>' + fivePoundNotes + ' x £5</p>';
                let lessFives = fivePoundNotes * 5;
                breakdown.changeLeftAfterDeduction = changeLeft - lessFives;
                break;
            case (changeLeft >= 2):
                let twoPoundCoins = Math.floor(changeLeft/2);
                breakdown.moneyString = '<p>' + twoPoundCoins + ' x £2</p>';
                let lessTwos = twoPoundCoins * 2;
                breakdown.changeLeftAfterDeduction = changeLeft - lessTwos;
                break;
            case (changeLeft >= 1):
                let onePoundCoins = Math.floor(changeLeft/1);
                breakdown.moneyString = '<p>' + onePoundCoins + ' x £1</p>';
                let lessOnes = onePoundCoins * 2;
                breakdown.changeLeftAfterDeduction = changeLeft - lessOnes;
                break;
            case (changeLeft >= 0.50):
                let fiftyPenceCoins = Math.floor(changeLeft/0.50);
                breakdown.moneyString = '<p>' + fiftyPenceCoins + ' x 50p</p>';
                let lessFiftyPences = fiftyPenceCoins * 0.50;
                breakdown.changeLeftAfterDeduction = changeLeft - lessFiftyPences;
                break;
            case (changeLeft >= 0.20):
                let twentyPenceCoins = Math.floor(changeLeft/0.20);
                breakdown.moneyString = '<p>' + twentyPenceCoins + ' x 20p</p>';
                let lessTwentyPences = twentyPenceCoins * 0.20;
                breakdown.changeLeftAfterDeduction = changeLeft - lessTwentyPences;
                break;
            case (changeLeft >= 0.10):
                let tenPenceCoins = Math.floor(changeLeft/0.10);
                breakdown.moneyString = '<p>' + tenPenceCoins + ' x 10p</p>';
                let lessTenPences = tenPenceCoins * 0.10;
                breakdown.changeLeftAfterDeduction = changeLeft - lessTenPences;
                break;
            case (changeLeft >= 0.05):
                let fivePenceCoins = Math.floor(changeLeft/0.05);
                breakdown.moneyString = '<p>' + fivePenceCoins + ' x 5p</p>';
                let lessFivePences = fivePenceCoins * 0.05;
                breakdown.changeLeftAfterDeduction = changeLeft - lessFivePences;
                break;
            case (changeLeft >= 0.02):
                let twoPenceCoins = Math.floor(changeLeft/0.02);
                breakdown.moneyString = '<p>' + twoPenceCoins + ' x 2p</p>';
                let lessTwoPences = twoPenceCoins * 0.02;
                breakdown.changeLeftAfterDeduction = changeLeft - lessTwoPences;
                break;
            case (changeLeft >= 0.01):
                let onePenceCoins = Math.floor(changeLeft/0.01);
                breakdown.moneyString = '<p>' + onePenceCoins + ' x 1p</p>';
                let lessOnePences = onePenceCoins * 0.01;
                breakdown.changeLeftAfterDeduction = changeLeft - lessOnePences;
                break;
            default:
                break;
        }
        return breakdown;
    }

    render() {
        return (
            <div id="calculatorContainer">
                <h1>Change Calculator</h1>

                <div className="inputContainer">
                    <label>Product Price</label>
                    <input type="number" name="price" id="price" onChange={e => this.productPrice(e.target.value)} />
                </div>
                <div className="inputContainer">
                    <label>Amount Given</label>
                    <input type="number" name="amount" id="amount" onChange={e => this.amountGiven(e.target.value)} />
                </div>
                <button id="submitButton" onClick={this.onSubmit}>Calculate change to be returned</button>

                { this.state.showChange &&
                <div id="changeContainer">
                    <h3>Change given:</h3>
                    <div dangerouslySetInnerHTML={{__html: this.state.totalString}} />
                    <p>Total change given: £{this.state.changeTotal}</p>
                </div>
                }
            </div>
        )
    }
}

export default Calculator;