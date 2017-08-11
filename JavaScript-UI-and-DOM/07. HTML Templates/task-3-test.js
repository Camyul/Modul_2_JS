$(function() {
    solve()();

    var data = [],
        count;

    for (let i = 0, ; i < count; i += 1) {
        let number = i + 1,
            name = `Student ${i + 1}`,
            mark = i % 3 + 2;

        data.push({ number, name, mark });
    }

    $(`#students-table`).listview(data);
})