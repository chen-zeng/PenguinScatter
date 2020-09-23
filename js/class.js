
var hwMean = function(penguin)
{  
    var getGrade = function(homework)
{
    return homework.grade;
};
    var hwGrade = penguin.homework.map(getGrade);
                  var hmean = d3.mean(hwGrade); 
    return hmean;
}

var quizMean = function(penguin)
{  
    var getQuiz = function(quiz)
{
    return quiz.grade;
};
    var quizGrade = penguin.quizes.map(getQuiz);
                  var qmean = d3.mean(quizGrade); 
    return qmean;
}



var drawFinal = function(penguins,screen,xScale,yScale)
{    
    
    d3.select("#scatterplot")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx", function(penguin)
    {
        return xScale(penguin.final[0].grade);
    })
    .attr("cy", function(penguin){return yScale(hwMean(penguin));} )
    .attr("r",2)
    
 .on("mouseenter", function(penguin)
       {
        console.log("hovering")
        
        var xPos = d3.event.pageX;
        var yPos = d3.event.pageY;
        
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
      
         d3.select("#pics")
        .append("img")
         .attr("src", "imgs/"+penguin.picture);
    
    })
    
    .on("mouseleave", function(penguin)
       {
        d3.select("#tooltip")
        .classed("hidden",true);
        
         d3.select("img")
        .remove();
    })

    
    
    
    
}


var drawQuiz = function(penguins,screen,xScale,yScale)
{ 
    d3.select("#scatterplot")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx", function(penguin)
    {
        return xScale(quizMean(penguin));
    })
    .attr("cy", function(penguin){return yScale(hwMean(penguin));} )
    .attr("r",2)
    
 .on("mouseenter", function(penguin)
       {
        console.log("hovering")
        
        var xPos = d3.event.pageX;
        var yPos = d3.event.pageY;
        
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
      
         d3.select("#pics")
        .append("img")
         .attr("src", "imgs/"+penguin.picture);
    
    })
    
    .on("mouseleave", function(penguin)
       {
        d3.select("#tooltip")
        .classed("hidden",true);
        
         d3.select("img")
        .remove();
    })
}
        








var initGraph = function(penguins)
{ 
    var screen = {width:500,height:500}
    
    d3.select("#scatterplot")
    .attr("width", screen.width)
    .attr("height", screen.height)
    
    var xScale = d3.scaleLinear()
               .domain([0,100])
                .range([0,screen.width])
    
    var yScale = d3.scaleLinear()
               .domain([0,100])
                .range([screen.height,0])
    
    d3.select("#quiz")
    .on("click",function()
        {
        console.log("quiz clicked");
         d3.selectAll("circle")
       .remove();
    drawQuiz(penguins,screen,xScale,yScale);
    
    })
    
   d3.select("#final")
    .on("click",function()
        {
        console.log("final clicked");
     d3.selectAll("circle")
       .remove();
    drawFinal(penguins,screen,xScale,yScale);
    
    })
    
    
    
}












var penguinPromise = d3.json("json/classData.json")

var setBanner = function(message)
{
    d3.select("#banner")
    .text(message);
}

var successFCN = function(penguins)
{
    console.log("penguins",penguins);
    setBanner("Here is the Scatterplot");
    initGraph(penguins);
    
}

var failFCN = function(error)
{
    console.log("error",error);
    setBanner("Scatterplot is missing");
    
}



penguinPromise.then(successFCN,failFCN)