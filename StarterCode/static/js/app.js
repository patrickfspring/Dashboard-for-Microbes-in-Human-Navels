
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
		  y: firstTenSampleIds.map(row => ("OTU " + String(row))),
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
			title: 'Bacteria Cultures per Sample',
			xaxis: {
				title: 'OTU ID',
				titlefont: {
				  family: 'Arial, sans-serif',
				  size: 16,
				  color: 'black'
				}
			},
			showlegend: false,
			height: 800,
			width: 2400
		};
		  
		Plotly.newPlot('bubble', bubbleData, layout);

		// Metadata details

		var metadict = {};
		metadict = data.metadata[0];	
		for (var property in metadict) {
	 		if (metadict.hasOwnProperty(property)) {
			var x = document.createElement("H6");
			var t = document.createTextNode(String(property) + ': ' + String(metadict[property]));
			var parent  = document.getElementById('sample-metadata');
			parent.appendChild(t);
			var x = document.createElement("br");
			parent.appendChild(x);
			}
		}
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
		  y: firstTenSampleIds.map(row => ("OTU " + String(row))),
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

		var bubbleData = [trace1];
		  
		var layout = {
			title: 'Bacteria Cultures Per Sample',
			xaxis: {
				title: 'OTU ID',
				titlefont: {
				  family: 'Arial, sans-serif',
				  size: 16,
				  color: 'black'
				}
			},
			showlegend: false,
			height: 800,
			width: 2400
		};
		  
		Plotly.newPlot('bubble', bubbleData, layout);

		// Metadata details

		var metadict = {};
		//var myCleanup = document.getElementById('sample-metadata');
		//myCleanup.removeChild();
		var div = document.getElementById('sample-metadata');
		while(div.firstChild){
   			 div.removeChild(div.firstChild);
		}	
		metadict = data.metadata[sampleKey];	
		for (var property in metadict) {
	 		if (metadict.hasOwnProperty(property)) {
				var x = document.createElement("H6");
				var t = document.createTextNode(String(property) + ': ' + String(metadict[property]));
				var parent  = document.getElementById('sample-metadata');
				parent.appendChild(t);
				var x = document.createElement("br");
				parent.appendChild(x);
			}
		}
	});
};

initialLoad();
  