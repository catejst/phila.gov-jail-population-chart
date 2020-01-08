<template>
  <div>
    <apexchart v-if="ready" width="1000" type="line" :options="chartOptions" :series="series"></apexchart>
    <!-- <button @click="updateChart">Update!</button> -->
  </div>
</template>

<script>
/* eslint-disable no-console */
import Vue from "vue";
import axios from "axios";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

const endpoint =
  "https://api.airtable.com/v0/app9m6XveZcIc7Gp5/Prison%20Population?api_key=keySo9AGIliFjjgiG&sort%5B0%5D%5Bfield%5D=Index&sort%5B0%5D%5Bdirection%5D=asc";

export default {
  data: function() {
    return {
      ready : false,
      endpointData: [],
      initiativesData : [],
      months: [],
      seriesData: [],
    };
  },
  computed: {
     chartOptions() {
       return {
        chart: {
          id: "prison-population",
          zoom: {
            enabled: false
          },
          
        },
        colors: [ "#0f4d90", "#25cef7" ],
        markers: {
              size: [6, 1],
        },

        xaxis: {
          position: "bottom",
          tickPlacement: "between"
        },
        title: {
          text: "Philadelphia Prison Population"
        },
        stroke: {
          curve: 'straight',
        },
         tooltip: {
              shared: true,
              intersect: false,
              y: {
                // formatter: function(val, { seriesIndex, dataPointIndex, w }) {
                  // if (obj.seriesIndex === 0 && val !== null) {
                  //   let dpInd = obj.dataPointIndex;
                  //   // console.log(obj.w);
                  //   // let newVal = obj.w.globals.seriesZ[0][dpInd];
                  //   // console.log(newVal);
                  //   return dpInd;
                  // } else {
                  //   return val;
                  // }
                // }
            },
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        fill: {
          type:'solid',
          opacity: [1, 1],
           colors: [ "#0f4d90", "#25cef7" ],
        },
      }
     }

  },

  methods: {
    updateChart() {
      console.log(this.months);

      this.series = [
        {
          name: 'Initiative Launched',
          type: 'scatter',
          data: this.initiativesData
        },
        {
          name: "Prison population",
          type: "line",
          data: this.seriesData
        },
        
        
      ];

      this.ready = true;
    },

    getData: function() {
      axios
        .get(endpoint)
        .then(response => {
          this.endpointData = response.data.records.map(function(entry) {
            return entry["fields"];
          });

          this.months = this.endpointData.map(function(datapoint) {
            return datapoint["Month"];
          });

          this.seriesData = this.endpointData.map(function(datapoint) {
            return { x: datapoint["Month"] , y : datapoint["Jail Population"] };
          });

          this.initiativesData = this.endpointData.map(function(datapoint) {
            if( datapoint["# Initiatives Launched"] ) {
               return { x: datapoint["Month"], y : datapoint["Jail Population"], initiatives: datapoint["# Initiatives Launched"]};
            } else {
               return { x: datapoint["Month"] , y : null, initiatives: null };
            }

          });
          console.log(this.endpointData);
        })
        .catch(e => {
          console.log(e);
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
        // console.log(newVal);
        return newVal;
      } else {
        return val;
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
