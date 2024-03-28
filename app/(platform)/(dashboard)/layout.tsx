import React from 'react';
import {Navbar} from "./_components/navbar";

const DashboardLayout = ({children}:Readonly<{ children: React.ReactNode }>) => {
	return (
		<div className="h-full">
			<Navbar/>
			{children}
		</div>
	);
};

export default DashboardLayout;
