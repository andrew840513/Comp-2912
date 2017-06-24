const canadianDollar = 0.91;

function roundToDecimals(amount) {
    return Math.round(amount * 100) / 100;
}

exports.canadianToUS = function(c) {
    return roundToDecimals(c * canadianDollar);
}

exports.USToCanadian = function(u) {
    return roundToDecimals(u/canadianDollar);
}