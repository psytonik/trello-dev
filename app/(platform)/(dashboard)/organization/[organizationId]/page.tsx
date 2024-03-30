import React from 'react';
import {createBoard} from "@/actions/createBoard";
import {Button} from "@/components/ui/button";
import {db} from "@/lib/db";
import {DeleteBoard} from "@/app/(platform)/(dashboard)/organization/[organizationId]/board";

const OrganizationIdPage = async ({params}:{params:{organizationId: string}}) => {
	const orgId = params.organizationId;
	const boards = await db.board.findMany();
	return (
		<div className="flex flex-col space-y-4">
			<form action={createBoard}>
				<input type="text" name="title" id="title" required placeholder="Enter board Title" className="border-black border p-1"/>
				<Button type="submit" variant="ghost">Submit</Button>
			</form>
			<div className="space-y-2">
				{boards.map((board)=>(
					<DeleteBoard id={board.id} title={board.title} key={board.id}/>
				))}
			</div>
		</div>
	);
};

export default OrganizationIdPage;
