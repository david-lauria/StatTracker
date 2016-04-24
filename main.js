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
    });

    function type(d) {
        d.population = +d.population;
        return d;
    }


}


var generateComparisonGraph = function(){
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


        // somewhere in this area below i need to use only the values in selector and selector2 and just return that data.
        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .match(document.getElementById("selector").nodeValue || document.getElementById("selector2").nodeValue)
            .style("fill", function(d) { return color(d.data.major); });

        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .match(document.getElementById("selector").nodeValue || document.getElementById("selector2").nodeValue)
            .text(function(d) { return d.data.major; });
    });

    function type(d) {
        d.population = +d.population;
        return d;
    }


}
