const barCharts = $('#bar-chart');
const weekday = new Date().getUTCDay();

async function loadBar() {
    
    barCharts.html('');
    let response = await fetch('data.json');
    let data = await response.json();

    for (let i=0; i<data.length; i++) {

        //extract respective info from json file
        const day = data[i].day;
        const amount = Number(data[i].amount);
        const barHt = (amount / 5.584) + 'rem';
        
        //create bar for each day
        const barChart = $('<div>');
        barChart.addClass('bar');

        //create respective elements within each bar 
        const spendAmt = $('<div>');
        spendAmt.addClass('spend-amt');
        spendAmt.text(`$${amount}`);

        const barChartBox = $('<div>');
        barChartBox.addClass('bar-box'); 
        barChartBox.attr('style',`height: ${barHt}`);

        if (i === weekday) {
            barChartBox.addClass('today');
        }

        const barChartLabel = $('<label>');
        barChartLabel.addClass('day-label');
        barChartLabel.text(day);

        barCharts.append(barChart);

        //visibility, instead of display, helps to keep the formatting
        barChart.hover (
			function() {
				spendAmt.css('visibility', 'visible');
			},
			function() {
				spendAmt.css('visibility', 'hidden');
            }
        );
        
        //The append() calls for spendAmt, barChartBox, and barChartLabel are below the 
        //.hover() event handler, so that they're added to the DOM after the event handler is set up. 
        //This ensures that the event handler is properly registered for each element.
        barChart.append(spendAmt);
        barChart.append(barChartBox);
        barChart.append(barChartLabel);
    }
}

loadBar();