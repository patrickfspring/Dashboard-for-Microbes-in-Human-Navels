
function initialLoad() {
	// Use D3 fetch to read the JSON file - the data from the JSON file is arbitrarily named importedData as the argument
	d3.json("samples.json").then((importedData) => {
		// console.log(importedData);
		var data = importedData;

		console.log(data.names);
		console.log(data.names[0], data.names[152]);
		console.log('made it here');
  
		// Slice the first 10 objects for plotting
		console.log(data.samples[0].sample_values.slice(0,9));

		firstTenSamples = data.samples[0].sample_values.slice(0,9);
		//console.log('made it here too');
  
		// Reverse the array due to Plotly's defaults
		firstTenSamples = firstTenSamples.reverse();
		console.log(firstTenSamples);
		//console.log('made it here toox2');
	
		firstTenSampleIds = data.samples[0].otu_ids.slice(0,9)
		firstTenSampleIds = firstTenSampleIds.reverse();
		firstTenSampleLabels = data.samples[0].otu_labels.slice(0,9)
		firstTenSampleLabels = firstTenSampleLabels.reverse();
		//console.log(firstTenSampleIds);
		//console.log('made it here toox3');
		//var strArr = firstTenSampleIds.map(String);
		//console.log(strArr);

		var trace1 = {
		  x: firstTenSamples.map(row => row),
		  y: firstTenSampleIds.map(row => row),
		  text: firstTenSampleLabels.map(row => row),
		  type: "bar",
		  orientation: "h"
		};
  
		// data
		var chartData = [trace1];
  
		// Apply the group bar mode to the layout
		var layout = {
		  title: "Top 10 OTUs for Selected Individual",
		  yaxis: {
			type: 'category',
			dtick: 1
		  },			  	
		  margin: {
			l: 100,
			r: 100,
			t: 100,
			b: 100
		  }
		};
  
		// Render the plot to the div tag with id "plot"
		Plotly.newPlot("bar", chartData, layout);

		d3.select("#selDataset")
		  .selectAll('myOptions')
		  .data(data.names)
		  .enter()
		  .append('option')
		  .text(function (d) { return d; }) // text showed in the menu
		  .attr("value", function (d) { return d; }) // corresponding value returned by the button
	
	});
};

initialLoad();
  