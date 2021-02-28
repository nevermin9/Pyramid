class Pyramid {
    static getPressureByCoordinats(row, num) {
        var first = 0
        var total = row * (row + 1) / 2;
        
        for (var i = 0; i < row; i++) {
            first = (first + 1) / 2;
        }
            
        if (num === 0 || num === row) {
            return first;
        }
        
        return (total - (2 * first)) / (row - 1);
    } 
}

module.exports = Pyramid;