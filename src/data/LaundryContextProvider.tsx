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
            name:'LaundryIn Cibubur',
            location:'Bandung',
            address: 'Jl. Alternatif Cibubur No.230 A, Harjamukti, Kec. Cimanggis, Kota Depok, Jawa Barat 16454',
            phone: '0815-5000-6001',
            hours: 'Opens 8AM-8PM Monday-Sunday',
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
                address: 'Jl. Raya Kalimalang No.18, RW.3, Pd. Bambu, Kec. Duren Sawit, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13430',
                phone: '0815-5000-6002',
                hours: 'Opens 8AM-8PM Monday-Sunday',
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
                    address: 'Jl. Raden Inten II No.8, RT.8/RW.14, Klender, Kec. Duren Sawit, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13470',
                    phone: '0815-5000-6003',
                    hours: 'Opens 8AM-8PM Monday-Sunday',
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
                    { imageSrc: laundry1,
                        name:'LaundryIn Scientia',
                        location:'Tangerang',
                        address: 'Curug Sangereng, Kelapa Dua, Tangerang Regency, Banten 15810',
                        phone: '0815-5000-6004',
                        hours: 'Opens 8AM-8PM Monday-Sunday',
                        llat: -6.25621257514,
                        llng: 106.61558605,
                        id: 'o4',
                        courier: 'yes',
                        rating: 80,
                        distance: getDistance(
                            { latitude: location.latitude, longitude: location.longitude },
                            { latitude: -6.25621257514 , longitude: 106.61558605 }),
                        fee: getDistance(
                            { latitude: location.latitude, longitude: location.longitude },
                            { latitude: -6.25621257514 , longitude: 106.61558605 })>30000?10000: 5000
                        }
                    
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

    const addOrder = (num: number, type: string, date: string, pickupdate: string, deliverydate: string, price:number, delivery:number, total: number, address: string) => {
        const newOrder: Order = {
            num: num,
            type: type,
            date: date,
            pickupdate: pickupdate,
            deliverydate: deliverydate,
            price: price,
            delivery: delivery,
            total: total,
            address: address
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