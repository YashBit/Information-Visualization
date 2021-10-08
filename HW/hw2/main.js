let margin = {left: 300, right: 0, up: 300, down:0 };
let gap_between_views = 150;


// Loading the CSV Data

// Todo: Make it only the month of may to display
let newMargin = {left: 150, right:150, top:150, bottom:150};


// FIRST GRAPH

const width = 800;
const height = 900;
let firstGraph = d3.select('svg').append("g");
firstGraph.attr('transform', `translate(${newMargin.left}, ${newMargin.top})`)

// Data 
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
})

    // Axis and scale

    // X Axis and Scale
let xScale = d3.scaleLinear()
    .range([0, width - (newMargin.left + newMargin.right)])
    .domain([0, d3.max(data, (d) => d.tripdurationS)]);
let xAxis = d3.axisBottom(xScale)
firstGraph.append('g')
    .attr("transform", "translate(0, " + (newMargin.left+100) + ")")
    .attr('class', 'x-axis')
    .call(xAxis)

// Y Scale
let yScale = d3.scaleLinear()
    .range([height - (newMargin.left + newMargin.right), 0])
    .domain([0, d3.max(data, (d) => d.tripdurationE)]);
    // G does not have width and height
let yAxis = d3.axisLeft(yScale)
    .ticks(500)
firstGraph.append('g')
    // .attr("transform", "translate(0, " + (newMargin.left+100) + ")")
    .attr('class', 'y-axis')
    .call(yAxis)


// Now we add axis labels

// Adding the scatter plots


// Interaction





// SECOND GRAPH













let secondGraph = d3.select("svg").append("g")

    // Need Only the Month of May    
    // Setting Scales and Axes for Scatter Plot


