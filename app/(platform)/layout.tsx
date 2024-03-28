import React from 'react';
import {ClerkProvider} from "@clerk/nextjs";

const PlatformLayout = ({children}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<ClerkProvider>
			{children}
		</ClerkProvider>
	);
};

export default PlatformLayout;
