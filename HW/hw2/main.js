let margin = {left: 300, right: 0, up: 300, down:0 };
let gap_between_views = 150;


// Loading the CSV Data

// Todo: Make it only the month of may to display
let newMargin = {left: 150, right:150, top:150, bottom:150};


// FIRST GRAPH

// const width = 800;
// const height = 900;
let firstGraph = d3.select('svg').append("g");
firstGraph.attr('transform', `translate(${newMargin.left}, ${newMargin.top})`)

// CSV Data Loader and converted. Need to convert it to numerical types 
d3.csv("citi_bike_2020.csv").then(function(data) {
    // Converting to Integer after loading data
    mayData = data.filter(function(row) {
        return row["month"] == "May";
    });
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
    let xScale = d3.scaleLinear()
        .range([0, margin.left+100])
        .domain([0, d3.max(data, (d) => d.tripdurationS)]);
    let xAxis = d3.axisBottom(xScale)
        .ticks(10)
    firstGraph.append('g')
        .attr("transform", "translate(0," + (margin.right+margin.up) + ")")
        .attr('class', 'x-axis')
        .call(xAxis)
    let yScale = d3.scaleLinear()
        .range([300, margin.down])
        .domain([0, d3.max(data, (d) => d.tripdurationE)]);
        // G does not have width and height
    let yAxis = d3.axisLeft(yScale)
        .ticks(5)
    firstGraph.append('g')
        .attr('class', 'y-axis')
        .call(yAxis)
    // May Grouped Data
    let toolTip = firstGraph.append('g')
        .attr("class", "tooltip")

    
    // Need to filter May Data
    firstGraph.selectAll('.point')
        .data(mayData)
        .enter().append('circle')
        .attr('class', 'point')
        .attr("cx", d=> xScale(d.tripdurationS))
        .attr("cy", d=> yScale(d.tripdurationE))
        .attr("r", '5')
        .style('fill', 'steelblue')
        .style('stroke', 'black')
        .style('stroke-width', 2)
    
        
    
    .on('mouseover', function(d) {
        d3.select(this)
            .transition()
            .duration(500)
            .style("r", '10')
            .style('fill', 'red');
        tooltip.text(this)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY)  + "px")

        
    })

    .on('mouseout', function(d) {
        d3.select(this)
            .transition()
            .style("r", '5')
            .style('fill', 'steelblue');
       
    })


    // Need to add label too
    
    

})

firstGraph.append("g")
    .attr("class", "axis-label")
    .attr("transform", "translate(250,"+ (290) + ")")
    .append("text")
    .style("text-anchor", "left")
    .text("Trip duration start from")
firstGraph.append("g")
    .attr("class", "axis-label")
    .attr("transform", "translate(-100,"+ (130) + ")")
    .style("text-anchor", "middle")

    .attr("transform", "rotate (-90)")
    .append("text")
    .text("Trip duration end in")

// SECOND GRAPH

let secondGraph = d3.select("svg").append("g")
