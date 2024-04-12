"use server"

import {InputType, ReturnType} from "@/actions/update-board/types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {createSafeAction} from "@/lib/create-safe-action";
import {UpdateBoard} from "@/actions/update-board/schema";

const handler = async (data: InputType): Promise<ReturnType> => {
	const {orgId, userId} = auth();

	if(!orgId || !userId) {
		return {
			error: "Unauthorized",
		}
	}
	const {title, id} = data;
	let board;
	try {
		board = await db.board.update({
			where: { id, orgId },
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
	revalidatePath(`/board/${id}`)
	if(!data && !board) {
		return {
			error: "Something went wrong"
		}
	}
	return { data: board }
}
export const updateBoard = createSafeAction(UpdateBoard, handler);
