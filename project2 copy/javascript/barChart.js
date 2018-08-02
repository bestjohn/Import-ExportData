
var xScale;
var yScale;


var margin = {top:80,right:20,bottom:30,left:100};
var w = 200;
var h = 200;

var padding= 0;

var code1stLevel = [];
var code2ndLevel = [];

for (i in commodity1stLevel) {
    code1stLevelStart = +commodity1stLevel[i][0].slice(0,3);
    code1stLevelEnd = +commodity1stLevel[i][0].slice(4,7);
    
    code1stLevel.push([code1stLevelStart,code1stLevelEnd,commodity1stLevel[i][1]]);
}

for (i in commodity2ndLevel) {
    code2ndLevel.push([+commodity2ndLevel[i][0],commodity2ndLevel[i][1]]);
}

console.log(code1stLevel);
console.log(code2ndLevel);

var svg = d3.select(".barContainer")
    .append("svg")
        .attr("width",w+200)
        .attr("height",h+200)
    .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

var xScale = d3.scaleBand().range([0,w]).padding(0.1);
var yScale = d3.scaleLinear().range([h,0]);

d3.csv("files/consolidated_v3.csv",function(data) {
 
//below variables used exclusively with bar chart
   
    var sumByCountry = d3.nest()
        .key(function(d) {return d.imcountry;})
        .rollup(function(v) { return {
            imtotal2013: d3.sum(v, function(d) {return d.ctry_imval2013;}),
            imtotal2014: d3.sum(v, function(d) {return d.ctry_imval2014;}),
            imtotal2015: d3.sum(v, function(d) {return d.ctry_imval2015;}),
            imtotal2016: d3.sum(v, function(d) {return d.ctry_imval2016;}),
            yScaleTotal: 0,
            
            extotal2013: d3.sum(v, function(d) {return d.ctry_exval2013;}),
            extotal2014: d3.sum(v, function(d) {return d.ctry_exval2014;}),
            extotal2015: d3.sum(v, function(d) {return d.ctry_exval2015;}),
            extotal2016: d3.sum(v, function(d) {return d.ctry_exval2016;})
            
        };
                            })
        .entries(data);
    
    var sumByCommodityImport = d3.nest()
        .key(function(d) {
            code = +d.im_code.slice(0,2);
             for (i in code1stLevel){
                if (code1stLevel[i][0]<=code && code<=code1stLevel[i][1]){
                    code = code1stLevel[i][2];
                    }
                
                }
            return code;
        })
        .rollup(function(v) { return {
            imtotal2013: d3.sum(v, function(d) {return d.imval2013;}),
            imtotal2014: d3.sum(v, function(d) {return d.imval2014;}),
            imtotal2015: d3.sum(v, function(d) {return d.imval2015;}),
            imtotal2016: d3.sum(v, function(d) {return d.imval2016;}),
            
        };
                            })
        .entries(data);
    
    var sumByCommodityExport = d3.nest()
        .key(function(d) {
            code = +d.ex_code.slice(0,2);
            for (i in code1stLevel){
                if (code1stLevel[i][0]<=code && code<=code1stLevel[i][1]){
                    code = code1stLevel[i][2];
                    }
                
                }
            return code;
        })
        .rollup(function(v) { return {
            
            extotal2013: d3.sum(v, function(d) {return d.exval2013;}),
            extotal2014: d3.sum(v, function(d) {return d.exval2014;}),
            extotal2015: d3.sum(v, function(d) {return d.exval2015;}),
            extotal2016: d3.sum(v, function(d) {return d.exval2016;})
        };
                            })
        .entries(data);
    
//below variables used exclusively with pie chart
    
    var stateSumByCountry = d3.nest()
        .key(function(d) {return d.imcountry;})
        .key(function(d) {return d.statename;})
        .rollup(function(v) { return {
            imtotal2013: d3.sum(v, function(d) {return d.ctry_imval2013;}),
            imtotal2014: d3.sum(v, function(d) {return d.ctry_imval2014;}),
            imtotal2015: d3.sum(v, function(d) {return d.ctry_imval2015;}),
            imtotal2016: d3.sum(v, function(d) {return d.ctry_imval2016;}),
            
            
            extotal2013: d3.sum(v, function(d) {return d.ctry_exval2013;}),
            extotal2014: d3.sum(v, function(d) {return d.ctry_exval2014;}),
            extotal2015: d3.sum(v, function(d) {return d.ctry_exval2015;}),
            extotal2016: d3.sum(v, function(d) {return d.ctry_exval2016;})
            
        };
                            })
        .entries(data);
    
    var commodityImportSumByState = d3.nest()
        .key(function(d) {
            code = +d.im_code.slice(0,2);
            for (i in code1stLevel){
                if (code1stLevel[i][0]<=code && code<=code1stLevel[i][1]){
                    code = code1stLevel[i][2];
                    }
                
                }
            return code;
        })
        .key(function(d) {
            return d.statename;
        })
        .rollup(function(v) { return {
            imtotal2013: d3.sum(v, function(d) {return d.imval2013;}),
            imtotal2014: d3.sum(v, function(d) {return d.imval2014;}),
            imtotal2015: d3.sum(v, function(d) {return d.imval2015;}),
            imtotal2016: d3.sum(v, function(d) {return d.imval2016;}),
        };
                            })
        .entries(data);
    
    var commodityExportSumByState = d3.nest()
        .key(function(d) {
            code = +d.ex_code.slice(0,2);
            for (i in code1stLevel){
                if (code1stLevel[i][0]<=code && code<=code1stLevel[i][1]){
                    code = code1stLevel[i][2];
                    }
                
                }
            return code;
        })
        .key(function(d) {
            return d.statename;
        })
        .rollup(function(v) { return {
            extotal2013: d3.sum(v, function(d) {return d.exval2013;}),
            extotal2014: d3.sum(v, function(d) {return d.exval2014;}),
            extotal2015: d3.sum(v, function(d) {return d.exval2015;}),
            extotal2016: d3.sum(v, function(d) {return d.exval2016;}),
        };
                            })
        .entries(data);
    
   
//default graph values-------------------------------------------

    var sortable = [];
        for (var index in sumByCountry) {
            sortable.push([sumByCountry[index].key, sumByCountry[index].value["imtotal2013"]]);
        }
        sortable.sort(function(a,b) {
            return b[1]-a[1];
        });
        sortable = sortable.slice(0,14);
    
     xScale.domain(sortable.map(function(d) {
        return d[0];
    }))
    yScale.domain([0, d3.max(sortable, function(d){
        return d[1];
    })]);
    
    
    svg.selectAll("rect")
        .data(sortable)
        .enter()
        .append("rect")
            .classed("bar",true)
            .attr("x", function(d) {
                return xScale(d);
            })
            .attr("y", function(d) {
                return yScale(d[1]);
            })
            .attr("width",xScale.bandwidth())
            .attr("height",function(d) {
                return h-yScale(d[1]);
            })
            .attr("fill","teal")
            .attr("id", function(d) {
                return d.key});;
    
    svg.append("g")
            .classed("xAxis",true)
            .call(d3.axisBottom(xScale))
            .attr("transform","translate(0," + (h - padding) + ")")
            .selectAll("text")
                .attr("text-anchor","end")
                .attr("transform","rotate(-45)");
    
    svg.append("text")
        .classed("xLabel",true)
        .attr("transform","translate(" + (w/2) + " ," + (h+margin.top+20) + ")")
        .style("text-anchor","middle")
        .text("Country");
    
    svg.append("g").classed("yAxis",true).call(d3.axisLeft(yScale));
    
     svg.append("text")
        .attr("transform","rotate(-90)")
        .attr("y",0-margin.left)
        .attr("x",0-(h/2))
        .attr("dy","1em")
        .style("text-anchor","middle")
        .text("Dollars");
    
//hover effects-------------------------------------------------
 
    svg.selectAll("rect")
        .on("mouseover",mouseover)
        .on("mouseout",mouseout);
    
   
    
    function mouseover(d, i) {
        var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
        var yPosition = parseFloat(d3.select(this).attr("y")) - 50;

        svg.append("text")
        .transition()
        .attr("id", "tooltip")
        .attr("x", xPosition)
        .attr("y", yPosition)
        .attr("text-anchor", "middle")
        .attr("font-family", "Arial Black")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .text(d);


        d3.select(this)
            .transition()
            .attr("fill","red");
    }
    
    function mouseout(d, i) {
        d3.select("#tooltip").remove();
        d3.select(this)
            .transition()
            .attr("fill","teal");
    }
    
//update on selection changes------------------------------------
    
    d3.selectAll(".myInput")
        .on("change", update);
    
    function update() {
        
        //cycle through selection inputs to determine new values
        
        var years = [];
        //var yScaleTotal = 0;
        //var trade = "";
        var category;
        var xLabel;
        
        for (var i=3; i<7; i++) {
            if (d3.select("#y201"+i).property("checked")) {
                years.push(i);
                pieYears = years;
            }
        } 
        
        
        if (d3.select("#import").property("checked")) {
            trade = "im";
            }
        if (d3.select("#export").property("checked")) {
            trade = "ex";
        }
        
        
        if (d3.select("#country").property("checked")) {
            category = sumByCountry;
            pieCategory = stateSumByCountry;
            xLabel = "Country";
        }
        
        if (d3.select("#commodity").property("checked") && trade==="im") {
            category = sumByCommodityImport;
            pieCategory = commodityImportSumByState;
            xLabel = "Commodity"
            
            
            
        }
        
        if (d3.select("#commodity").property("checked") && trade==="ex") {
            category = sumByCommodityExport;
            pieCategory = commodityExportSumByState;
            xLabel = "Commodity";
            
        }
        
        
        
        
 //console.log(sumByCommodityImport[55].key,sumByCommodityImport[55].values[0].key,sumByCommodityImport[55]);
        
        //begin updating graph with new values (years, trade, category)
        
       
        yScale.domain([0, d3.max(category, function(d){
            
            if (years.length==0) {
                d.yScaleTotal=0;
               
            }
            if (years.length==1){
                d.yScaleTotal = d.value[trade+"total201"+years[0]];
                
            }
            if (years.length==2){
                d.yScaleTotal = (d.value[trade+"total201"+years[0]]+d.value[trade+"total201"+years[1]]);
            }
            if (years.length==3){
                d.yScaleTotal =  (d.value[trade+"total201"+years[0]]+d.value[trade+"total201"+years[1]]+d.value[trade+"total201"+years[2]]);
            }
            if (years.length==4){
                d.yScaleTotal =  (d.value[trade+"total201"+years[0]]+d.value[trade+"total201"+years[1]]+d.value[trade+"total201"+years[2]]+d.value[trade+"total201"+years[3]]);
            }
    
           return d.yScaleTotal;
    })]);
        
//        console.log(years);
//        console.log(trade);
//        console.log(category);
        //console.log(pieCategory[0].values);
        
        var sortable = [];
        for (var i=0;i<category.length;i++) {
           
            sortable.push([category[i].key, category[i].yScaleTotal]);
        }
        sortable.sort(function(a,b) {
            return b[1]-a[1];
        });
        sortable = sortable.slice(0,14);
        
        console.log(sortable);
        
         xScale.domain(sortable.map(function(d) {
            return d[0];
    }));
        
    svg.selectAll("rect")
        .data(sortable)
            .transition()
            .attr("x", function(d) {
                return xScale(d[0]);
            })
            .attr("y", function(d) {
                return yScale(d[1]);
            })
            .attr("width",xScale.bandwidth())
            .attr("height",function(d) {
                return h-yScale(d[1]);
            })
            .attr("fill","teal")
            .attr("id", function(d) {
                return d});
    
    svg.select(".xAxis")
            .transition()
            .call(d3.axisBottom(xScale))
            .attr("transform","translate(0," + (h - padding) + ")")
            .selectAll("text")
                .attr("text-anchor","end")
                .attr("transform","rotate(-45)");
        
    svg.select(".xLabel")
        .text(xLabel);
    
    svg.select(".yAxis").transition().call(d3.axisLeft(yScale));
        
   
        
    } //end selection update
    
   update();
    



//begin pie chart creation------------------------------------------
//be wary of global variables!
    
var width = 300;
var height = 150;
    
    
var pie = d3.pie() 
    
    
        var pieVal;
        var stateData = {};
        var statenames = [];
        var stateVals = [];
        var val = 0;
        var pieLabels = [];
    //finds country selected
        pieVal = pieCategory
    
    //finds each state's trade numbers for chosen country
    //saves state's name for index reference after sorting
        for (var i =0; i<pieVal.values.length;i++){
            val=0;
            statenames.push(pieVal.values[i].key);
           for (var j=0;j<pieYears.length;j++) {
               val += pieVal.values[i].value[trade+"total201"+pieYears[j]];
            
               
        }
            
            stateData[i]=val;
            stateVals.push(val);
        };
       
        //sorts trade values
        var sortable = [];
        for (var index in stateData) {
            sortable.push([index, stateData[index]]);
        }
        sortable.sort(function(a,b) {
            return b[1]-a[1];
        });
    
       sortable = sortable.slice(0,5);
        
     
    for (var i=0; i<sortable.length; i++){
        var index = +sortable[i][0];
        pieLabels.push(statenames[index]);
       
    }
    
    
    
    
    
  /*

var data = [0,1,2,3];      
    
var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
    
var svg2 = d3.select(".pieContainer")
            .append("svg")
                .attr("width",width)
                .attr("height",height)
            .append("g")
                .attr("transform","translate(" + width/2 + "," + height/2 + ")");
    
    
var radius = Math.min(width,height) / 2;
    
var arc = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);
    
var label = d3.arc()
            .outerRadius(radius*0.4)
            .innerRadius(radius);
    

    
    
var arcs = svg2.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("g")
            .classed("arc",true);
    
      arcs.append("path")
            .attr("d",arc)
            .attr("fill", function(d,i) {
            return color(i);
            });

       function midAngle(d) {
           return d.startAngle + (d.endAngle - d.startAngle) /2;
       }
            arcs.append("text")
                .attr("text-anchor","middle")
                .attr("transform", function(d) { 
                        d.innerRadius = 0;
                        d.innerRadius = radius;
                        //pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
                        return "translate(" + arc.centroid(d) + ")";
                })
               .text(function(d) { console.log(d.data);return d.data; });
            */
//hover effects-------------------------------------------------
 
    
    

//begin pie update upon clicking of barchart bars
d3.selectAll(".bar")
    .on("click", function(d) {
        updatePie(d)
});
    
function updatePie(categoryKey) {
    
        var pieVal;
        var stateData = {};
        var statenames = [];
        var stateVals = [];
        var val = 0;
        var pieLabels = [];
    //finds country selected
        for (var i=0; i<pieCategory.length;i++){
            if (pieCategory[i].key==categoryKey[0]){
                pieVal = pieCategory[i];
            };
        }//end for loop
    
    //finds each state's trade numbers for chosen country
    //saves state's name for index reference after sorting
        for (var i =0; i<pieVal.values.length;i++){
            val=0;
            statenames.push(pieVal.values[i].key);
           for (var j=0;j<pieYears.length;j++) {
               val += pieVal.values[i].value[trade+"total201"+pieYears[j]];
            
               
        }
            
            stateData[i]=val;
            stateVals.push(val);
        };
       
        //sorts trade values
        var sortable = [];
        for (var index in stateData) {
            sortable.push([index, stateData[index]]);
        }
        sortable.sort(function(a,b) {
            return b[1]-a[1];
        });
    
       sortable = sortable.slice(0,5);
        
     
    for (var i=0; i<sortable.length; i++){
        var index = +sortable[i][0];
        pieLabels.push(statenames[index]);
       
    }
   console.log(pieLabels);
    console.log(sortable);
    
    
    
        //draw pie with stateVals data
    
    
    
    
    /*
     function arcTween(a) {
        var i = d3.interpolate(this._current,a);
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
    };
    var arcs = svg2.selectAll("g.arc")
            .data(pie(pieLabels));
    console.log(arcs);
     arcs.select("text")
            .attr("text-anchor","middle")
            .attr("transform", function(d) { 
                        //var pos= label.centroid(d);
                        //pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
                        //return "translate(" + pos[0] + ")";
                        d.innerRadius = 0;
                        d.innerRadius = radius;
                        //pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
                        return "translate(" + arc.centroid(d) + ")";
                })
            .text(function(d) {console.log(d);return d.data; })
            .style("fill","white");
    
       var arcs = svg2.selectAll("path")
            .data(pie(sortable));
    
           
            
    arcs.exit().remove();
           
            arcs.enter()
            .append("path")
            .merge(arcs)
            .attr("d",arc)
            .attr("fill", function(d,i) {
            return color(i);
        });
         
            

    
    arcs.transition().duration(750).attrTween("d",arcTween);
    
   
   */
    } //end updatePie
    
}); //end d3.csv
    
    //http://bl.ocks.org/dbuezas/9306799
    
    