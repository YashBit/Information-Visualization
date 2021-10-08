let margin = {left: 300, right: 0, up: 300, down:0 };
let gap_between_views = 150;


// Loading the CSV Data

d3.csv("citi_bike_2020.csv", function(data) {
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
}

// const svg = d3.select('body')
//     .append('svg')
//     .attr('width', WIDTH)