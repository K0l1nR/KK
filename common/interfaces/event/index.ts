export interface IEvent {
	id: string;
	name: string;
    description: string;
    date: Date;
    location: string;
}

export interface ICreateEvent extends IEvent{}