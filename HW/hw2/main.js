let margin = {left: 300, right: 0, up: 300, down:0 };
let gap_between_views = 150;


// Loading the CSV Data

// Todo: Make it only the month of may to display

let mayPlot = d3.select('svg')
        .attr("width", width + newMargin.left + newMargin.right)
        .attr("height", height + newMargin.top + newMargin.bottom)

d3.csv("citi_bike_2020.csv").then(function(data) {
    // Converting to Integer after loading data
    data.forEach(d =>{
        d.station = +d.station; 
        d.latitude = +d.latitude;
        d.longitude = +d.longitude;
        d.start = +d.start;
        d.tripdurationS = +d.tripdurationS;
        d.end = +d.end;
        d.tripdurationE = +d.tripdurationE;
        d.month = +d.month;
    });

    // Need Only the Month of May

    let newMargin = {left: 150, right:150, top:150, bottom:150};

    
    // Setting Scales and Axes for Scatter Plot
    
    let xScale = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(data, (d) => d.tripdurationS)]);
    
    svg.append("g")
        .attr("transform", "translate(0, " + height + ")")
        .call(d3.axisBottom(x))
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height)
        .text("Trip duration start from");

    let yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, (d) => d.tripdurationE)]);
    svg.append("g")
        .attr("transform", "translate(0, " + height + ")")
        .call(d3.axisLeft(y))
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height)
        .text("Trip duration end in");
    // Axes
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale)
        .ticks(5);

    
    svg.append("g")
        .attr("class", "axis-label")
        .attr('transform', 'translate(0,' + (-20) + ')')
        .append("text")
        .style("text-anchor", 'middle')
        .text("Trip duration start from");
    // Adding the dots from the month of May
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("r", 5)
            .style("fill", :)
})

