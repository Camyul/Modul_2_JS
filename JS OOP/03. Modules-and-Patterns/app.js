function solve(name) {
    let reg = RegExp(/\s\s/);
    if (reg.test(name[1])) {
        console.log('Work!');
    } else {
        console.log('Not Work!');

    }
    console.log(Number.isNaN(name[0]));
}
solve(['322', 'Itest21'])