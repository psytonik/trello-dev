import {z} from 'zod';
// TODO 26:07

export const UpdateBoard = z.object({
	title: z.string({
		required_error: 'title is required',
		invalid_type_error: "title is required"
	}).min(3, {
		message: "Title is too short"
	}),
	id: z.string()
})
