// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

// Validating Credit Card Numbers
const validateCred = arr => {
    // Need to reverse the arrays as the Luhn Ago works right to left
    let reversedArr = arr.slice().reverse();

    // Creating a variable to keep track of the total sum of the array
    let sum = 0;

    // Creating variable to test if number is in a even or odd position 
    let isEvenPosition = false;

    // Looping through the array
    for (let i = 0; i < reversedArr.length; i++) {
        // If the number is in an even position
        if (isEvenPosition) {
            // Multiply the number by 2
            reversedArr[i] *= 2;
            // If the number is greater than 9
            if (reversedArr[i] > 9) {
                // Subtract 9 from the number
                reversedArr[i] -= 9;
            }
             // Adding the number to the total sum
            sum += reversedArr[i];
        } else {
             // Adding the number to the total sum
            sum += reversedArr[i];
        }
        // Setting the isEvenPosition variable to the opposite of its current value
        isEvenPosition = !isEvenPosition;
    }
    // Checking if the total sum is divisible by 10
    if (sum % 10 === 0) {
        // If it is, return true
        return true;
    } else {
        return false
    }
};

// Testing the function and algo 
console.log(validateCred(valid1)); // return true
console.log(validateCred(invalid1)); // return false 

// Check Arrays for which Numbers are invalid  
const findInvalidCards = arr => {
    // Initialize an array to store invalid card numbers
    let invalidCards = [];
    // Loop through the array of arrays and call the validateCred function on each array. If the function returns false, add the array to the invalidCards array.
    for (let cardArray of arr) {
        for (let cardNumber of cardArray) {
            if (validateCred(cardArray) === false) {
                invalidCards.push(cardArray);
            }
        }
    }
    return invalidCards;
};

console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5]));// Shouldn't print anything
console.log(findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5])); // Should print all of the numbers

// Making InvlaidCards a global scope 
let invalidCards = findInvalidCards(batch);

// console.log(findInvalidCards(batch));


// Identify the companies that have issued invalid cards
const idInvalidCardCompanies = arr => {
    // Initialize an array to store the companies
    let companiesSet = new Set();
    // Loop through the array of arrays and call the validateCred function on each array. If the function returns false, add the array to the invalidCards array.
    // This new companies array should not contain duplicates. If a company is found more than once, add it only once to the companies array.
    for (let cardArray of arr) {
        let company = "Company not found";
        switch (cardArray[0]) {
            case 3:
                company = "Amex";
                break;
            case 4:
                company = "Visa";
                break;
            case 5:
                company = "Mastercard";
                break;
            case 6:
                company = "Discover";
                break;
        }
        companiesSet.add(company);
    };
    return Array.from(companiesSet);
};

console.log(idInvalidCardCompanies(invalidCards));

