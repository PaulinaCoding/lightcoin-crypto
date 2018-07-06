let balance = 500.00;

/////////////////Old version with repeated content of classes//////////////////////
// class Withdrawal {

//   constructor(amount,account) {
//     this.amount = amount;
//     this.account = account;
//   }

//   commit() {
//     this.account.balance -= this.amount;
//   }

// }

// class Deposit {

//   constructor(amount, account) {
//     this.amount = amount;
//     this.account = account;
//   }

//   commit() {
//     this.account.balance += this.amount;
//   }

// }

//////////New version with Superclass Transaction/////////////
class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

  isAllowed() {
    if ((this.account.balance - this.amount) <= 0) {
    return false;
    } else { 
    return true; 
    }
  }
}

///////////////////////////////////////////
class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}

///////////////////////////////////////////
class Withdrawal extends Transaction {

  get value() {
  return -this.amount;
  }

}

/////////////////////////////////////////////
class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }
  
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);


console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Depositing should succeed...');
const t4 = new Deposit(100.00, myAccount);
console.log('Commit result:', t4.commit());
console.log('Account Balance: ', myAccount.balance);


console.log('Withdrawal for 108.99 should be allowed...');
const t5 = new Withdrawal(108.99, myAccount);
console.log('Commit result:', t5.commit());

console.log('Ending Account Balance: ', myAccount.balance);
//console.log("Lookings like I'm broke again");





