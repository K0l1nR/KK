export interface IRegistration {
	id?: string;
    eventId?: string;
    participantId?: string;
    registrationDate?: Date;
}

export interface ICreateRegistration extends IRegistration{}