"use server"


import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {createSafeAction} from "@/lib/create-safe-action";
import {DeleteBoard} from "@/actions/delete-board/schema";
import {redirect} from "next/navigation";
import {InputType} from "@/actions/delete-board/types";


const handler = async (data: InputType): Promise<any> => {
	const {orgId, userId} = auth();

	if(!orgId || !userId) {
		return {
			error: "Unauthorized",
		}
	}
	const {id} = data;
	let board;
	try {
		board = await db.board.delete({
			where: { id, orgId }
		})
	} catch (e) {
		if (e instanceof Error ){
			return {
				error: `${e.message}: Failed to delete`
			}
		}
		return {
			error: ` Failed to update`
		}
	}
	revalidatePath(`/organization/${orgId}`);
	redirect(`/organization/${orgId}`)
}
export const deleteBoard = createSafeAction(DeleteBoard, handler);
