import React from 'react';
import { StatsProps } from '../FrontendTypes';
import '../css/StatsSummary.css'

export default function StatsSummary({ totalApps, stackPercentage, responseRate, responseRateByAppStyle } : StatsProps) {
	// this conditional is necessary to avoid errors on initial render when data fetch is incomplete and properties are undefined
	if (totalApps && stackPercentage && responseRate && responseRateByAppStyle) {
		return (
			<div className='statsSummary'>
				<h1>Total Applications - {totalApps}</h1>
				<h2>Apps by Stack</h2>
					{/* wopd be great to sort these */}
					<p>Full - {stackPercentage.full}</p>
					<p>Frontend - {stackPercentage.frontend}</p>
					<p>Backend - {stackPercentage.backend}</p>
				<h2>Response Rate</h2>
					<p>No Response - {responseRate.noResponse}</p>
					<p>Any Response - {responseRate.anyResponse}</p>
				<h2>Response Rate by App Style</h2>
					<h3>Regular</h3>
						<p>No Response - {responseRateByAppStyle.regular.noResponse}</p>
						<p>Any Response - {responseRateByAppStyle.regular.anyResponse}</p>
					<h3>Quick</h3>
						<p>No Response - {responseRateByAppStyle.quick.noResponse}</p>
						<p>Any Response - {responseRateByAppStyle.quick.anyResponse}</p>
					<h3>Codesmith</h3>
						<p>No Response - {responseRateByAppStyle.codesmith.noResponse}</p>
						<p>Any Response - {responseRateByAppStyle.codesmith.anyResponse}</p>
			</div>
		);
	}
};
