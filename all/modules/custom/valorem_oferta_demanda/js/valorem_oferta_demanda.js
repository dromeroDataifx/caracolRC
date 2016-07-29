/*
      (function(){
        console.log(google);
        google.load("visualization", "1", {"packages": ["columnchart"]});
        google.setOnLoadCallback (createChart);    
      })
  function createChart() {
  // Create and populate the data table.
  var data = new google.visualization.DataTable();
  var raw_data = [["Oferta", 4.2],
                  ["Demanda", 3.2]];
  
  var years = [""];
                  
  data.addColumn("string", "string");
  for (var i = 0; i  < raw_data.length; ++i) {
    data.addColumn("number", raw_data[i][0]);    
  }
  
  data.addRows(years.length);

  for (var j = 0; j < years.length; ++j) {    
    data.setValue(j, 0, years[j].toString());    
  }
  for (var i = 0; i  < raw_data.length; ++i) {
    for (var j = 1; j  < raw_data[i].length; ++j) {
      data.setValue(j-1, i+1, raw_data[i][j]);    
    }
  }
  
  // Create and draw the visualization.
  new google.visualization.ColumnChart(document.getElementById("chart")).
      draw(data, {width: 400, height: 240, is3D:true}
  );
}
*/