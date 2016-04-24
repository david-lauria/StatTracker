/**
 * Created by Rex Borseth on 4/22/2016.
 */

src="//d3js.org/d3.v3.min.js"


// an attempt to use d3 to parse data

/*
var makeUndergrad = function(){
    var data = d3.csv.parse(name,function(d) {
            return {
                College: d.College,
                Curriculum: d.Curriculum,
                Freshmen_M: +d.Freshmen_M,
                Freshmen_F: +d.Freshmen_F,
                Sophomores_M: +d.Sophomores_M,
                Sophomores_F: +d.Sophomores_F,
                Juniors_M: +d.Juniors_M,
                Juniors_F: +d.Juniors_F,
                Seniors_M: +d.Seniors_M,
                Seniors_F: +d.Seniors_F,
                Specials_M: +d.Specials_M,
                Specials_F: +d.Specials_F,
                Grand_Total: +d.Grand_Total
            };
        }
    )
    subbuttons(data);
    displayGraph();
}*/

var generateGraph = function(){

    //begin bar stuff

    var margin = {top: 20, right: 20, bottom: 400, left: 100},
        width = 1050 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "");

    var svg = d3.select("#workspace").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //end bar stuff

/*
    var width = 500,
        height = 500,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 150);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.population; });

    var svg = d3.select("#workspace").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
*/

    d3.csv(name , type, function(error, data) {
        if (error) throw error;

    var select = d3.select("#selector")

    select
      .on("change", function(d) {
        var major = d3.select(this).property("major");
      });

    select.selectAll("option")
      .data(data)
      .enter()
        .append("option")
        .attr("major", function (d) { return d.major; })
        .text(function (d) { return d.major; });
         var select = d3.select("#selector2")

    select
      .on("change", function(d) {
        var major = d3.select(this).property("major");
      });

    select.selectAll("option")
      .data(data)
      .enter()
        .append("option")
        .attr("major", function (d) { return d.major; })
        .text(function (d) { return d.major; });

        //star bar

        x.domain(data.map(function(d) { return d.major; }));
        y.domain([0, d3.max(data, function(d) { return d.population; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
                .style("text-anchor","end")
                .attr("dx","-.5em")
                .attr("dy",".15em")
                .attr("transform", "rotate(-70)");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Number of Students");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.major); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.population); })
            .attr("height", function(d) { return height - y(d.population); });

        //end bar

/*

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color(d.data.major); });

        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function(d) { return d.data.major; });
*/
    });

    function type(d) {
        d.major = d.major;
        d.population = +d.population;
        return d;
    }


}


var generateComparisonGraph = function(){
    d3.select("svg").remove();
    var width = 500,
        height = 500,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 150);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.population; });

    var svg = d3.select("#workspace").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.csv(name , type, function(error, data) {// need to add the formated info in the first argument
        if (error) throw error;

            var selected = [];
            var s1 = document.getElementById("selector")[document.getElementById("selector").selectedIndex].text;
            var s2 = document.getElementById("selector2")[document.getElementById("selector2").selectedIndex].text;

            var j = 0;
            for(var i = 0; i < data.length; i++){
            if(data[i].major == s1 || data[i].major == s2){
                selected[j] = data[i];
                j++;
            }
            }


        // somewhere in this area below i need to use only the values in selector and selector2 and just return that data.
        var g = svg.selectAll(".arc")
            .data(pie(selected))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color(d.data.major); }); // this needs to be fixed now somehow.... it just colors in black with the new array.

        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function(d) { return d.data.major; });
    });

    function type(d) {
        d.population = +d.population;
        return d;
    }


}
