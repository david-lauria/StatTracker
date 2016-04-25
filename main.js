/**
 * Team Front Row
 */

src = "//d3js.org/d3.v3.min.js";

var barGraph = {

    margin: {
        top: 40,
        right: 20,
        bottom: 20,
        left: 20
    },
    padding: {
        top: 20,
        bottom: 20,
        right: 20,
        left: 20
    },
    width: 1024,
    height: 650

};

var x, y, color, arc, labelArc;

var generateGraph = function () {

    //begin bar stuff
    var height = 1024;


    var svg = d3.select("#workspace").append("svg")
        .classed("bar-graph", true)
        .attr("width", barGraph.width)
        .attr("height", barGraph.height + barGraph.margin.bottom)
        .attr("style", "background:lightgray")
        .append("g");
    d3.csv(name, type, function (error, data) {
        if (error) throw error;

        select = d3.select("#selector");

        select.on("change", function (d) {
            var major = d3.select(this).property("major");
        });

        select.selectAll("option")
            .data(data)
            .enter()
            .append("option")
            .attr("major", function (d) {
                return d.major;
            })
            .text(function (d) {
                return d.major;
            });

        select = d3.select("#selector2");

        select
            .on("change", function (d) {
                var major = d3.select(this).property("major");
            });

        select.selectAll("option")
            .data(data)
            .enter()
            .append("option")
            .attr("major", function (d) {
                return d.major;
            })
            .text(function (d) {
                return d.major;
            });

        //star bar

        y.domain(data.map(function (d) {
            return d.major;
        }));
        x.domain([0, d3.max(data, function (d) {
            return d.population;
        })]);


        var xAxis = d3.svg.axis(d3.select(".bar-graph"))
            .scale(x)
            .orient("bottom")
            .ticks(10);

        var yAxis = d3.svg.axis(d3.select(".bar-graph"))
            .scale(y)
            .orient("right");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .classed("bar", true)
            .attr("y", function (d) {
                return y(d.major);
            })
            .attr("height", y.rangeBand() * 0.98)
            .attr("width", function (d) {
                return x(d.population);
            });

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(0,0)")
            .call(yAxis)
            .selectAll("text")
            .attr("style", "align:left");

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + barGraph.height + ")")
            .call(xAxis);
        //end bar

    });

    function type(d) {
        //d.major = +d.major;
        d.population = +d.population;
        return d;
    }


};


var generateComparisonGraph = function () {
    d3.select(".bar-graph").remove();
    if (d3.select(".pie-graph")) {
        d3.select(".pie-graph").remove();
    }
    var height = 500;
    var width = 500;


    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
            return d.population;
        });

    var svg = d3.select("#workspace").append("svg")
        .classed("pie-graph", true)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.csv(name, type, function (error, data) {// need to add the formated info in the first argument
        if (error) throw error;

        var selected = [];
        var s1 = document.getElementById("selector")[document.getElementById("selector").selectedIndex].text;
        var s2 = document.getElementById("selector2")[document.getElementById("selector2").selectedIndex].text;

        var j = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].major == s1 || data[i].major == s2) {
                selected[j] = data[i];
                j++;
            }
        }

        var g = svg.selectAll(".arc")
            .data(pie(selected))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function (d) {
                return color(d.data.major);
            });

        d3.selectAll(".arc").append("text")
            .attr("transform", function (d) {
                return "translate(" + labelArc.centroid(d) + ")";
            })
            .attr("y", "0")
            .attr("dy", ".35em")
            .text(function (d) {
                return d.data.major + ": " + d.data.population;
            })
            .call(wrap, "120");

    });


    function type(d) {
        d.population = +d.population;
        return d;
    }

};

function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            console.log(word);
            tspan.text(line.join(" "));
            console.log(tspan.node().getComputedTextLength());
            if (tspan.node().getComputedTextLength() > width) {

                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}

var init = function () {

    var radius = 500 / 2 - 500 * 0.1;
    color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 100);


    labelArc = d3.svg.arc()
        .outerRadius(radius - 20)
        .innerRadius(radius);

    x = d3.scale.linear().range([0, barGraph.width * 0.99]);
    y = d3.scale.ordinal().rangeRoundBands([0, barGraph.height, .1]);
};

