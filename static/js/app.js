var data = []
// var listOfids = []
// function updateBar(id) {
var dropdownMenu = d3.select("#selDataset");


function init() {
    d3.json("samples.json").then((data) => {
        //  Create the Traces
        data.names.forEach((name => {
            var listOfids = dropdownMenu.append("option");
            listOfids.text(name);
        }));
        // var init_id = listOfids.property('values');

    });

};
var x = ""
var y = ""
var h = ""
function changeBar() {
    d3.json("samples.json").then((data) => {
        var samples = Object.values(data.samples)
        var init_id = d3.select("#selDataset").node().value
        var singlePerson = samples.filter((function (d) { return d.id === init_id }))
        var x = singlePerson.map(values => values.sample_values)
        var xs = x[0].slice(0, 10)
        var y = singlePerson.map(ids => ids.otu_ids)
        var ys = String(y[0].slice(0, 10))
        var h = singlePerson.map(label => label.otu_labels)
        var hs = h[0].slice(0, 10)
        var trace1 = {
            y: ys,
            x: xs,
            ylabels: ys,
            text: hs,
            mode: "bar+text",
            type: 'bar',
            orientation: "h"
        };
        var layout = {
            title: 'Bacteria Found',
            font: {
                family: 'Raleway, sans-serif'
            },
            showlegend: false,
            yaxis: {
                zeroline: false,
                gridwidth: 2
            },
            bargap: 0.05
        };
        var trace2 = {
            x: y[0],
            y: x[0],
            mode: 'markers',
            text: h[0],
            marker: {
                color: y[0],
                size: x[0]
            }
        };

        var layout2 = {
            title: 'Bacteria Bubbles',
            font: {
                family: 'Raleway, sans-serif'
            },
            showlegend: false,
            yaxis: {
                zeroline: false,
                gridwidth: 2
            },
            bargap: 0.05
        };


        var metaData = Object.values(data.metadata);
        var meta_id = parseInt(d3.select("#selDataset").node().value)
        var singleMeta = metaData.filter((function (d) { return d.id === meta_id }))

        console.log(singleMeta[0].id);
        // var ages = metaData.map(person => person.age);

        // // Next, use math.js to calculate the mean, median, mode, var, and std of the ages
        var id = singleMeta[0].id;
        var ethnicity = singleMeta[0].ethnicity;
        var gender = singleMeta[0].gender;
        var age = singleMeta[0].age;
        var location = singleMeta[0].location;
        var bbtype = singleMeta[0].bbtype;


        // Then, select the unordered list element by class name
        var list = d3.select("#list");

        // remove any children from the list to
        list.html("");

        // append stats to the list
        list.append("tr").text(`Id: ${id}`);
        list.append("li").text(`Ethnicity: ${ethnicity}`);
        list.append("li").text(`Gender: ${gender}`);
        list.append("li").text(`Age: ${age}`);
        list.append("li").text(`Location: ${location}`);
        list.append("li").text(`Blood Type: ${bbtype}`);


        var data1 = [trace1]
        var data2 = [trace2]
        Plotly.newPlot("bubble", data2, layout2);

        Plotly.newPlot("bar", data1, layout);

    });

};

//     console.log(data.sort("names"))

//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");

//     var data = data.sort("names")


//     // Create the data array for the plot
//     var data = [trace1];

//     // Define the plot layout
//     var layout = {
//         title: "Square Root of Cancer Survival by Organ",
//         xaxis: { title: "Organ" },
//         yaxis: { title: "Square Root of Survival" }
//     };

//     // Plot the chart to a div tag with id "plot"
//     Plotly.newPlot("bar", data);
// });

// }

init();
d3.select("#selDataset").on("change", changeBar);
