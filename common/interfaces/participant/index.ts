export interface IParticipant {
	id?: string;
	name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export interface ICreateParticipant extends IParticipant{}

export interface ILoginParticipant {
    email: string;
    password: string;
  }
  
  export interface IRegisterParticipant extends ILoginParticipant {
    name: string;
    phone: string;
  }