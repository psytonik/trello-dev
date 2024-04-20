"use server"

import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {createSafeAction} from "@/lib/create-safe-action";
import {InputType, ReturnType} from "./types";
import {UpdateCard} from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
	const {orgId, userId} = auth();

	if(!orgId || !userId) {
		return {
			error: "Unauthorized",
		}
	}
	const {id, boardId, ...values} = data;
	let card;
	try {
		card = await db.card.update({
			where: {
				id,
				list: {
					board: {
						orgId
					}
				}},
			data: {...values}
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
	if(!data && !card) {
		return {
			error: "Something went wrong"
		}
	}
	return { data: card }
}
export const updateCard = createSafeAction(UpdateCard, handler);
