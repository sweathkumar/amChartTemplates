am5.ready(function () {
    // Initialize the chart element
    var root = am5.Root.new("Chartnew");

    // Set the chart theme
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Format dates
    root.dateFormatter.setAll({
        dateFormat: "yyyy",
        dateFields: ["valueX"]
    });

    // Create the chart
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        focusable: true,
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0
    }));

    //Get your data
    var data = mydata;
  
    // Format and map the data
    var formattedData = data.map(item => ({
        Date: new Date(item.Date).getTime(),
        value: item.ClosePrice
    }));

    var formattedData2 = data.map(item => ({
        Date: new Date(item.Date).getTime(),
        value2: item.ClosePrice
    }));

    // Create the X-axis (Date axis)
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0.1,
        groupData: false,
        baseInterval: {
            timeUnit: "day",
            count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {
            minorGridEnabled: true,
            minGridDistance: 70
        }),
        tooltip: am5.Tooltip.new(root, {})
    }));

    // Create the first Y-axis for market data
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.2,
        renderer: am5xy.AxisRendererY.new(root, {})
    }));
    yAxis.set("title", "Market");

    // Create the second Y-axis for company data (opposite side)
    var yAxis2 = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.2,
        renderer: am5xy.AxisRendererY.new(root, {
            opposite: true,
            syncWithAxis: yAxis ? yAxis2 : undefined
        })
    }));
    yAxis2.set("title", "Company");

    // Add the market series (blue line)
    var series = chart.series.push(am5xy.LineSeries.new(root, {
        minBulletDistance: 10,
        connect: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "Date",
        tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]" + mType + " : Rs: [bold]{valueY}[/]"
        })
    }));

    // Set up data processor for date format
    series.data.processor = am5.DataProcessor.new(root, {
        dateFormat: "yyyy-MM-dd",
        dateFields: ["date"]
    });
    series.data.setAll(formattedData);

    // Add the company series (orange line)
    var series2 = chart.series.push(am5xy.LineSeries.new(root, {
        minBulletDistance: 10,
        connect: true,
        xAxis: xAxis,
        yAxis: yAxis2,
        valueYField: "value2",
        valueXField: "Date",
        tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]" + cName + " : Rs: {valueY}[/]"
        })
    }));

    // Set up data processor for date format
    series2.data.processor = am5.DataProcessor.new(root, {
        dateFormat: "yyyy-MM-dd",
        dateFields: ["date"]
    });
    series2.data.setAll(formattedData2);

    // Set line colors
    series.set("stroke", am5.color(0x0047AB)); // Blue for market series
    series2.set("stroke", am5.color("#FF5733")); // Orange for company series

    //lable bg color
    series.set("fill", am5.color(0x0047AB)); 
    series2.set("fill", am5.color("#FF5733"));
  
    // Set line stroke width
    series.strokes.template.setAll({ strokeWidth: 2 });
    series2.strokes.template.setAll({ strokeWidth: 2 });

    // Add cursor for better interaction
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // Add horizontal scrollbar
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));

    // Animate chart on load
    chart.appear(1000, 100);
}); // end am5.ready()
