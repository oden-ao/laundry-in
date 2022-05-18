import React from 'react';

export interface Outlet {
    imageSrc: string;
    name: string;
    location: string;
    llat: number;
    llng: number;
    id: string;
    courier: string;
    rating: number;
    distance: number;
    fee: number;
}

export interface Order {
    num: number;
    type: string;
    date: string;
    deliverydate: string;
    price: number;
    delivery: number;
    total: number;
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
    addOrder: (num: number, type: string, date: string, deliverydate: string, price: number, delivery: number, total: number) => void;
    updateDistance: (loclat: number, loclng: number) => void;
}>({
    outlets: [],
    orders: [],
    location: {latitude: 0, longitude: 0},
    chooseLocation: () => {},
    addOrder: () => {},
    updateDistance: () => {}
});

export default LaundryContext;
