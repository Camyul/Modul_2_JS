/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function solve() {
    return function findPrimes(numbers) {
        let i,
            j = +numbers[0],
            result;

        if (Number.isNaN(Number(numbers[0])) || Number.isNaN(Number(numbers[1]))) {
            throw 'Error';
            while (j < +numbers[1]) {
                if (j < 2) {
                    j += 1;
                    continue;
                }
                for (i = 2; i < Math.sqrt(j); i += 1) {
                    if (j % i === 0) {
                        break;
                    }
                }
                result.push(j);
                j += 1;
            }
        }
        return result;
    }
}

module.exports = solve;