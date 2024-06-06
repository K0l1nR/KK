export interface IEvent {
    id: string;
    name: string;
    description: string;
    date: Date;
    location: string;
  }
  
  export interface ICreateEvent {
    name: string;
    description: string;
    date: Date;
    location: string;
  }
  
  export interface IUpdateEvent {
    id: string;
    name: string;
    description: string;
    date: Date;
    location: string;
  }
  