// types.ts

export interface Owner {
  id: number;
  name: string;
}

export interface Property {
  id: number;
  street: string;
  number: string;
  numberOfRooms: number;
  fullKitchen: boolean;
  numberOfBathrooms: number;
  area: number;
  zipCode: string;
  description: string;
  maxGuests: number;
  minimumStay: number;
  latitude: number;
  longitude: number;
  owner: number;
}
