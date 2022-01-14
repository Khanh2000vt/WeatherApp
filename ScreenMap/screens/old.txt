// import React, {useState, useEffect} from "react";
// import { Text, View, Dimensions, StyleSheet } from "react-native";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import highchartsMap from 'highcharts/modules/map';
// import * as map from '@highcharts/map-collection/countries/vn/vn-all.geo.json';

// const {height, width} = Dimensions.get('window');
// highchartsMap(Highcharts);


// const initDatas = [
//   ['vn-3655',0, 0],
//   ['vn-qn', 21.03141, 106.99101],
//   ['vn-kh', 12.2549, 109.09332],
//   ['vn-tg', 10.4, 106.3],
//   ['vn-bv', 10.58333, 107.25],
//   ['vn-bu', 11.08333, 108.08333],
//   ['vn-hc', 10.82327, 106.62978],
//   ['vn-br', 10.16667, 106.5],
//   ['vn-st', 9.55, 105.91667],
//   ['vn-pt', 21.39963, 105.22221],
//   ['vn-yb', 21.72288, 104.9113],
//   ['vn-hd', 20.91667, 106.33333],
//   ['vn-bn', 21.18608, 106.07631],
//   ['vn-317', 20.64637, 106.05112],
//   ['vn-nb', 20.23333, 105.9],
//   ['vn-hm', 20.53333, 105.96667],
//   ['vn-ho', 20.66667, 105.33333],
//   ['vn-vc', 21.33333, 105.56667],
//   ['vn-318', 21.0, 105.75],
//   ['vn-bg', 21.33333, 106.43333],
//   ['vn-tb', 20.5, 106.36667],
//   ['vn-ld', 11.66667, 108.08333],
//   ['vn-bp', 11.75, 106.91667],
//   ['vn-py', 13.16667, 109.08333],
//   ['vn-bd', 11.16667, 106.66667],
//   ['vn-724', 13.75, 108.25],
//   ['vn-qg', 15.0, 108.66667],
//   ['vn-331', 11.0, 107.16667],
//   ['vn-dt', 10.58333, 105.63333],
//   ['vn-la', 10.7, 106.16667],
//   ['vn-3623', 20.8, 106.66667],
//   ['vn-337', 9.77605, 105.46412],
//   ['vn-bl', 9.3, 105.5],
//   ['vn-vl', 10.1, 106.0],
//   ['vn-tn', 11.33333, 106.16667],
//   ['vn-ty', 21.66667, 105.83333],
//   ['vn-li', 22.28333, 103.25],
//   ['vn-311', 21.16667, 104.0],
//   ['vn-hg', 22.75, 105.0],
//   ['vn-nd', 20.25, 106.25],
//   ['vn-328', 18.33333, 105.75],
//   ['vn-na', 19.25, 104.91667],
//   ['vn-qb', 17.5, 106.33333],
//   ['vn-723', 12.75, 108.25],
//   ['vn-nt', 11.75, 108.83333],
//   ['vn-6365', 12.16667, 107.75],
//   ['vn-299', 14.75, 107.91667],
//   ['vn-300', 15.58333, 107.91667],
//   ['vn-qt', 16.75, 107.0],
//   ['vn-tt', 16.33333, 107.58333],
//   ['vn-da', 16.08333, 108.08333],
//   ['vn-ag', 10.5, 105.16667],
//   ['vn-cm', 9.08333, 105.08333],
//   ['vn-tv', 9.8, 106.3],
//   ['vn-cb', 22.75, 106.08333],
//   ['vn-kg', 10.0, 105.16667],
//   ['vn-lo', 22.3, 104.16667],
//   ['vn-db', 21.33333, 102.93333],
//   ['vn-ls', 21.83333, 106.58333],
//   ['vn-th', 20.06667, 105.33333],
//   ['vn-307', 22.25, 105.83333],
//   ['vn-tq', 22.11667, 105.25],
//   ['vn-bi', 11.16667, 106.66667],
//   ['vn-333', 10.11667, 105.5]
// ];



// export default function MapScreen() {

//   const [newData, setNewData] = useState([])
  

//   const option = {
//     chart: {
//       map: 'countries/vn/vn-all',
//   },
  
//   title: {
//       text: 'Bản đồ nhiệt độ các tỉnh/thành phố Việt Nam'
//   },
//   credits: {
//     enabled: false
//   },
//   subtitle: {
//        text: `Source map: <a href="http://code.highcharts.com/mapdata/countries/vn/vn-all.js">Vietnam</a>`
//   },
//   mapNavigation: {
//     enabled: true,
//     buttonOptions: {
//         verticalAlign: 'bottom'
//     }
//   },
  
//   tooltip: {
//     headerFormat: '',
//     pointFormat: '<b>{point.freq}</b><br><b>{point.keyword}</b><br>lat: {point.lat}, lon: {point.lon}'
//   },
//   colorAxis: {
//     min: 0,
//     max: 45,
//     labels: {
//         format: '{value} C'
//     },
//     stops: [
//         [0, '#0000ff'],
//         [0.2, '#6da5ff'],
//         [0.4, '#ffff00'],
//         [0.6, '#ff0000']
//     ]
//   },
  
//   series: [{
//     mapData: map,
//     data: initDatas,
//     name: 'Nhiệt độ',
//     borderColor: '#A0A0A0',
//         nullColor: 'rgba(200, 200, 200, 0.3)',
//     states: {
//         hover: {
//             color: '#FF33CC',
//             cursor: 'pointer'
//         }
//     },
//     dataLabels: {
//         enabled: true,
//         format: '{point.name}'
//     },
//     cursor: 'pointer',
//     point: {
//       events: {
//         click: function() {
//           console.log(this.keyword);
//         }
//       }
//     }
//   }]
//   }

//   return (
//     <View style={styles.container}>
//       <HighchartsReact
//       style={styles.container}
//       constructorType={'mapChart'}
//       highcharts={Highcharts} 
//       options={option}/>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//       backgroundColor: '#fff',
//       justifyContent: 'center',
//       flex: 1
//   }
// });