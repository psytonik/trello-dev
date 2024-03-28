import React  from 'react';
import {OrgControl} from './_components/orgControl';

const OrganizationIdLayout = ({children}:Readonly<{ children: React.ReactNode }>) => {

	return (
		<>
			<OrgControl/>
			{children}
		</>
	);
};

export default OrganizationIdLayout;
