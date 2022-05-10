import React from 'react';

export interface Outlet {
    imageSrc: string;
    name: string;
    location: string;
    llat: number;
    llng: number;
    id: string;
    courier: string;
    rating: number
}

export interface Location {
    latitude: number;
    longitude: number;
}

const LaundryContext = React.createContext<{
    outlets: Outlet[];
    location: Location;
    chooseLocation: (latitude: number, longitude: number) => void;
    defaultOutlets: () => void;
    courierOutlets: () => void;
}>({
    outlets: [],
    location: {latitude: 0, longitude: 0},
    chooseLocation: () => {},
    defaultOutlets: () => {},
    courierOutlets: () => {}
});

export default LaundryContext;
