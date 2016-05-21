angular.module('Prismetic')
.factory('highCharts', function() {
  return{
    lineChart: function(id, data) {
      $('#'+id).highcharts({
          chart: {
              zoomType: 'x',
              type: 'areaspline'
          },
          credits: {
              enabled: false
          },
          title: {
              text: null
          },
          subtitle: {
              text: document.ontouchstart === undefined ?
                  'Clickeá y arrastrá en el gráfico para aumentar el zoom' :
                  'Pinch the chart to zoom in'
          },
          tooltip: {
            formatter: function() {
                format = '<b>Personas: ' + this.y + '</b><br>';
                format += moment(this.x).format('HH:mm') + ' hs';
                return format;
            }
          },
          xAxis: {
              labels: {
                formatter: function(foo) {
                    return moment(this.value).format('H:m:s');
                }
              },
              title: {
                  text: 'Fecha'
              }
          },
          yAxis: {
              min: 0,
              gridLineColor: 'transparent',
              title: {
                  text: 'Personas'
              },
              labels: {
                  formatter: function () {
                    return this.value;
                  }
              }
          },
          plotOptions: {
              line: {
                dataLabels: {
                  enabled: true
                }
              },
              area: {
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                  hover: {
                      lineWidth: 1
                  }
                }
              }
          },

          series: [{
              data: data,
              color: '#b5e3e3',
              name: 'Personas'
          }],

          lang: {
            noData: "No hay datos disponibles."
          },
          loading: {
              style: {
                  fontWeight: 'bold',
                  fontSize: '25px',
                  color: '#303030'
              }
          }

      });
      return $('#'+id).highcharts();
    }
  }
});

