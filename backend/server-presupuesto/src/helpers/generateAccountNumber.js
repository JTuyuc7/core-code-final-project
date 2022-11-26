
// Generate a Random 8 digit account
const generateAccountNumber = () => {
    const randomAcc = Math.floor( Math.random() * 10000000000 );
    const accountNumber = String(randomAcc).slice(0, 8);
    return accountNumber;
}

module.exports = generateAccountNumber;