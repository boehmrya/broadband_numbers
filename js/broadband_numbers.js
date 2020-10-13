jQuery(function($){
  // initialize animations
  AOS.init();

  // broadband adoption data
  var data = [{"year":"2000", "percent": 3},
              {"year":"2005", "percent": 32},
              {"year":"2010", "percent": 62},
              {"year":"2015", "percent": 68},
              {"year":"2020", "percent": 81}];

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 1140 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%Y").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var tickLabels = ["2000", "2005", "2010", "2015", "2019"];

  var xAxis = d3.svg.axis()
      .ticks(5)
      .scale(x)
      .tickFormat(function(d,i){ return tickLabels[i] })
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var initialarea = d3.svg.area()
      .x(function(d) { return x(d.year); })
      .y0(height)
      .y1(height);

  var area = d3.svg.area()
      .x(function(d) { return x(d.year); })
      .y0(height)
      .y1(function(d) { return y(d.percent); });

  var svg = d3.select(".adoption-chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // Take each row and put the date column through the parsedate form we've defined above.
  data.forEach(function(d) {
    d.year = parseDate(d.year);
  });

  x.domain(d3.extent(data, function(d) { return d.year; }));
  //y.domain(d3.extent(data, function(d) { return d.percent; }));
  y.domain([0,100]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Percent");
  svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("fill", "#E71B4F")
      .attr("d", initialarea) // initial state (line at the bottom)
      .transition()
      .duration(2500)
      .ease("bounce")
      .attr("d", area);

});
