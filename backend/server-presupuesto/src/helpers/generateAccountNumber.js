
// Generate a Random 8 digit account
export const generateAccountNumber = () => {
    const randomAcc = Math.floor( Math.random() * 10000000000 );
    const accountNumber = String(randomAcc).slice(0, 8);
    return accountNumber;
}
