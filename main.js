/**
 * Created by Rex Borseth on 4/22/2016.
 */

src="//d3js.org/d3.v3.min.js"

d3.csv.parse(name,function(d) {
        return {
            College: d.College,
            Curriculum: d.Curriculum,
            Major: d.Major,
            Freshmen_M: d.Freshmen_M,
            Freshmen_F: d.Freshmen_F,
            Sophomores_M: d.Sophomores_M,
            Sophomores_F: d.Sophomores_F,
            Juniors_M: d.Juniors_M,
            Juniors_F: d.Juniors_F,
            Seniors_M: d.Seniors_M,
            Seniors_F: d.Seniors_F,
            Specials_M: d.Specials_M,
            Specials_F: d.Specials_F,
            Grand_Total: d.Grand_Total
        };
    }

)

var makeUndergrad = function(){
    displayGraph();
}

var makeGrad = function(){
    
}

var displayGraph = function(){
    document.getElementById("graph").innerHTML = generateGraph();
}

var generateGraph = function(){


}