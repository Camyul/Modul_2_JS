/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function solve() {
    return function findPrimes(start, end) {
        let i,
            j = +start,
            isPrime = true,
            result = [];
        if (Number.isNaN(Number(start)) || Number.isNaN(Number(end))) {
            throw 'Error';
        }
        while (j <= +end) {
            if (j < 4) {
                if (j > 1 && j < 4) {
                    result.push(j);
                }
                j += 1;
                continue;
            }
            isPrime = true;
            for (i = 2; i <= Math.sqrt(j); i += 1) {
                if (j % i === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                result.push(j);
            }

            j += 1;
        }

        //console.log(result);
        return result;
    }
}

module.exports = solve;