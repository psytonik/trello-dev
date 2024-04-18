"use server"

import {InputType, ReturnType} from "@/actions/update-list/types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {createSafeAction} from "@/lib/create-safe-action";
import {UpdateList} from "@/actions/update-list/schema";

const handler = async (data: InputType): Promise<ReturnType> => {
	const {orgId, userId} = auth();

	if(!orgId || !userId) {
		return {
			error: "Unauthorized",
		}
	}
	const {title, id, boardId} = data;
	let list;
	try {
		list = await db.list.update({
			where: { id, boardId, board: {orgId} },
			data: {title}
		})
	} catch (e) {
		if (e instanceof Error ){
			return {
				error: `${e.message}: Failed to update`
			}
		}
		return {
			error: ` Failed to update`
		}
	}
	revalidatePath(`/board/${boardId}`)
	if(!data && !list) {
		return {
			error: "Something went wrong"
		}
	}
	return { data: list }
}
export const updateList = createSafeAction(UpdateList, handler);
