"use client"
import React, {ElementRef, useRef, useState} from 'react';
import {List} from "@prisma/client";
import {useEventListener} from "usehooks-ts";
import {toast} from "sonner";

import {FormInput} from "@/components/form/form-input";
import {useAction} from "@/hooks/use-action";
import {updateList} from "@/actions/update-list";
import {ListOptions} from "./list-options";

interface ListHeaderProps {
	data: List
}
export const ListHeader = ({data}:ListHeaderProps) => {
	const [title, setTitle] = useState<string>(data.title);
	const [isEditing,setIsEditing] = useState(false)
	const inputRef = useRef<ElementRef<"input">>(null);
	const formRef = useRef<ElementRef<"form">>(null);


	const enableEditing = () => {
		setIsEditing(true);
		setTimeout(()=>{
			inputRef.current?.focus();
			inputRef.current?.select()
		})
	}
	const disableEditing = () => {
		setIsEditing(false);
	}
	const {execute} = useAction(updateList, {
		onSuccess: (data): void => {
			toast.success(`Renamed to "${data.title}"`);
			setTitle(data.title)
			disableEditing();
		},
		onError: (error) => {
			toast.error(error);
		}
	})
	const handleSubmit = (formData: FormData) => {
		const title = formData.get('title') as string;
		const id = formData.get('id') as string;
		const boardId = formData.get('boardId') as string;
		if(title === data.title) {
			return disableEditing();
		}
		execute({title: title, id: id, boardId: boardId}).then()
	}
	const onBlur = (): void => {
		formRef.current?.requestSubmit()
	}
	const onKeyDown = (e: KeyboardEvent):any => {
		if(e.key === 'Escape') {
			formRef.current?.requestSubmit()
		}
	}
	useEventListener('keydown', onKeyDown)
	return (
		<div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
			{isEditing ? (
				<form className="flex-1 px-[2px]" ref={formRef} action={handleSubmit}>
					<input hidden id="id" name="id" value={data.id} readOnly/>
					<input hidden id="boardId" name="boardId" value={data.boardId} readOnly/>
					<FormInput
						ref={inputRef}
						onBlur={onBlur}
						id="title"
						placeholder="Enter list title"
						// @ts-ignore
						defaultValue={title}
						className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
					/>
					<button type="submit" hidden/>
				</form>
			):(
				<div
					onClick={enableEditing}
					className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
					{title}
				</div>
			)}

			<ListOptions data={data} onAddCard={()=>{}}/>
		</div>
	);
};
