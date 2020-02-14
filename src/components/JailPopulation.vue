<template>
  <div>
    <apexchart v-if="ready" type="line" :options="chartOptions" :series="series" 
    aria-label="Line chart that shows the monthly Philadelphia jail population from January 2015 to present."></apexchart>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Vue from "vue";
import axios from "axios";
import VueApexCharts from "vue-apexcharts";
import moment from "moment";

Vue.use(VueApexCharts);
Vue.use(moment);
Vue.component("apexchart", VueApexCharts);


const endpoint =
  "https://api.airtable.com/v0/app9m6XveZcIc7Gp5/Jail%20Population?api_key=keySo9AGIliFjjgiG&sort%5B0%5D%5Bfield%5D=Index&sort%5B0%5D%5Bdirection%5D=asc";

export default {
  data: function() {
    return {
      ready : false,
      endpointData: [],
      initiativesData : [],
      initiativeNames: [],
      seriesData: [],
    };
  },
  computed: {
     chartOptions() {
       return {
        chart: {
          id: "jail-population",
          zoom: {
            enabled: false
          },
          
        },
        colors: [ "#25cef7", "#0f4d90" ],
        markers: {
              size: [1, 5],
        },

        xaxis: {
          position: "bottom",
          type: 'datetime',
          labels: {
            datetimeFormatter: {
              month: "MMMM yyyy"
            },
          },
      
        },

        yaxis: {
          title: {
            text: "Number of individuals",
              style: {
              fontSize: '14px'
            }
          }
        },
        title: {
          text: "Philadelphia jail population",
         
        },
        stroke: {
          curve: 'straight',
        },
         tooltip: {
              shared: true,
              intersect: false,
              x: {
                format: 'MMMM yyyy',
              },
              y: {
                formatter: (val, obj) => {
                  if (obj.seriesIndex === 1 && val !== null) {
                    let dpInd = obj.dataPointIndex;
                    let newVal = this.initiativeNames[dpInd].y;
                    return newVal;
                  } else {
                    return val;
                  }
                },
            },
        },
        grid: {
          row: {
            colors: ['#f3f3f3', '	transparent'], // takes an array which will be repeated on columns
            opacity: .75
          },
        },
        fill: {
          type:'solid',
          opacity: [1, 1],
           colors: [  "#25cef7", "#0f4d90" ],
        },
      }
     }

  },

  methods: {
    updateChart() {
      this.series = [
         {
          name: "Jail population",
          type: "line",
          data: this.seriesData
        },
        {
          name: 'Initiatives launched',
          type: 'scatter',
          data: this.initiativesData
        },
       
      ];

      this.ready = true;
    },

    getTheData: function() {
      axios
        .get(endpoint)
        .then(response => { 
          this.endpointData = response.data.records.map(function(entry) {
            return entry["fields"];
          });

          this.seriesData = this.endpointData.map(function(datapoint) {
            let date = datapoint["Month"];
            let parsedDate = moment(date, "MMMM YYYY");
            let dateVal = parsedDate.format();
            
            return { x: dateVal , y : datapoint["Jail Population"] };
          });

          this.initiativesData = this.endpointData.map(function(datapoint) {
            let date = datapoint["Month"];
            let parsedDate = moment(date, "MMMM YYYY");
            let dateVal = parsedDate.format();

            if( datapoint["# Initiatives Launched"] ) {
               return { x: dateVal, y : datapoint["Jail Population"]};
            } else {
               return { x: dateVal , y : null };
            }

          });

          this.initiativeNames = this.endpointData.map(function(datapoint) {
            let date = datapoint["Month"];
            let parsedDate = moment(date, "MMMM YYYY");
            let dateVal = parsedDate.format();

            let numInits =  datapoint["# Initiatives Launched"]
            if( numInits == 1 ) {
              return { x: dateVal,  y: datapoint["Name of Initiative"]};
            } else if (numInits == 2) {
              return { x: dateVal,  y: datapoint["Name of Initiative"] + ",<br>"+ datapoint["Name of Initiative 2"]};
            } else if (numInits == 3) {
                return { x: dateVal,  y: datapoint["Name of Initiative"] + ",<br>" + datapoint["Name of Initiative 2"] + ",<br>" + datapoint["Name of Initiative 3"]};
             } else if (numInits == 4) {
                return { x: dateVal,  y: datapoint["Name of Initiative"] + ",<br>" + datapoint["Name of Initiative 2"] 
                + ",<br>" + datapoint["Name of Initiative 3"] + ",<br>" + datapoint["Name of Initiative 4"]};
            } else {
               return { x: dateVal , y : null};
            }
          });

        })
        .catch(e => {
          console.log(e);
          console.log('error caught')
        })
        .finally(() => {
          this.updateChart();
        });
    },


    updateVal(val, obj) {
      if (obj.seriesIndex === 0) {
        let dpInd = obj.dataPointIndex;
        console.log(obj.w);
        let newVal = dpInd;
        return newVal;
      } else {
        return val;
      }
    }
  },

  created() {
    this.getTheData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.apexcharts-tooltip-title  {
  background: #444 !important; 
  color: white !important;
  text-align: center;
}

.apexcharts-tooltip-series-group:nth-of-type(3) {

  .apexcharts-tooltip-marker {
    margin-top: 7px;
    align-self: start;
    vertical-align: top;
  }

  .apexcharts-tooltip-text-label {
    vertical-align: top;
  }
}


</style>