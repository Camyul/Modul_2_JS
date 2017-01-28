function solve(name) {
    let reg = RegExp(/\s\s/);
    if (reg.test(name[1])) {
        console.log('Work!');
    } else {
        console.log('Not Work!');

    }
    console.log(name.length);
}
solve(['Ivan', 'Itest21'])