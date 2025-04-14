function double(x, callback) {
    const result = x * 2;
    callback(result);
}


double(5, function (result) {
    console.log('Das Ergebnis ist:', result);
});

