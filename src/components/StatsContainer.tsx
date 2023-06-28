import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import StatsSummary from './StatsSummary';
import { UserProps } from '../FrontendTypes';

export default function StatsContainer({ userId }: UserProps) {
    const [ context, setContext ] = useContext(Context);
    const [ totalApps, setTotalApps ] = useState();
    const [ stackPercentage, setStackPercentage ] = useState();
    const [ responseRate, setResponseRate ] = useState();
    const [ responseRateByAppStyle, setResponseRateByAppStyle ] = useState();
  
    // place the fetch request inside a useEffect, so StatsContainer will rerender any time Context is updated
    useEffect(() => {
      // send a get request to the server at 'apps/stats/userId' to get the summary stats object
      fetch(`/apps/stats/${userId}`)
      // parse response from json to js
      .then(response => response.json())
      // parse response data, updating state with corresponding response data
      .then(response => {
        setTotalApps(response['Total Apps']);
        setStackPercentage(response['Apps by Stack Percentage']);
        setResponseRate(response['Response Rate']);
        setResponseRateByAppStyle(response['Response Rate by App Style']);
      })
      .catch(err => {
        console.log('There was an error fetching summary stats: ', err);
      });
    }, [ context ]);
  
    return (
      <div className='statsContainer'>
        <StatsSummary 
          totalApps={totalApps} 
          stackPercentage={stackPercentage} 
          responseRate={responseRate} 
          responseRateByAppStyle={responseRateByAppStyle}
        />
      </div>
    );
  };