/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	
*/

function solve() {
    return function sum(numbers) {
        let result = 0,
            i;
        if (numbers.length === 0) {
            return null;
        }
        for (i = 0; i < numbers.length; i += 1) {
            if (Number.isNaN(Number(numbers[i]))) {
                throw 'Error';
            }
            result += +numbers[i];
        }
        //return numbers.reduce((x, y) => x + y, 0);
        return result;
    }
}

module.exports = solve;