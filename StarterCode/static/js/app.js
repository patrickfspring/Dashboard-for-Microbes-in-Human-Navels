
function initialLoad() {
	// Use D3 fetch to read the JSON file - the data from the JSON file is arbitrarily named importedData as the argument
	d3.json("samples.json").then((importedData) => {
		// console.log(importedData);
		var data = importedData;

		console.log(data.names);
		console.log(data.names[0], data.names[152]);
		console.log('made it here');
  
		// Slice the first 10 objects for plotting
		console.log(data.samples[0].sample_values.slice(0,10));

		firstTenSamples = data.samples[0].sample_values.slice(0,10);
		//console.log('made it here too');
  
		// Reverse the array due to Plotly's defaults
		firstTenSamples = firstTenSamples.reverse();
		console.log(firstTenSamples);
		//console.log('made it here toox2');
	
		firstTenSampleIds = data.samples[0].otu_ids.slice(0,10)
		firstTenSampleIds = firstTenSampleIds.reverse();
		firstTenSampleLabels = data.samples[0].otu_labels.slice(0,10)
		firstTenSampleLabels = firstTenSampleLabels.reverse();
		//console.log(firstTenSampleIds);

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
	
		// Bubble chart preparation  
		var trace1 = {
			x: data.samples[0].otu_ids,
			y: data.samples[0].sample_values,
			text: data.samples[0].otu_labels,
			mode: 'markers',
			marker: {
				color: data.samples[0].otu_ids,	
				size: data.samples[0].sample_values
			}
		};
		  
		var bubbleData = [trace1];
		  
		var layout = {
			title: 'Bubble Chart Hover Text',
			showlegend: false,
			height: 800,
			width: 2400
		};
		  
		Plotly.newPlot('bubble', bubbleData, layout);

		// Metadata details

		//var metadict = {};
		//metadict = data.metadata[0];
		//let arr1 = metadict.map { "\($0) \($1)" };	
		//var arr1 = [String]();
		//	for (key, value) in metadict {
    	//	arr1.append("\(key) \(value)")
		//};
		//
		//var arr1 = [];
		//var metadict = {};
		//metadict = data.metadata[0];	
		//for (var key in metadict) {
   		//	if (metadict.hasOwnProperty(key)) {
        //		arr1.push( [ key, metadict[key] ] );
    	//	}
		//}
		//console.log('hey - arr1');
		//console.log(arr1);
		
		var keys = [],
			vals = [];
		var metadict = {};
		metadict = data.metadata[0];	
		for (var property in metadict) {
	 		if (metadict.hasOwnProperty(property)) {
	  			keys.push(property);
	  			vals.push(metadict[property]);
			 }
		}
		
		//for (let i = 0; i < (keys).length; i++) 
		//	for (let j = 0; j < (vals).length; j++)
		
		var metavalues = [keys, vals];

		var data = [{
			type: 'table',
			header: {
				//values: [["Demographic Info"]],
   				//align: "left"
   				//line: {width: 1, color: 'black'},
   				//fill: {color: "grey"},
   				//font: {family: "Arial", size: 10, color: "white"}
			},
			cells: {
			  values: metavalues,
			  align: "center",
			  line: {color: "black", width: 1},
			  font: {family: "Arial", size: 8, color: ["black"]}
			}
		}]
		  
		Plotly.newPlot('gauge', data);
	
	});
};

function optionChanged(selectedSample) {
	//console.log(selectedSample);
	d3.json("samples.json").then((importedData) => {
		var data = importedData;
		//console.log(data.names);
		for (let i = 0; i < (data.names).length; i++) {
			if (data.names[i] == selectedSample) sampleKey = i;
		}
		console.log(sampleKey);

		// Slice the first 10 objects for plotting
		//console.log(data.samples[sampleKey].sample_values.slice(0,9));

		firstTenSamples = data.samples[sampleKey].sample_values.slice(0,10);
		//console.log('made it here too');
  
		// Reverse the array due to Plotly's defaults
		firstTenSamples = firstTenSamples.reverse();
		console.log(firstTenSamples);
		//console.log('made it here toox2');
	
		firstTenSampleIds = data.samples[sampleKey].otu_ids.slice(0,10)
		firstTenSampleIds = firstTenSampleIds.reverse();
		firstTenSampleLabels = data.samples[sampleKey].otu_labels.slice(0,10)
		firstTenSampleLabels = firstTenSampleLabels.reverse();
		//console.log(firstTenSampleIds);

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

		// Bubble chart preparation  
		var trace1 = {
			x: data.samples[sampleKey].otu_ids,
			y: data.samples[sampleKey].sample_values,
			text: data.samples[sampleKey].otu_labels,
			mode: 'markers',
			marker: {
				color: data.samples[sampleKey].otu_ids,	
				size: data.samples[sampleKey].sample_values
			}
		};
		console.log('Am I redoing the Bubble chart?')  
		var bubbleData = [trace1];
		  
		var layout = {
			title: 'Bubble Chart Hover Text',
			showlegend: false,
			height: 800,
			width: 2400
		};
		  
		Plotly.newPlot('bubble', bubbleData, layout);

	});
};

initialLoad();
  