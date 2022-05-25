import React, { useState } from 'react'
import { IonButton, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonAccordion, IonCardSubtitle, IonCardContent, IonText, IonFooter } from '@ionic/react';
import { useEffect } from 'react';
import './Login.css'
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import './page.css'
import 'swiper/css';
import 'swiper/css/pagination';
import headerboard1 from '../images/bestquality.jpg'
import headerboard2 from '../images/affordable.jpg'
import headerboard3 from '../images/guaranteed.jpg'

const Page: React.FC = () => {
    const [input, setInput] = useState<string>('')

    useEffect(() => {
        console.log(input)
    }, [input])

    return (
        <IonPage>
           
            
            <IonContent className="ion-text-center">
           
                <IonGrid className='onboardingheader'>
                    
        
        <IonRow>
        <IonCol size-sm='8' offset-sm='3' size-md="6" offset-md="3">
        </IonCol>
       
        </IonRow>
          </IonGrid>
        <IonCol>
            <Swiper modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}>
                        <SwiperSlide>
                            <IonCard className='kotak1'>
                              <img src={headerboard1}/>
                            <div className='overlay1'><b>Best Quality</b><br/> We serve the best quality laundry for all our customers.</div>
                            </IonCard>
                        </SwiperSlide>
                        <SwiperSlide>
                        <IonCard className='kotak1'>
                              <img src={headerboard2}/>
                            <div className='overlay1'><b>Affordable</b><br/> We offer affordable price with best services.</div>
                            </IonCard>
                        </SwiperSlide>
                        <SwiperSlide>
                        <IonCard className='kotak1'>
                              <img src={headerboard3}/>
                            <div className='overlay1'><b>Guaranteed</b><br/>Safe and reliable We can guarantee that.</div>
                            </IonCard>
                           <IonButton expand='block' routerLink="/login">Get Started</IonButton>

                            
                            </SwiperSlide>
                        </Swiper>
                       
                        
            </IonCol>
            
       
            
            </IonContent>
            
        </IonPage>
    )
}

export default Page