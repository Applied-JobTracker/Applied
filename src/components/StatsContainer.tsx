import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import StatsSummary from './StatsSummary';
import { UserProps } from '../FrontendTypes';

export default function StatsContainer(props: UserProps) {
    const [ context, setContext ] = useContext(Context);
  
    let statsSummary : JSX.Element;
    // place the fetch request inside a useEffect, so Feed will rerender any time Context is updated
    useEffect(() => {
      // send a get request to the server at [CONFIRM ENDPOINT WITH BACKEND] to get the summary stats object -> include the userID in the request somehow
      fetch(`/apps/${props.userId}`)
      // parse response from json to js
      .then(response => response.json())
      // parse response data, adding each stat as a prop in a new StatsSummary component
      .then(response => {
          // NOTE: will need to reconfigure response properties after the backend setup
          statsSummary = <StatsSummary 
            totalApps={response.totalApps} 
            stackPercentage={response.stackPercentage} 
            responseRate={response.responseRate} 
            responseRateByAppStyle={response.responseRateByAppStyle}
          />
        // NOTE: might need to setContext(false) here, but if the Feed component is going to handle that on each rerender, then maybe not
        // setContext(false);
      })
      .catch(err => {
        console.log('There was an error fetching summary stats: ', err);
      });
    }, [ context ]);
  
    return (
      <div className='statsContainer'>
        <h3>Stats</h3>
        {statsSummary}
      </div>
    );
  };