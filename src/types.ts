
export type State = {
    notes: Note[],
    tableData: { [key: string]:{ active: number, isArchived: number} }[],
    modal: ModalData,
    showArchived: boolean
}

export type ModalData = {
    isOpen: boolean,
    text: string,
    category: string,
    id: string,
}

export type Id = number | string

export type Note = {
    id: Id,
    text: string,
    category: string,
    isArchived: boolean,
    time: string,
}

export type SubmitEdit = {
    text: string,
    category: string,
    id: Id,
}