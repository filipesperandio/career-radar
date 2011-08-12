var radar_arcs = [
    { 'r':100, 'name': 'and I have a good experience' },
    { 'r':200, 'name': 'and I can be productive with' },
    { 'r':300, 'name': 'and I am interested on it' },
    { 'r':400, 'name': 'It is on my radar now' },   
];

var radar_quadrants = [];
var radar_data = [];
var quadrant_colors = [ '', '#990000', '#9900CC', '#0066CC', '#CCCC00' ]; 

function len(object) {
    var i = 0;
    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            i++;
        }
    }
    return i;
}

var quad = 1;
for (var quadrant in data) {
    var i = 1;
    var start = radar_data.length;

    for(var item in data[quadrant]) {
        radar_data.push({
            name: item,
            movement: 'c', 
            pc: {
                r: (Math.abs(4 - data[quadrant][item]) * 100) + ((40 / len(data[quadrant]) * i)) + 40,
                t: (quad == 1 ? 90 : quad == 2 ? 20 : quad == 3 ? 200 : 280) + ((60 / len(data[quadrant]) * i))
            },
            color: quadrant_colors[quad]
        });
        i++;
    }
    
    var end = radar_data.length;

    radar_quadrants.push({name: quadrant, start: start, end: end});
    quad++;
}

