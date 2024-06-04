export interface IParticipant {
	id: string;
	name: string;
    email: string;
    password: string;
    phone: string;
}

export interface ICreateParticipant extends IParticipant{}