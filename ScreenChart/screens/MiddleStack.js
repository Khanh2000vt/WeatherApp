import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ChartScreen from './ChartScreen';
const Tab = createMaterialTopTabNavigator();
const MiddleStack = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchHomeData = async () => {
          try {
            const dataLocation = await fetch (
              'https://weather-api-2021-100eggs.herokuapp.com/',
            );
            return dataLocation;
    
          } catch (err) {
            console.log('Fetch failed', err);
          }
        };
    
        fetchHomeData()
        .then(response => response.json())
        .then(data => {
          setData(data);
        })
        .catch(err => {
          console.log(err)
        })
      }, [data]);


  return (
      <Tab.Navigator
        screenOptions={{
          headerShow: false,
          tabBarStyle: {
            display: 'none',
          }
        }}>
            <Tab.Screen name="Current Chart" 
                    key={1} 
                    children={() => <ChartScreen data={data.current}/>}
                    // component={ChartScreen} 
                    />
            {data?.favorite?.map((value, item)=> {
                return (
                    <Tab.Screen name={value?.weather.name}
                    key={value?.id} 
                    children={() => <ChartScreen data={value}/>}
                    option={{tabBarBadge: data?.favorite?.length}}
                    // component={ChartScreen} 
                    />
                )
            })}
      </Tab.Navigator>
  );
};


export default MiddleStack;