import { Directory, Filesystem } from '@capacitor/filesystem';
import React, {useCallback, useEffect, useState} from 'react';
import {Storage} from '@capacitor/storage'
import laundry1 from '../images/laundry1.jpg'
import LaundryContext, {Location, Order, Outlet} from './laundry-context';
import { debug } from 'console';
import Outlets from '../pages/Outlets';
import { getDistance } from 'geolib';

const LaundryContextProvider: React.FC = props => {

    const [location, setLocation] = useState<Location>({latitude: 0, longitude: 0});

    const [outlets, setOutlets] = useState<Outlet[]>([
        
        { imageSrc: laundry1,
            name:'LaundryIn Bandung',
            location:'Bandung',
            llat: -6.914744,
            llng: 107.613144,
            id: 'o1',
            courier: 'no',
            rating: 70,
            distance: getDistance(
                { latitude: location.latitude, longitude: location.longitude },
                { latitude: -6.914744 , longitude: 107.613144 }),
            fee: getDistance(
                    { latitude: location.latitude, longitude: location.longitude },
                    { latitude: -6.914744 , longitude: 107.613144 })>30000?10000: 5000
            },
            { imageSrc: laundry1,
                name:'LaundryIn Cipinang Indah',
                location:'Jakarta',
                llat:  -6.23907926272,
                llng: 106.894317954,
                id: 'o2',
                courier: 'yes',
                rating: 80,
                distance: getDistance(
                    { latitude: location.latitude, longitude: location.longitude },
                    { latitude:  -6.23907926272 , longitude: 106.894317954 }),
                    fee: getDistance(
                        { latitude: location.latitude, longitude: location.longitude },
                        { latitude:  -6.23907926272 , longitude: 106.894317954 })>30000?10000: 5000
                },
                { imageSrc: laundry1,
                    name:'LaundryIn Buaran',
                    location:'Jakarta',
                    llat: -6.217846,
                    llng: 106.924173,
                    id: 'o3',
                    courier: 'yes',
                    rating: 75,
                    distance: getDistance(
                        { latitude: location.latitude, longitude: location.longitude },
                        { latitude: -6.217846 , longitude: 106.924173 }),
                    fee: getDistance(
                        { latitude: location.latitude, longitude: location.longitude },
                        { latitude: -6.217846 , longitude: 106.924173 })>30000?10000: 5000
                    },
                    
    ]);

    const [orders, setOrders] = useState<Order[]>([
    ]);


    const chooseLocation = (latitude: number, longitude:number) => {
        const currLocation: Location = {
            latitude,
            longitude
        }
        
        // setLocation((currLocation) => currLocation);
        setLocation({latitude, longitude});
        return currLocation;
    }

    const addOrder = (num: number, type: string, date: string, deliverydate: string, price:number, delivery:number, total: number) => {
        const newOrder: Order = {
            num: num,
            type: type,
            date: date,
            deliverydate: deliverydate,
            price: price,
            delivery: delivery,
            total: total
        };
        
        setOrders((currOrder:Order[]) => {
            return currOrder.concat(newOrder);
        });
    }

    const updateDistance = (loclat: number, loclng: number) => {
        outlets.forEach(outlet => { outlet.distance = getDistance(
            { latitude: loclat, longitude: loclng },
            { latitude: outlet.llat , longitude: outlet.llng })
        });
    }


return(
    <LaundryContext.Provider value={{location, outlets, orders, chooseLocation, addOrder, updateDistance}}>
        {props.children}
    </LaundryContext.Provider>
);
}
export default LaundryContextProvider;