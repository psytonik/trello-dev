"use server"
import {db} from "@/lib/db";
import {z} from 'zod'
import {revalidatePath} from "next/cache";

const CreateBoard = z.object({
	title: z.string().min(4)
})
export const createBoard = async (formData: FormData)=> {
	const {title} = CreateBoard.parse({title: formData.get('title')})
	await db.board.create({
		data: {
			title
		}
	})
	revalidatePath(`/organization/org_2eBwubZeQlSOQsOXiNDggD9VDsW`)
}
