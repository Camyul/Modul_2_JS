function findPrimes(start, end) {
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
findPrimes(0, 7);