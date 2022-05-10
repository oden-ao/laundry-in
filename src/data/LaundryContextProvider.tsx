import { Directory, Filesystem } from '@capacitor/filesystem';
import React, {useCallback, useEffect, useState} from 'react';
import {Storage} from '@capacitor/storage'
import laundry1 from '../images/laundry1.jpg'


import LaundryContext, {Location, Outlet} from './laundry-context';
import { debug } from 'console';
import Outlets from '../pages/Outlets';

const LaundryContextProvider: React.FC = props => {

    const [location, setLocation] = useState<Location>({latitude: 0, longitude: 0});

    const [outlets, setOutlets] = useState<Outlet[]>([
        { imageSrc: laundry1,
        name:'LaundryIn Jakarta',
        location:'Jakarta',
        llat: 2,
        llng: 2,
        id: 'o1',
        courier: 'yes',
        rating: 75
        },
        { imageSrc: laundry1,
            name:'LaundryIn Bandung',
            location:'Bandung',
            llat: 2,
            llng: 2,
            id: 'o2',
            courier: 'no',
            rating: 75
            }
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

    const defaultOutlets = () => {

        // setOutlets((currOutlets: Outlet[]) => {
        //     return currOutlets;
        // });

        setOutlets(outlets);
        
    }

    const courierOutlets = () => {

        // setOutlets((currOutlets: Outlet[]) => {
        //     currOutlets.filter(outlet => outlet.courier === 'yes');
        //     return currOutlets;
        // });
        setOutlets(outlets.filter(outlet => outlet.courier === 'yes'));
        return outlets;
    }


return(
    <LaundryContext.Provider value={{location, outlets, chooseLocation, defaultOutlets, courierOutlets}}>
        {props.children}
    </LaundryContext.Provider>
);
}
export default LaundryContextProvider;