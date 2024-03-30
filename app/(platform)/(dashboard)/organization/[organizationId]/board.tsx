import React from "react";

interface DeleteBoardProps {
	title: string;
	id: string
}
export const DeleteBoard = ({id, title}: DeleteBoardProps) => {
	return (
		<form className="flex items-center">
			Board Name: {title}
		</form>
	)
}
