// ----------------------------------------------------------------
// Basic
(function(d3) {
	var sizes = getSizes();
	var width = sizes.baseWidth;
	var height = sizes.baseHeight;

	// something
	// to convert values to coordinates
	var x = d3.time.scale().range([0,width]);
	var y = d3.scale.linear().range([height,0]);

	// line generator
	// to write a line (path)
	var line = d3.svg.line();
	line.x(d=>x(d.date));
	line.y(d=>y(d.value));

	// --------------------------------
	// render a chart according to the data

	var data = getData();

	// desice extents of both axises
	x.domain(d3.extent(data, d=>d.date));
	y.domain(d3.extent(data, d=>d.value));

	// create a root SVG element
	var svg = d3.select('#basic').append('svg');
	svg.attr('width', width);
	svg.attr('height', height);

	// write a line
	svg.append('path')
		.datum(data)
		.style('fill', 'none')
		.style('stroke', '#000')
		.attr('d', line);
})(d3);

// ----------------------------------------------------------------
// Axis
(function(d3) {
	var sizes = getSizes();
	var margin = sizes.margin;
	var baseWidth = sizes.baseWidth;
	var baseHeight = sizes.baseHeight;
	var width = baseWidth - margin.left - margin.right;
	var height = baseHeight - margin.top - margin.bottom;

	var x = d3.time.scale().range([0,width]);
	var y = d3.scale.linear().range([height,0]);

	var xAxis = d3.svg.axis();
	xAxis.scale(x);
	xAxis.orient('bottom');

	var yAxis = d3.svg.axis();
	yAxis.scale(y);
	yAxis.orient('left');

	var line = d3.svg.line();
	line.x(d=>x(d.date));
	line.y(d=>y(d.value));

	var svg = d3.select('#axis').append('svg');
	svg.attr('width', baseWidth);
	svg.attr('height', baseHeight);

	var base = svg.append('g');
	base.attr('transform', `translate(${margin.left}, ${margin.top})`);

	var data = getData();

	x.domain(d3.extent(data, d=>d.date));
	y.domain(d3.extent(data, d=>d.value));

	base.append('g')
		.attr('class', 'x axis')
		.attr('transform', `translate(0, ${height})`)
		.call(xAxis);

	base.append('g')
		.attr('class', 'y axis')
		.call(yAxis)
		.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', 6)
			.attr('dy', '.71em')
			.style('text-anchor', 'end')
			.text('Price ($)');

	base.append('path')
		.datum(data)
		.attr('class', 'line')
		.attr('d', line);
})(d3);

function getSizes() {
	var sizes = {
		baseHeight: 300,
		margin: {
			bottom: 30,
			left: 50,
			right: 20,
			top: 20,
		},
		baseWidth: 800,
	};
	sizes.height = sizes.baseHeight - sizes.margin.top - sizes.margin.bottom;
	sizes.width = sizes.baseWidth - sizes.margin.left - sizes.margin.right;
	return sizes;
}

function getData() {
	return [
		{date:'2007-05-01', value:129.47},
		{date:'2007-06-01', value:118.4},
		{date:'2007-07-01', value:121.26},
		{date:'2007-08-01', value:135},
		{date:'2007-09-01', value:144.16},
		{date:'2007-10-01', value:156.34},
		{date:'2007-11-01', value:187.44},
		{date:'2007-12-01', value:178.86},
		{date:'2008-01-01', value:194.84},
		{date:'2008-02-01', value:133.75},
		{date:'2008-03-01', value:121.73},
		{date:'2008-04-01', value:149.53},
		{date:'2008-05-01', value:180},
		{date:'2008-06-01', value:186.1},
		{date:'2008-07-01', value:174.68},
		{date:'2008-08-01', value:156.66},
		{date:'2008-09-01', value:166.19},
		{date:'2008-10-01', value:109.12},
		{date:'2008-10-01', value:111.04},
		{date:'2008-11-01', value:92.67},
		{date:'2008-12-01', value:86.61},
		{date:'2009-01-01', value:94.2},
		{date:'2009-02-01', value:89.31},
		{date:'2009-03-01', value:104.49},
		{date:'2009-04-01', value:123.9},
		{date:'2009-05-01', value:135.07},
		{date:'2009-06-01', value:142.44},
		{date:'2009-07-01', value:160.1},
		{date:'2009-08-01', value:167.41},
		{date:'2009-09-01', value:182.37},
		{date:'2009-10-01', value:202.48},
		{date:'2009-11-01', value:204.44},
		{date:'2009-12-01', value:202.1},
		{date:'2010-01-01', value:208.07},
		{date:'2010-02-01', value:201.67},
		{date:'2010-03-01', value:224.75},
		{date:'2010-04-01', value:244.59},
		{date:'2010-05-01', value:248.34},
		{date:'2010-06-01', value:271.87},
		{date:'2010-07-01', value:249.9},
		{date:'2010-08-01', value:247.64},
		{date:'2010-09-01', value:268.06},
		{date:'2010-10-01', value:300.14},
		{date:'2010-11-01', value:316.66},
		{date:'2010-12-01', value:321.67},
		{date:'2011-01-01', value:344.42},
		{date:'2011-02-01', value:356.85},
		{date:'2011-03-01', value:345.43},
		{date:'2011-04-01', value:336.13},
		{date:'2011-05-01', value:340.5},
		{date:'2011-06-01', value:332.44},
		{date:'2011-07-01', value:357.77},
		{date:'2011-08-01', value:376.99},
		{date:'2011-09-01', value:384.62},
		{date:'2011-10-01', value:402.19},
		{date:'2011-11-01', value:385.22},
		{date:'2011-12-01', value:391.84},
		{date:'2012-01-01', value:421.39},
		{date:'2012-02-01', value:502.6},
		{date:'2012-03-01', value:589.58},
		{date:'2012-04-01', value:605.23},
		{date:'2012-05-01', value:582.13},
	].map(v=>{ v.date=new Date(v.date); return v; });
}
