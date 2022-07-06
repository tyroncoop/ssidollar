# Self-Sovereign Identity Dollar ($SI)

The Self-Sovereign Identity Dollar is a decentralized stablecoin. You can get an $SI loan by locking your ZIL (over-collateralization) while keeping the ownership of both cryptocurrencies. You can also swap from zUSDT to $SI & more!

[Get $SI YouTube Demo](https://youtu.be/juyqwMEoVwE)

The SSI Dollar DApp is a Decentralized Finance (DeFi) application made of two smart contracts:

-   [Proxy smart contract](./smartContracts/ssiDollar.tyron.scilla)

-   [Implementation smart contract](./smartContracts/ssiDollarImpl.tyron.scilla)

## MISSION VISION

We are going through a period of humanitarian and economic crises, where many countries and communities are not getting their universal rights fulfilled. Access to housing, education, services, decent food, etc., has become more problematic. The factor most strongly affecting this situation is the loss of purchasing power in emerging markets, and inflation suffered by these countries often causes this decrease.

In response to these crises, which so far show no signs of slowing down or remedying, we are proud to present this proposal for the creation of a 100% decentralized currency, which among its benefits, can offer conditions of stability and equal opportunities for the entire population, regardless of their identity conditions.

## UTILITY

The Self-Sovereign Identity Dollar ($SI) consists of a stable and fully decentralized coin, which can be created by over-collateralising ZIL or blocking zUSDT.

Creating this stable and decentralised coin has several functionalities that we consider very useful to counteract the economic conditions we are currently facing. On the one hand, it is beneficial for creating conditions of stability in emerging markets. On the other hand, the way it gets made allows the user to maintain their ZIL and, simultaneously, get a loan in Self-Sovereign Identity Dollars. In addition, these $SI can be used to provide liquidity, join the TYRON Governing & Profit-Sharing Community and other DeFi applications, and make decentralized exchanges to other fiat currencies and peer-to-peer transfers bringing more users into the Zilliqa ecosystem.

## SPECIFICATIONS

The Self-Sovereign Identity Dollar (SSI Dollar, $SSI) is a stablecoin, 100% decentralized and compatible with the Zilliqa fungible token standard (ZRC2).
There are currently two different functions for its creation through:
the over-collateralization of the ZIL token
the blocking of zUSDT.

### Creation of SSI Dollars by over-collateralisation of ZIL

Through the dApp of the SSI Dollar stablecoin, by depositing a certain amount of ZIL, it is possible to obtain a loan of 50% of the value in ZIL, maintaining control over both assets. The user keeps control over them and is free to decide when to withdraw them. This means that if the price of ZIL increases by the time you withdraw them, you will get a higher-valued asset. To do so, you must return the $SI you borrowed. To withdraw the total amount of your ZIL funds, you must return 100% of the $SI loan.

When the loan request is submitted, the ZILUSD exchange rate is read remotely from the decentralized DragonDex exchange.

### Creation of $SI by exchange of zUSDT

Self-Sovereign Identity Dollars can be created automatically with the SSI Dollar dApp at a 1:1 rate.

### IDEAS TO IMPLEMENT IN THE FUTURE

To extend the functionality of this stablecoin, we can implement the following features in the future:

-   Partial repayment of the loan

-   Exchange from XSGD to $SI

-   Transmutation of TYRON to $SI (burn TYRON to create $SI and vice-versa)

-   Liquidation by third parties: if the ZILUSD exchange rate drops below a threshold, meaning that the value in ZIL is, e.g. 150% of the value of the $SI loan, we could include third parties to act as liquidators. They will have to pay back the amount of $SI and will be able to take the ZIL balance, making a profit out of it.

## 🚀Running the Project

You can run this project with the following steps:

1. Clone this project

```
git clone https://github.com/tyroncoop/ssidollar.git
```

2. Install the dependencies with `yarn install`
3. Run the project with `yarn dev`
