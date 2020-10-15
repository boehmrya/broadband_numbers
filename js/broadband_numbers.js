jQuery(function($){
  // initialize animations
  AOS.init();

  // flags for whether charts have appeared
  var adoptChart = false
  var adoptChartEl = $('.adoption-chart');

  var custChart = false
  var custChartEl = $('.customers-chart');

  // check if element is in the viewport
  var isInViewport = function(el) {
    var elementTop = el.offset().top;
    var elementBottom = elementTop + el.outerHeight();
    var viewportTop = jQuery(window).scrollTop();
    var viewportBottom = viewportTop + jQuery(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  $(window).on('load scroll', function() {
    var throttled = false;
    var delay = 250;

    // only run if we're not throttled
    if (!throttled) {
      if (!adoptChart && isInViewport(adoptChartEl)) {
        adoptionChart();
        adoptChart = true;
      }

      if (!custChart && isInViewport(custChartEl)) {
        customersChart();
        custChart = true;
      }

      // we're throttled!
      throttled = true;
      // set a timeout to un-throttle
      setTimeout(function() {
        throttled = false;
      }, delay);
    }
  });


  // broadband adoption chart
  function adoptionChart() {
    var data, margin, width, height, viewBox, parseDate, x, y,
        tickLabels, xAxis, yAxis, initialArea, area, svg;

    // broadband adoption data
    data = [{"year":"2000", "percent": 3},
                {"year":"2005", "percent": 32},
                {"year":"2010", "percent": 62},
                {"year":"2015", "percent": 68},
                {"year":"2020", "percent": 81}];

    // dimensions
    margin = {top: 20, right: 20, bottom: 30, left: 50};
    width = 1140 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
    viewBox = "0 0 1140 500";

    parseDate = d3.time.format("%Y").parse;

    x = d3.time.scale()
        .range([0, width]);

    y = d3.scale.linear()
        .range([height, 0]);

    tickLabels = ["2000", "2005", "2010", "2015", "2019"];

    xAxis = d3.svg.axis()
        .ticks(5)
        .scale(x)
        .tickFormat(function(d,i){ return tickLabels[i] })
        .orient("bottom");

    yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    initialArea = d3.svg.area()
        //.x(function(d) { return x(d.year); })
        .x(0)
        .y0(height)
        .y1(height);

    area = d3.svg.area()
        .x(function(d) { return x(d.year); })
        .y0(height)
        .y1(function(d) { return y(d.percent); });

    svg = d3.select(".adoption-chart").append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", viewBox)
        //.attr("width", width + margin.left + margin.right)
        //.attr("height", height + margin.top + margin.bottom)
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
        .attr("d", initialArea) // initial state (line at the bottom)
        .transition()
        .duration(2500)
        .ease("circle")
        .attr("d", area);
  }



  // broadband customers chart
  function customersChart() {
    var data, margin, width, height, viewBox, parseDate, x, y,
        tickLabels, xAxis, yAxis, initialArea, area, svg;

    // broadband adoption data
    data = [{"year":"2004", "customers": 22},
            {"year":"2005", "customers": 27},
            {"year":"2006", "customers": 31},
            {"year":"2007", "customers": 35},
            {"year":"2008", "customers": 39},
            {"year":"2009", "customers": 41},
            {"year":"2010", "customers": 43},
            {"year":"2011", "customers": 47},
            {"year":"2012", "customers": 49},
            {"year":"2013", "customers": 51},
            {"year":"2014", "customers": 54},
            {"year":"2015", "customers": 58},
            {"year":"2016", "customers": 62},
            {"year":"2017", "customers": 66}];

    // dimensions
    margin = {top: 20, right: 20, bottom: 30, left: 50};
    width = 1140 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
    viewBox = "0 0 1140 500";

    parseDate = d3.time.format("%Y").parse;

    x = d3.time.scale()
        .range([0, width]);

    y = d3.scale.linear()
        .range([height, 0]);

    xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    initialArea = d3.svg.area()
        .x(function(d) { return x(d.year); })
        .y0(0)
        .y1(height);

    area = d3.svg.area()
        .x(function(d) { return x(d.year); })
        .y0(height)
        .y1(function(d) { return y(d.customers); });

    svg = d3.select(".customers-chart").append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", viewBox)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // Take each row and put the date column through the parsedate form we've defined above.
    data.forEach(function(d) {
      d.year = parseDate(d.year);
    });

    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([0,80]);

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
        .attr("fill", "#5AC9E7")
        .attr("d", initialArea) // initial state (line at the bottom)
        .transition()
        .duration(1500)
        .ease("linear")
        .attr("d", area);
  }




});
