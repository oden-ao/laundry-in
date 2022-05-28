import React from 'react';

export interface Outlet {
    imageSrc: string;
    name: string;
    location: string;
    address: string;
    phone: string;
    hours: string;
    llat: number;
    llng: number;
    id: string;
    courier: string;
    rating: number;
    ratings: number;
    distance: number;
    fee: number;
}

export interface Order {
    num: number;
    type: string;
    date: string;
    pickupdate: string;
    deliverydate: string;
    price: number;
    delivery: number;
    total: number;
    address: string;
}

export interface Location {
    latitude: number;
    longitude: number;
}

const LaundryContext = React.createContext<{
    outlets: Outlet[];
    orders: Order[];
    location: Location;
    chooseLocation: (latitude: number, longitude: number) => void;
    addOrder: (num: number, type: string, date: string, pickupdate: string, deliverydate: string, price: number, delivery: number, total: number, address: string) => void;
    updateDistance: (loclat: number, loclng: number) => void;
    getRating: () => void;
}>({
    outlets: [],
    orders: [],
    location: {latitude: 0, longitude: 0},
    chooseLocation: () => {},
    addOrder: () => {},
    updateDistance: () => {},
    getRating: () => {}
});

export default LaundryContext;
