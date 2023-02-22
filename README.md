# POMS WALLET

Wallet application for `product ownership management system`



## Abstract

This is a mobile wallet application developed with React Native(Expo) to test the functionalities of the blockchain client of `product ownership management system`.



## System Requirements

This application was developed with [Node.js 14](https://nodejs.org/en/blog/release/v14.17.3/) on [Ubuntu 20.04](https://releases.ubuntu.com/focal/).



## Setup

1. Clone or download this repository.

2. Change directory to the project root.

3. Install dependencies with: 
``` 
npm install 
```


## Installing and running POMS WALLET

**Note:** The connection between the wallet application and blockchain client is tested within the same network. Firewall is needed to be disabled on the computer running the blockchain client. Developed using React Native (Expo).

**Important!** Only available for `IOS` because of BigInt support is not available for the android yet.



### Running Expo client

**Note:** npx is already included in nodejs installation.

Start Expo client with npx:
```
npx expo start
```
Which will output `QR code` in the terminal.



### Installing and running POMS WALLET on IOS

**Important!** The mobile and the computer running the Expo client must be in the same network. Disable firewall of the computer upon network error.

Scan the `QR code` in the terminal with camera application.
