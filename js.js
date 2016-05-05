// ----------------------------------------------------------------
// Basic
(function(d3) {
	var sizes = getSizes();
	var width = sizes.baseWidth;
	var height = sizes.baseHeight;

	var x = d3.time.scale().range([0,width]);
	var y = d3.scale.linear().range([height,0]);

	var line = d3.svg.line();
	line.x(d=>x(d.date));
	line.y(d=>y(d.close));

	var svg = d3.select('#basic').append('svg');
	svg.attr('width', width);
	svg.attr('height', height);

	svg = svg.append('g');

	var data = getData();

	x.domain(d3.extent(data, d=>d.date));
	y.domain(d3.extent(data, d=>d.close));

	svg.append('path')
		.datum(data)
		.attr('class', 'line')
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
	line.y(d=>y(d.close));

	var svg = d3.select('#axis').append('svg');
	svg.attr('width', baseWidth);
	svg.attr('height', baseHeight);

	svg = svg.append('g');
	svg.attr('transform', `translate(${margin.left}, ${margin.top})`);

	var data = getData();

	x.domain(d3.extent(data, d=>d.date));
	y.domain(d3.extent(data, d=>d.close));

	svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', `translate(0, ${height})`)
		.call(xAxis);

	svg.append('g')
		.attr('class', 'y axis')
		.call(yAxis)
		.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', 6)
			.attr('dy', '.71em')
			.style('text-anchor', 'end')
			.text('Price ($)');

	svg.append('path')
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
		{date:'2007-05-01', close:129.47},
		{date:'2007-06-01', close:118.4},
		{date:'2007-07-02', close:121.26},
		{date:'2007-08-01', close:135},
		{date:'2007-09-04', close:144.16},
		{date:'2007-10-01', close:156.34},
		{date:'2007-11-01', close:187.44},
		{date:'2007-12-03', close:178.86},
		{date:'2008-01-02', close:194.84},
		{date:'2008-02-01', close:133.75},
		{date:'2008-03-03', close:121.73},
		{date:'2008-04-01', close:149.53},
		{date:'2008-05-01', close:180},
		{date:'2008-06-02', close:186.1},
		{date:'2008-07-01', close:174.68},
		{date:'2008-08-01', close:156.66},
		{date:'2008-09-02', close:166.19},
		{date:'2008-10-01', close:109.12},
		{date:'2008-10-30', close:111.04},
		{date:'2008-11-28', close:92.67},
		{date:'2008-12-29', close:86.61},
		{date:'2009-01-28', close:94.2},
		{date:'2009-02-27', close:89.31},
		{date:'2009-03-30', close:104.49},
		{date:'2009-04-28', close:123.9},
		{date:'2009-05-28', close:135.07},
		{date:'2009-06-26', close:142.44},
		{date:'2009-07-27', close:160.1},
		{date:'2009-08-26', close:167.41},
		{date:'2009-09-25', close:182.37},
		{date:'2009-10-26', close:202.48},
		{date:'2009-11-24', close:204.44},
		{date:'2009-12-23', close:202.1},
		{date:'2010-01-21', close:208.07},
		{date:'2010-02-19', close:201.67},
		{date:'2010-03-22', close:224.75},
		{date:'2010-04-20', close:244.59},
		{date:'2010-05-19', close:248.34},
		{date:'2010-06-17', close:271.87},
		{date:'2010-07-16', close:249.9},
		{date:'2010-08-16', close:247.64},
		{date:'2010-09-14', close:268.06},
		{date:'2010-10-13', close:300.14},
		{date:'2010-11-11', close:316.66},
		{date:'2010-12-13', close:321.67},
		{date:'2011-01-12', close:344.42},
		{date:'2011-02-11', close:356.85},
		{date:'2011-03-15', close:345.43},
		{date:'2011-04-13', close:336.13},
		{date:'2011-05-13', close:340.5},
		{date:'2011-06-14', close:332.44},
		{date:'2011-07-14', close:357.77},
		{date:'2011-08-12', close:376.99},
		{date:'2011-09-13', close:384.62},
		{date:'2011-10-12', close:402.19},
		{date:'2011-11-10', close:385.22},
		{date:'2011-12-12', close:391.84},
		{date:'2012-01-12', close:421.39},
		{date:'2012-02-13', close:502.6},
		{date:'2012-03-14', close:589.58},
		{date:'2012-04-13', close:605.23},
		{date:'2012-05-01', close:582.13},
	].map(v=>{ v.date=new Date(v.date); return v; });
}
