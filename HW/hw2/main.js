let margin = {left: 300, right: 0, up: 300, down:0 };
let gap_between_views = 150;


//task 1 complete


// Loading the CSV Data

// Todo: Make it only the month of may to display
let newMargin = {left: 150, right:150, top:150, bottom:150};
let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 
'Nov', 'Dec'];
let slider = d3.select('#slider');
let slidertext = d3.select('#slidertext');

selectedMonth = ""


// FIRST GRAPH

const width = 800 - 300;
const height = 900 - 300;
let firstGraph = d3.select('svg').append("g");
firstGraph.attr('transform', "translate(" + 80 + "," +80+ ")");
let secondGraph = d3.select("svg").append("g")
secondGraph.attr("transform", "translate(" + 80 + "," + (150+height/2)+ ")")
// CSV Data Loader and converted. Need to convert it to numerical types 

slider.on("input", function(){
    console.log(this.value);
    slidertext.attr('value', month[this.value-1]);
    d3.selectAll('.point').remove();
    d3.selectAll('.bar').remove();
    d3.selectAll('text').remove();
    display(month[this.value-1]);
   
  });
function display(selectedMonth){
   
    d3.csv("citi_bike_2020.csv").then(function(data) {
        // Converting to Integer after loading data
        
        // selectedMonth = ""
        monthData = data.filter(function(row) {
            return row["month"] == selectedMonth;
        });
        // console.log(" Here")
        // console.log(selectedMonth)
        

        data.forEach(d =>{
            d.station = d.station; 
            d.latitude = +d.latitude;
            d.longitude = +d.longitude;
            d.start = +d.start;
            d.tripdurationS = +d.tripdurationS;
            d.end = +d.end;
            d.tripdurationE = +d.tripdurationE;
            d.month = +d.month;
        });
        let xScale = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(data, (d) => d.tripdurationS)]).nice();
        let xAxis = d3.axisBottom(xScale)
            .ticks(10)
        firstGraph.append('g')
            .attr("transform", "translate(0," + (margin.right+margin.up) + ")")
            .attr('class', 'x-axis')
            .call(xAxis)
        let yScale = d3.scaleLinear()
            .range([height/2, 0])
            .domain([0, d3.max(data, (d) => d.tripdurationE)]).nice();
            // G does not have width and height
        let yAxis = d3.axisLeft(yScale)
            .ticks(5)
        firstGraph.append('g')
            .attr('class', 'y-axis')
            .call(yAxis)
        // May Grouped Data
     

        let div = d3.select("body").append("div")
            .attr("class", "tooltip")  
        // Need to filter May Data
        firstGraph.selectAll('.point')
            .data(monthData)
            // window.alert(54)
            .enter().append('circle')
            .attr('class', 'point')
            .attr('class', d=> `point ${d.station.replace(/[^a-zA-Z]/g, "")}`)
            .attr("cx", d=> xScale(d.tripdurationS))
            .attr("cy", d=> yScale(d.tripdurationE))
            .attr("r", '5')
            .style('fill', 'steelblue')
            .style('stroke', 'black')
            .style('stroke-width', 2)
            .on('mouseover',  (event, d) =>{
                div.transition()
                    .duration(500)
                    .style("opacity", 0.7)
                div.html(d.station)
                .style("left", event.pageX + "px")
                .style("top", event.pageY + "px");
                d3.select(event.target)
                    .transition()
                    .duration(500)
                    .style("r", '10')
                    .style('fill', 'red')  
                d3.select(event.target).style("r", 10);
                console.log(d3.select(event.target));
                let cl = d3.select(event.target).attr("class").substring(6);
                d3.selectAll("."+cl).style("fill", "red");
               
            })
           
            .on("mouseover", function(){
               
                var sel = d3.select(this);
                sel.moveToFront();
            })

            .on('mouseout', function(d) {
                div.transition()
                .duration(500)
                .style("opacity", 0)
                d3.select(this)
                    .transition()
                    .style("r", '5')
                    .style('fill', 'steelblue');
                let cl = d3.select(event.target).attr("class").substring(6);
                d3.selectAll("."+cl).style("fill", "steelblue");
            })
                    
        
        
        // .on('mouseover', function(d) {
        //     div2 .transition()
        //         .duration(200)
        //     div2 .html(d.station)
        //         .style("left", (d3.event.pageX) + "px")
        //         .style("top", (d3.event.pageY -28)+ "px") 
        // })


       

        

    })

    firstGraph.append("g")
        .attr("class", "axis-label")
        .attr("transform", `translate(${width-110}, ${height/2-10})`)
        .append("text")
        .style("text-anchor", "left")
        .text("Trip duration start from")
    firstGraph.append("g")
        .attr("transform", `translate(${20}, ${90})`)
        .style("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .append("text")
        .text("Trip duration end in")

    // SECOND GRAPH




    d3.csv("citi_bike_2020.csv").then(function(data) {

        data.forEach(d =>{
            d.station = d.station; 
            d.latitude = +d.latitude;
            d.longitude = +d.longitude;
            d.start = +d.start;
            d.tripdurationS = +d.tripdurationS;
            d.end = +d.end;
            d.tripdurationE = +d.tripdurationE;
            d.month = +d.month;
        });


        // Sorting:
        monthData.sort(function(a,b) {
            return d3.descending(a.start, b.start);
        })


        let xScale2 = d3.scaleBand()
            .range([0, width])
            //.domain(data.map((d => d.station)));
        let xAxis2 = d3.axisBottom(xScale2)
            //.ticks(50)
    
       
        // Scale    
        let yScale2 = d3.scaleLinear()
            .range([height/2, 0])
            .domain([0, d3.max(data, d => d.start)]).nice();


        // G does not have width and height
        let yAxis2 = d3.axisLeft(yScale2)
            .ticks(5)

        xScale2.domain(monthData.map(function(d) {
            return d.station
        }))
    

        // Attach the X axis
        secondGraph.append('g')
            .attr('transform', 'translate(0, ' + height/2 + ")")
            .attr('class', 'x-axis')
            .call(xAxis2)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-0.8em')
            .attr('dy', '.015em')
            .attr('transform', 'rotate(-65)');

        // Y Axis
        secondGraph.append('g')
            .attr('class', 'y-axis')
            .call(yAxis2)


        // Works: Title
        secondGraph.append("g")
            .attr("transform", `translate(${40}, ${-5})`)
            .append("text")
                .style("text-anchor", "middle")
                .text("Bikers start from");
                
        secondGraph.selectAll('.bar')
            .data(monthData)
            .enter().append('rect')
            .attr('x', d => xScale2(d.station))
            .attr('class', d=>`bar ${d.station.replace(/[^a-zA-Z]/g, "")}`)

            .attr('y', d => yScale2(d.end))
            .attr('width', xScale2.bandwidth())
            .attr('height', d => {return height/2-yScale2(d.end);})
            .style("fill", 'steelblue')
            .style("stroke", "black")
            .style("stroke-width", 2)
        
        .on('mouseover',  (event, d) =>{
        
        
            d3.select(event.target)
                .transition()
                .duration(500)
                .style('fill', 'red')  
            
            let cl = d3.select(event.target).attr("class").substring(4);
            d3.selectAll("."+cl).style("fill", "red").style("r", 10);
                    
        })
        .on('mouseout', (event, d) => {
    
            d3.select(this)
                .transition()
                .style('fill', 'steelblue');
            let cl = d3.select(event.target).attr("class").substring(4);
            d3.selectAll("."+cl).style("fill", "steelblue").style("r", 5);

        })

        
        

    })

}