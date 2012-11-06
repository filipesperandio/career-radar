function init(h,w) {

 document.getElementById('title').innerText = title;

 var radar = new pv.Panel()
      .width(w)
      .height(h)
      .canvas('radar')
      // .add(pv.Panel)
     .add(pv.Dot)
       .def("active", false)
       .data(radar_data)
       .left(function(d) { var x = polar_to_raster(d.pc.r, d.pc.t)[0]; return x; })
         .bottom(function(d) { var y = polar_to_raster(d.pc.r, d.pc.t)[1]; return y; })
         .title(function(d) { return d.name; })
         .angle(45)
         .fillStyle(function(d) { return d.color; })
         .shape(function(d) { return (d.movement === 't' ? "triangle" : "circle"); })
         // .event("mouseover", function() {this.fillStyle("orange");})
         // .event("mouseout", function() {this.fillStyle("#aec7e8");})
         .anchor("top").add(pv.Label)
             .text(function(d) { return this.index + 1 + "."; })
             .textBaseline("left");

             // .fillStyle("#aec7e8")

             // .add(pv.Panel)
             //   .def("active", false)
             // .fillStyle(function() {this.parent.active() ? "orange" : "#aec7e8";})
             //   .event("mouseover", function() {this.parent.active(true);})
             //   .event("mouseout", function() {this.parent.active(false);})

function draw_legend(quad, left, top) {

  radar.add(pv.Label)
       .left(qleft)
       .top(qtop -18)
       .anchor("left")
       .add(pv.Label)
             .text(quad.name)
             .font('24pt');
  var t = radar_data.slice(quad.start,quad.end);

  radar.add(pv.Dot)
      .data(t)
      .left(qleft)
      .top(function() {return (qtop + (this.index * 18));})
      .size(8)
      .strokeStyle(null)
      .fillStyle(function(d) { return d.color; })
    .anchor("right")
          .add(pv.Label)
          .text(function(d) {return (quad.start + 1 + this.index) + ". " + d.name;} );
}
/*
//race conditions?
for (var i = 0; i < radar_quadrants.length; i++) {
  var qleft = 5 + (1020 * ((i+1) % 2));
  var qtop = 36 + (500 * (i > 1 ? 1: 0));
  var quad = radar_quadrants[i];
  radar.add(pv.Dot)
      .strokeStyle(null)
      .left(5)

  draw_legend(quad, qleft, qtop);

} */

    function addLegendLabel(quadrantIndex, position) {
        radar.anchor('left').add(pv.Label)
        .left(position.left)
        .top(position.top)
        .text(radar_quadrants[quadrantIndex].name)
        .font("18px sans-serif");
    }

    function addLegend(quadrantIndex, position) {
        radar.add(pv.Dot)
        .data(radar_data.slice(radar_quadrants[quadrantIndex].start,radar_quadrants[quadrantIndex].end))
        .left(position.left)
        .top(position.top)
        .size(8)
        .strokeStyle(null)
        .angle(45)
        .shape(function(d) {return (d.movement === 't' ? "triangle" : "circle");})
        .fillStyle(function(d) { return d.color; })
        .anchor("right").add(pv.Label).text(function(d) {return this.index + 1 + radar_quadrants[quadrantIndex].start + ". " + d.name;} );
    }

    addLegendLabel(0, { left: 5, top: 18 });
    addLegend(0, { left: 5, top: function() {return (36 + this.index * 18);} });

    addLegendLabel(1, { left: w-200+30, top: 18 });
    addLegend(1, { left: w-200+30, top: function() {return (36 + this.index * 18);} });

    addLegendLabel(2, { left: 5, top: (h/2 + 18) });
    addLegend(2, { left: 5, top: function() {return ((h/2) + 36 + this.index * 18);} });

    addLegendLabel(3, { left: w-200+30, top: (h/2 + 18) }); 
    addLegend(3, { left: w-200+30, top: function() {return ((h/2) + 36 + this.index * 18);} });
//arcs
radar.add(pv.Dot)
       .data(radar_arcs)
       .left(w/2)
       .bottom(h/2)
       .radius(function(d){return d.r;})
       .strokeStyle("#ccc")
       .anchor("top")
       .add(pv.Label).text(function(d) { return d.name;});


//quadrant lines
radar.add(pv.Line)
        .data([(h/2-radar_arcs[3].r),h-(h/2-radar_arcs[3].r)])
        .lineWidth(1)
        .left(w/2)
        .bottom(function(d) {return d;})
        .strokeStyle("#bbb");

radar.add(pv.Line)
                .data([200,w-200])
                .lineWidth(1)
                .bottom(h/2)
                .left(function(d) {return d;})
                .strokeStyle("#bbb");

 radar.anchor('radar');
 radar.render();

  };
