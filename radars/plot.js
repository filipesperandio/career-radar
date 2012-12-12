var radar_arcs = [
    { 'r':100, 'name': '' },
    { 'r':200, 'name': '' },
    { 'r':300, 'name': '' },
    { 'r':400, 'name': '' }
];

var radar_quadrants = [];
var radar_data = [];
var quadrant_colors = [ '',
  '#58A', 
  '#076', 
  '#076',
  '#58A' 
]; 

function len(object) {
    var i = 0;
    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            i++;
        }
    }
    return i;
}
function howmany(list, prop) {
  var i = 0;
  for (var l in list) {
    i += list[l] == prop ? 1 : 0;
  }
  return i;
}
function countFor(items, prop) {
  if(items[prop]) {
    items[prop]++;
  } else {
    items[prop] = 1;
  }
  return items[prop];
}

var count = 1;
var quad = 1;
for(var quadrant in data) {
    var i = 1;
    var start = radar_data.length;
    var quad_circle_items = {};

    for(var item in data[quadrant]) {
      var item_within_circle = countFor(quad_circle_items, data[quadrant][item]); 
      console.log("quadrant: " + quadrant + " has " + item_within_circle);
      console.log(quad_circle_items);
      var circle_count = howmany(data[quadrant], data[quadrant][item]);
      var quad_item = data[quadrant][item];
      var circle = (Math.abs(4 - quad_item) * 100);
      var variant = (circle === 0 ? 80 : 50);
      var r = circle + variant + i;

      var angle = (quad == 1 ? 90 : quad == 2 ? 0 : quad == 3 ? 180 : 270);
      var curve = ((item_within_circle - 1) *  16) ;
      var t = angle + curve + 5;


      radar_data.push({
        name: item,
        movement: 'c', 
        pc: {
          r: r,
          t: t  
        },
        color: quadrant_colors[quad]
      });
      i++;
    }
    
    var end = radar_data.length;

    radar_quadrants.push({name: quadrant, start: start, end: end});
    quad++;
}

