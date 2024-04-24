export interface ITask {
    id?: string
    headline: string
    description: string
    endDate: string
    refreshDate: string
    priority: string
    status: string
    createrId: string
    responsibleId: string
}

export interface IEditTask {
    headline: string
    description: string
    endDate: Date
    priority: string
    status: string
    responsibleId: string
}