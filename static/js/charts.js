queue()
    .defer(d3.json, '/world_cup_finals/statistics')
    .await(multiGraphs);

function multiGraphs(error, wcStats) {
    makeGraphs(error, wcStats);
    makeRow(error, wcStats);
    makePie(error, wcStats);
}

function makeGraphs(error, wcStats) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    //Create a Crossfilter instance
    var ndx = crossfilter(wcStats);

    //Define Dimensions - main category
    var yearDim = ndx.dimension(function (d) {
        return d['Year'];
    });
    var teamDim = ndx.dimension(dc.pluck('Team'));

    var allGoals = ndx.groupAll().reduceSum(dc.pluck('Goals_for'));

    //Calculate metrics and groups
    var goalsByYear = yearDim.group().reduceSum(dc.pluck('Goals_for'));
    var goalsPerTeam = teamDim.group().reduceSum(dc.pluck('Goals_for'));        //var goalsPerTeam = teamDim.group() - this will simply give the count of times each team participated

    var yearGroup = yearDim.group();

    //Charts
    var timeChart = dc.barChart('#time-chart');
    var pieChart = dc.pieChart('#pie-chart');

    timeChart
        .ordinalColors(["#bdb289"])
        .width(1200)
        .height(350)
        .margins({top: 30, right: 50, bottom: 50, left: 50})
        .gap(6)             //increase the gaps between bars - this has to be placed before methods that set an axis
        //.barPadding(0.1)
        .dimension(yearDim) //x-axis
        .group(goalsByYear) //y-axis
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel('Tournaments by year')      //('Label name', 50) - this will add padding between the label and edge of box
        .yAxis().ticks(4);

    pieChart
        .ordinalColors(["#89bede", "#b1d5e7", "#ffb57f", "#fdd9b5", "#6ad48b", "#7aef9e"])
        .height(350)
        .radius(140)
        .innerRadius(40)
        .transitionDuration(1000)
        .dimension(teamDim)
        .group(goalsPerTeam);

    var selectYear = dc.selectMenu('#year-selector');

    selectYear
        .dimension(yearDim)
        .group(yearGroup);

    var totalGoals = dc.numberDisplay('#total-goals');

    totalGoals
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(allGoals);

    dc.renderAll();
}

function makeRow(error, wcStats){
    if (error) {
        console.error("makePie error on receiving dataset:", error.statusText);
        throw error;
    }

    var ndx = crossfilter(wcStats);

    //Create a "fake group" to remove empty (0) values or groups from chart display
    //Variable names below have been swapped to aid this process
    var placeDim = ndx.dimension(dc.pluck('Team')).group();
    var allWinners = ndx.dimension(dc.pluck('Place')).filter('1');

    //Function that generates a fake group that is then passed to dc.js instead of original group
    function remove_empty_bins(source_group) {
        return {
            all:function () {
                return source_group.all().filter(function (d) {
                    return d.value !== 0;
                });
            }
        };
    }

    //Create the fake group (the function [with original group as parameter] is assigned to it) that will pass info into the chart
    var filteredGroup = remove_empty_bins(placeDim);

    var winnersRowChart = dc.rowChart('#winners-row-chart');

    winnersRowChart
        .width(550)
        .height(350)
        .margins({top: 30, right: 50, bottom: 60, left: 50})
        .dimension(allWinners)
        .group(filteredGroup)
        .ordering(function(d) {return -d.value})        //add sorting to the chart (use "d.value" to reverse sort)
        .xAxis().ticks(4);

    dc.renderAll();

    //Code that adds an x-axis label to the row chart
    function AddXAxis(chartToUpdate, displayText) {
            chartToUpdate.svg()
                .append("text")
                .attr("class", "x-axis-label")
                .attr("text-anchor", "middle")
                .attr("x", chartToUpdate.width() / 2)
                .attr("y", chartToUpdate.height() - 12)     //adjust padding at the bottom
                .text(displayText);
    }
    //This line has to go below the chart code
    AddXAxis(winnersRowChart, "Number of World Cups");
}

function makePie(error, wcStats) {
    if (error) {
        console.error("makePie error on receiving dataset:", error.statusText);
        throw error;
    }

    var ndx = crossfilter(wcStats);

    var allWinners = ndx.dimension(dc.pluck('Team')).group();
    var placeDim = ndx.dimension(dc.pluck('Place')).filter('2');

    var runnersupChart = dc.pieChart('#runners-up-chart');

    runnersupChart
        .ordinalColors(["#89bede", "#b1d5e7", "#ffb57f", "#6ad48b"])
        .height(350)
        .radius(140)
        .innerRadius(40)
        .transitionDuration(1000)
        .dimension(placeDim)
        .group(allWinners);

    dc.renderAll();
}

//Style the 'Total goals' (dc.numberDisplay) box upon page load
function styleNumberDisplay() {
    var styles = {
        'background': '#33CC99',
        'position': 'relative',
        'font-size': '50px',
        'color': 'white',
        'vertical-align': 'middle',
        'text-align': 'center',
        'width': '100%'
    };

    $('#total-goals').css(styles);
}

styleNumberDisplay();