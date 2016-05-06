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

	var data = getData('line');

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
	var baseWidth = sizes.baseWidth;  // SVG area size
	var baseHeight = sizes.baseHeight;
	var margin = sizes.margin;
	var width = baseWidth - margin.left - margin.right;  // chart size
	var height = baseHeight - margin.top - margin.bottom;

	// something
	// to convert values to coordinates
	var x = d3.time.scale().range([0,width]);
	var y = d3.scale.linear().range([height,0]);

	// X Axis
	var xAxis = d3.svg.axis();
	xAxis.scale(x);
	xAxis.orient('bottom');

	// Y Axis
	var yAxis = d3.svg.axis();
	yAxis.scale(y);
	yAxis.orient('left');

	// line generator
	// to write a line (path)
	var line = d3.svg.line();
	line.x(d=>x(d.date));
	line.y(d=>y(d.value));

	// --------------------------------
	// render a chart according to the data

	var data = getData('line');

	// desice extents of both axises
	x.domain(d3.extent(data, d=>d.date));
	y.domain(d3.extent(data, d=>d.value));

	// create a root SVG element
	var svg = d3.select('#axis').append('svg');
	svg.attr('width', baseWidth);
	svg.attr('height', baseHeight);

	// base group
	var base = svg.append('g');
	base.attr('transform', `translate(${margin.left}, ${margin.top})`);

	// write a line
	base.append('path')
		.datum(data)
		.attr('class', 'line')
		.attr('d', line);

	// write X axis
	base.append('g')
		.attr('class', 'x axis')
		.attr('transform', `translate(0, ${height})`)  // move to bottom
		.call(xAxis);

	// write Y axis
	base.append('g')
		.attr('class', 'y axis')
		.call(yAxis);
})(d3);

// ----------------------------------------------------------------
// Area
(function(d3) {
	var sizes = getSizes();
	var baseWidth = sizes.baseWidth;  // SVG area size
	var baseHeight = sizes.baseHeight;
	var margin = sizes.margin;
	var width = baseWidth - margin.left - margin.right;  // chart size
	var height = baseHeight - margin.top - margin.bottom;

	// something
	// to convert values to coordinates
	var x = d3.time.scale().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);

	// ?
	var color = d3.scale.category20();

	// X axis
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient('bottom');

	// Y axis
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient('left')
		.tickFormat(d3.format('.0%'));  // convert 0.1 to "10%"

	// area generator
	// to draw a area (path)
	var area = d3.svg.area()
		.x(function(d) { return x(d.date); })
		.y0(function(d) { return y(d.y0); })
		.y1(function(d) { return y(d.y0 + d.y); });

	// ?
	var stack = d3.layout.stack()
		.values(function(d) { return d.values; });

	// --------------------------------
	// render a chart according to the data

	var originalData = getData('area');

	// covert a date text to an instance
	originalData.forEach(function(d) {
		d.date = new Date(d.date);
	});


	// create a root SVG element
	var svg = d3.select('body').append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	// ?
	color.domain(d3.keys(originalData[0]).filter(function(key) { return key !== 'date'; }));

	// build render data
	var data = stack(color.domain().map(function(name) {
		return {
			name: name,
			values: originalData.map(function(d) {
				return {date: d.date, y: d[name] / 100};
			})
		};
	}));

	// desice extents of both axises
	// (y axis is always 0-100%.)
	x.domain(d3.extent(originalData, function(d) { return d.date; }));

	// prepare each area chart
	var browser = svg.selectAll('.browser')
		.data(data)
		.enter().append('g')
		.attr('class', 'browser');

	// draw each area
	browser.append('path')
		.attr('class', d=>`area ${d.name}`)
		.attr('d', d=>area(d.values));

	// draw x axis
	svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis);

	// draw y axis
	svg.append('g')
		.attr('class', 'y axis')
		.call(yAxis);
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
		baseWidth: 650,
	};
	sizes.height = sizes.baseHeight - sizes.margin.top - sizes.margin.bottom;
	sizes.width = sizes.baseWidth - sizes.margin.left - sizes.margin.right;
	return sizes;
}

function getData(type) {
	if (type === 'line') {
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
	else if (type === 'area') {
		return [
			{ date:'2011-10-13', ie:41.62, ch:22.36, fx:25.58, sf:9.13, op:1.22 },
			{ date:'2011-10-24', ie:42.69, ch:22.14, fx:24.95, sf:8.98, op:1.15 },
			{ date:'2011-11-04', ie:41.64, ch:23.21, fx:25.05, sf:8.78, op:1.23 },
			{ date:'2011-11-15', ie:41.54, ch:23.17, fx:24.96, sf:9.09, op:1.16 },
			{ date:'2011-11-26', ie:38.82, ch:24.92, fx:24.88, sf:10.03, op:1.27 },
			{ date:'2011-12-07', ie:41.42, ch:23.73, fx:24.72, sf:8.84, op:1.2 },
			{ date:'2011-12-18', ie:37.19, ch:25.81, fx:25.32, sf:10.14, op:1.45 },
			{ date:'2011-12-29', ie:41.89, ch:24.15, fx:24.04, sf:8.6, op:1.23 },
			{ date:'2012-01-09', ie:40.12, ch:24.71, fx:24.69, sf:9.24, op:1.16 },
			{ date:'2012-01-20', ie:39.08, ch:25.58, fx:24.96, sf:8.98, op:1.32 },
			{ date:'2012-01-31', ie:38.74, ch:25.83, fx:24.61, sf:9.3, op:1.44 },
			{ date:'2012-02-11', ie:34.62, ch:28.34, fx:24.99, sf:10.43, op:1.53 },
			{ date:'2012-02-22', ie:38.65, ch:26.27, fx:24.44, sf:9.19, op:1.36 },
			{ date:'2012-03-04', ie:34.14, ch:29.12, fx:24.76, sf:10.42, op:1.47 },
			{ date:'2012-03-15', ie:38.68, ch:26.5, fx:24.41, sf:9.03, op:1.27 },
			{ date:'2012-03-26', ie:38.33, ch:26.62, fx:24.66, sf:8.98, op:1.32 },
			{ date:'2012-04-06', ie:36.59, ch:27.74, fx:25, sf:9.04, op:1.53 },
			{ date:'2012-04-17', ie:38.17, ch:26.95, fx:24.61, sf:8.72, op:1.45 },
			{ date:'2012-04-28', ie:34.37, ch:29.1, fx:24.76, sf:10.03, op:1.64 },
			{ date:'2012-05-09', ie:37.49, ch:27.06, fx:24.59, sf:8.94, op:1.42 },
			{ date:'2012-05-20', ie:32.45, ch:30, fx:25.35, sf:9.91, op:1.8 },
			{ date:'2012-05-31', ie:36.48, ch:28.97, fx:24.35, sf:8.68, op:1.4 },
			{ date:'2012-06-11', ie:37.43, ch:28.12, fx:24.01, sf:8.85, op:1.47 },
			{ date:'2012-06-22', ie:37.28, ch:28.84, fx:23.77, sf:8.45, op:1.51 },
			{ date:'2012-07-03', ie:37.59, ch:28.79, fx:23.45, sf:8.64, op:1.38 },
			{ date:'2012-07-14', ie:32.45, ch:31.12, fx:24.59, sf:9.73, op:1.97 },
			{ date:'2012-07-25', ie:36.87, ch:29.67, fx:23.09, sf:9.06, op:1.17 },
			{ date:'2012-08-05', ie:33.02, ch:31.19, fx:23.56, sf:10.74, op:1.33 },
			{ date:'2012-08-16', ie:38.01, ch:29.31, fx:22.26, sf:9.05, op:1.22 },
			{ date:'2012-08-27', ie:35.72, ch:29.98, fx:22.82, sf:10.19, op:1.18 },
			{ date:'2012-09-07', ie:37.65, ch:29.13, fx:22.26, sf:9.62, op:1.19 },
			{ date:'2012-09-18', ie:36.35, ch:29.47, fx:22.59, sf:10.36, op:1.08 },
			{ date:'2012-09-29', ie:32.2, ch:32.53, fx:22.49, sf:11.33, op:1.28 },
			{ date:'2012-10-10', ie:35.29, ch:31.19, fx:22.3, sf:9.92, op:1.14 },
		];
	}
}
