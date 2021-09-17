let height = 400;
let width = 400,

margin = { top: 30, right: 0, bottom: 60, left: 30 };

//START creating tooltip
let tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('opacity', 0)
//END creating tooltio

let svg = d3.select("#chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

//START creating left Axis
let y = d3.scaleLinear()
            .range([height, 0]);

function leftAxis(data) {
            y.domain([0,d3.max(data.map((e) => e.students),
            (d) => +(d))]);
        svg.append("g")
        .call(d3.axisLeft(y));
      }

//fetching data
d3.json("hw3data.json").then((data) => {
    leftAxis(data);
    });
//END creating left Axis


//START creating bottom Axis     
let x = d3.scaleBand()
            .range([0, width])
            .padding(0.2);

function bottomAxis(data) {
        x.domain(data.map((e) => e.term));
        const text = svg
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));
        }
//fetching data           
d3.json("hw3data.json").then((data) => {
    bottomAxis(data);
    });
//END creating bottom Axis 

//START creating Bars/rect
function createBars(data) {
        let bars = svg
            .selectAll(".bars")
            .data(data, (d) => d.term)
            .enter()
            .append("g")
            .attr("class", "bars")
            .style("opacity", 1);
            
        // Appending rectangles
        bars
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => x(d.term))
            .attr("y", (d) => y(0))
            .attr("width", x.bandwidth())
            .attr("height", 0)
            .style("fill", "lightblue")
            .attr("y", (d) => y(d.students))
            .attr("height", (d) => height - y(d.students))
        
        //appending events with tooltip
            .on('mouseover', function(event, d) {
                const[x, y] = d3.pointer(event)
                tooltip.transition()
                    .style('opacity', .8)
                    tooltip.html(
                        `Term - ${d.term} <br>
                        Students - ${d.students}`)
                    .style('left', (x + 40) + 'px')
                    .style('top', (y + 30) + 'px')
                d3.select(this)
                    .style('opacity', 1)
            })
            .on('mouseout', function(event, d) {
                d3.select(this)
                    .style('opacity', 1)
                tooltip.html('')
            })};

//fetching data            
d3.json("hw3data.json").then((data) => {
    createBars(data);
    });
//END creating Bars/rect



