import { isPlatform } from '@ionic/core';
import { Redirect, Route } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useHistory } from 'react-router';

import { IonButton, IonAlert, IonRouterOutlet, IonCard, IonList, IonItem, IonAvatar, IonCardTitle, IonCardHeader, IonLabel, IonRow, IonCol, IonGrid, IonContent, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonBackButton, IonSearchbar, IonChip, IonItemDivider, IonCardContent, IonModal, IonInput, IonFooter } from '@ionic/react';
import { giftOutline, location, notificationsOutline, chevronDownOutline, lockClosedOutline, createOutline, addOutline, listOutline, informationOutline, helpOutline, informationCircleOutline, helpCircleOutline, documentTextOutline, addCircle, wallet, close } from 'ionicons/icons';
import {GoogleMap, InfoWindow, LoadScript, Marker} from '@react-google-maps/api';
import { useContext, useEffect, useState, useRef } from 'react';
import {collection, addDoc, query, getDoc, getDocs, doc} from "firebase/firestore";
import LaundryContext from '../data/laundry-context';
import avatar1 from '../images/avatar1.svg';
import './Profile.css'

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {getAuth, onAuthStateChanged, updateProfile, updatePassword} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes, UploadResult} from "firebase/storage";

const Profile: React.FC = () => {
  const laundryCtx = useContext(LaundryContext);
  const history = useHistory();



  const [isEditing, setIsEditing] = useState(false);
  const [startUpdatePassword, setIsUpdatingPassword] = useState(false);
  const [editingPassword, setIsEditingPassword] = useState(false);
  const nameRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const[selectedFile, setSelectedFile] = useState<File>();

  const [passwordStatus, setPasswordStatus] = useState<string>("");
  const [profileStatus, setProfileStatus] = useState<string>("");
  const [startUpdateProfile, setIsUpdatingProfile] = useState(false);

const[fileName, setFileName] = useState('');
const storage = getStorage();
const db = getFirestore();

  const auth = getAuth();
 const user = auth.currentUser;
 
if (user !== null) {
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;
  const uid = user.uid;
}

const editHandler = () => {
  setIsEditing(true);
}

const stopEditHandler = () => {
  setIsEditing(false);
}

const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSelectedFile(event.target!.files![0]);
  setFileName(event.target!.files![0].name);
};

const signOut = () => {
  firebase.auth().signOut().then(function() {
    history.replace("/login");
  }, function(error) {
    // An error happened.
  });
}



const insertHandler = async() => {
  if(fileName.length >= 1){
    const storageRef = ref(storage, fileName);
    uploadBytes(storageRef, selectedFile as Blob).then((snapshot:UploadResult) => {
        console.log('upload file success');
        getDownloadURL(ref(storage, fileName)).then((url:string)=>{
          confirmEditHandler(url);
        })
  
    })
  }
  else{
    editNameHandler();
  }
};

const confirmEditHandler = (url: string) =>{
  const enteredName = nameRef.current!.value;
  if(!enteredName) return;


    updateProfile(user!, {
      displayName: enteredName.toString(), photoURL: url
    }).then(() => {
      setIsEditing(false);
      setProfileStatus("Profile successfully updated!");
      setIsUpdatingProfile(true);
      // Profile updated!
      // ...
    }).catch((error) => {
      setIsEditing(false);
      setProfileStatus("Profile failed to update!");
      setIsUpdatingProfile(true);
      // An error occurred
      // ...
    });
  
}

const editNameHandler = () => {
  const enteredName = nameRef.current!.value;
  if(!enteredName) return;

  updateProfile(user!, {
    displayName: enteredName.toString()
  }).then(() => {
    setIsEditing(false);
    
    setProfileStatus("Profile successfully updated!");
      setIsUpdatingProfile(true);
    // Profile updated!
    // ...
  }).catch((error) => {
    setIsEditing(false);
    setProfileStatus("Profile failed to update!");
      setIsUpdatingProfile(true);
    // An error occurred
    // ...
  });
}

const updatePasswordHandler = () => {
  setIsEditingPassword(true);
}

const stopUpdatePasswordHandler = () => {
  setIsEditingPassword(false);
}


const confirmUpdatePasswordHandler = () => {
  const user = auth.currentUser;
  const newPassword = passwordRef.current!.value;
  if(!newPassword) return;

updatePassword(user!, newPassword.toString()).then(() => {
  // Update successful.
  setIsEditingPassword(false);
  setPasswordStatus("Password update success!")
  setIsUpdatingPassword(true);
}).catch((error) => {
  // An error ocurred
  // ...
  setIsEditingPassword(false);
  setPasswordStatus("An error has occured! Password update failed.");
  setIsUpdatingPassword(true);
});
}

const [coins, setCoins] = useState(0);
const[openCoins, setCoinHistory] = useState(false);
const[username, setUsername] = useState('');
const[phoneNum, setPhoneNum] = useState('');
const [coinsHistoryList, setCoinsHistoryList] = useState<Array<any>>([]);

const openCoinsHandler = () =>{
  setCoinHistory(true);
}
const closeCoins = () =>{
  setCoinHistory(false);
}

const userdb = user?.uid;
useEffect(() => {
  async function getCoins() {
    const db = getFirestore();
    const docRef = doc(db, userdb!.toString(), "coins");
    const docSnap = await getDoc(docRef);
    const coins = docSnap.get("coins");
    console.log("Getting coins in profile");
    setCoins(coins);
  }
  async function getInfo() {
    const db = getFirestore();
    const docRef = doc(db, userdb!.toString(), "info");
    const docSnap = await getDoc(docRef);
    const username = docSnap.get("username");
    const phoneNum = docSnap.get("phoneNumber");
    setUsername(username);
    setPhoneNum(phoneNum);
  }
  async function getCoinHistory() {
    const coinHistory = query(collection(db, userdb!.toString(), "coins", "coinsHistory"));
    const querySnapshot = await getDocs(coinHistory);
    // console.log('querySnapshot:', querySnapshot);
    setCoinsHistoryList(querySnapshot.docs.map((doc) =>({...doc.data(), id: doc.id})));
    console.log(coinsHistoryList);
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    //   console.log('doc:', doc);
    // });
  }
    getCoins();
    getInfo();
    getCoinHistory();
}, [coins, laundryCtx.orders.length]);

const [privacy, setPrivacy] = useState(false);
const openPrivacy = () =>{
  setPrivacy(true);
}
const closePrivacy = () =>{
  setPrivacy(false);
}

const [terms, setTerms] = useState(false);
const openTerms = () =>{
  setTerms(true);
}
const closeTerms = () =>{
  setTerms(false);
}

const [about, setAbout] = useState(false);
const openAbout = () =>{
  setAbout(true);
}
const closeAbout = () =>{
  setAbout(false);
}


const [help, setHelp] = useState(false);
const openHelp = () =>{
  setHelp(true);
}
const closeHelp = () =>{
  setHelp(false);
}


  return (
    

    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonModal isOpen={privacy}>
      <IonHeader>
            <IonToolbar color='primary'>
              <IonButtons slot='start'>
              <IonButton fill="clear" onClick={closePrivacy}>
              <IonIcon icon={close} slot="icon-only"></IonIcon>
              </IonButton>
              </IonButtons>
              <IonTitle>Privacy Policy</IonTitle>
            </IonToolbar>
          </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
            <h2><strong>Privacy Policy for LaundryIn</strong></h2>

<p>At LaundryIn, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by LaundryIn and how we use it.</p>

<p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>

<p>This Privacy Policy applies only to our online activities and is valid for visitors to our application with regards to the information that they shared and/or collect in LaundryIn. This policy is not applicable to any information collected offline or via channels other than this application.</p>

<h2>Consent</h2>

<p>By using our application, you hereby consent to our Privacy Policy and agree to its terms.</p>

<h2>Information we collect</h2>

<p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
<p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
<p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>

<h2>How we use your information</h2>

<p>We use the information we collect in various ways, including to:</p>

<ul>
<li>Provide, operate, and maintain our application</li>
<li>Improve, personalize, and expand our application</li>
<li>Understand and analyze how you use our application</li>
<li>Develop new products, services, features, and functionality</li>
<li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the application, and for marketing and promotional purposes</li>
<li>Send you emails</li>
<li>Find and prevent fraud</li>
</ul>

<h2>Log Files</h2>

<p>LaundryIn follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the application, and gathering demographic information.</p>




<h2>Advertising Partners Privacy Policies</h2>

<p>You may consult this list to find the Privacy Policy for each of the advertising partners of LaundryIn.</p>

<p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on LaundryIn, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>

<p>Note that LaundryIn has no access to or control over these cookies that are used by third-party advertisers.</p>

<h2>Third Party Privacy Policies</h2>

<p>LaundryIn's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>

<p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>

<h2>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>

<p>Under the CCPA, among other rights, California consumers have the right to:</p>
<p>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
<p>Request that a business delete any personal data about the consumer that a business has collected.</p>
<p>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</p>
<p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

<h2>GDPR Data Protection Rights</h2>

<p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
<p>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</p>
<p>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p>
<p>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</p>
<p>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>
<p>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</p>
<p>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p>
<p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

<h2>Children's Information</h2>

<p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>

<p>LaundryIn does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our application, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>

    <IonModal isOpen={terms}>
      <IonHeader>
            <IonToolbar color='primary'>
              <IonButtons slot='start'>
              <IonButton fill="clear" onClick={closeTerms}>
              <IonIcon icon={close} slot="icon-only"></IonIcon>
              </IonButton>
              </IonButtons>
              <IonTitle>Terms and Conditions</IonTitle>
            </IonToolbar>
          </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
            <h2><strong>Terms and Conditions</strong></h2>

<p>Welcome to LaundryIn!</p>

<p>These terms and conditions outline the rules and regulations for the use of LaundryIn.</p>

<p>By using this app we assume you accept these terms and conditions. Do not continue to use LaundryIn if you do not agree to take all of the terms and conditions stated on this page.</p>

<p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Indonesia. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>
<h3><strong>License</strong></h3>

<p>Unless otherwise stated, LaundryIn and/or its licensors own the intellectual property rights for all material on LaundryIn. All intellectual property rights are reserved. You may access this from LaundryIn for your own personal use subjected to restrictions set in these terms and conditions.</p>

<p>You must not:</p>
<ul>
    <li>Republish material from LaundryIn</li>
    <li>Sell, rent or sub-license material from LaundryIn</li>
    <li>Reproduce, duplicate or copy material from LaundryIn</li>
    <li>Redistribute content from LaundryIn</li>
</ul>

<p>This Agreement shall begin on the date hereof.</p>

<p>Parts of this app offer an opportunity for users to post and exchange opinions and information in certain areas of the website. LaundryIn does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of LaundryIn, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, LaundryIn shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>

<p>LaundryIn reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

<p>You warrant and represent that:</p>

<ul>
    <li>You are entitled to post the Comments on our App and have all necessary licenses and consents to do so;</li>
    <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
    <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
    <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
</ul>

<p>You hereby grant LaundryIn a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>

<h3><strong>Hyperlinking to our App</strong></h3>

<p>The following organizations may link to our App without prior written approval:</p>

<ul>
    <li>Government agencies;</li>
    <li>Search engines;</li>
    <li>News organizations;</li>
    <li>Online directory distributors may link to our App in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
    <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
</ul>

<p>These organizations may link to our home page, to publications or to other App information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.</p>

<p>We may consider and approve other link requests from the following types of organizations:</p>

<ul>
    <li>commonly-known consumer and/or business information sources;</li>
    <li>dot.com community sites;</li>
    <li>associations or other groups representing charities;</li>
    <li>online directory distributors;</li>
    <li>internet portals;</li>
    <li>accounting, law and consulting firms; and</li>
    <li>educational institutions and trade associations.</li>
</ul>

<p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of LaundryIn; and (d) the link is in the context of general resource information.</p>

<p>These organizations may link to our App so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.</p>

<p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our App, you must inform us by sending an e-mail to LaundryIn. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our App, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>

<p>Approved organizations may hyperlink to our App as follows:</p>

<ul>
    <li>By use of our corporate name; or</li>
    <li>By use of the uniform resource locator being linked to; or</li>
    <li>By use of any other description of our App being linked to that makes sense within the context and format of content on the linking party’s site.</li>
</ul>

<p>No use of LaundryIn's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>

<h3><strong>iFrames</strong></h3>

<p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our App.</p>

<h3><strong>Content Liability</strong></h3>

<p>We shall not be hold responsible for any content that appears on your App. You agree to protect and defend us against all claims that is rising on our App. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

<h3><strong>Your Privacy</strong></h3>

<p>Please read Privacy Policy.</p>

<h3><strong>Reservation of Rights</strong></h3>

<p>We reserve the right to request that you remove all links or any particular link to our App. You approve to immediately remove all links to our App upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our App, you agree to be bound to and follow these linking terms and conditions.</p>

<h3><strong>Removal of links from our App</strong></h3>

<p>If you find any link on our App that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>

<p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>

<h3><strong>Disclaimer</strong></h3>

<p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our App and the use of this website. Nothing in this disclaimer will:</p>

<ul>
    <li>limit or exclude our or your liability for death or personal injury;</li>
    <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
    <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
    <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
</ul>

<p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>

<p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>


            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>

    <IonModal isOpen={about}>
      <IonHeader>
            <IonToolbar color='primary'>
              <IonButtons slot='start'>
              <IonButton fill="clear" onClick={closeAbout}>
              <IonIcon icon={close} slot="icon-only"></IonIcon>
              </IonButton>
              </IonButtons>
              <IonTitle>About</IonTitle>
            </IonToolbar>
          </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
            <h2><strong>About LaundryIn</strong></h2>
            <p>LaundryIn is an online laundry application designed to help laundry businesses as well as customers alike. We provide pickup and delivery services with great quality and price.</p>

<p>LaundryIn was created as part of Mobile Cross-Platform Programming finals in 2022.</p>

<p>It was designed and coded by Odelia Naomi and Muhammad Hamzah Abiyyu.</p>

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>

    <IonModal isOpen={help}>
      <IonHeader>
            <IonToolbar color='primary'>
              <IonButtons slot='start'>
              <IonButton fill="clear" onClick={closeHelp}>
              <IonIcon icon={close} slot="icon-only"></IonIcon>
              </IonButton>
              </IonButtons>
              <IonTitle>Help</IonTitle>
            </IonToolbar>
          </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
            <h2><strong>Help</strong></h2>
            <p>LaundryIn strives to better its service. Please contact us at the contact information below.</p>
            <ul>
    <li>Odelia: odelia.naomi@student.umn.ac.id</li>
    <li>Hamzah: muhammad.hamzah@student.umn.ac.id</li>
</ul>
<p>You may also visit us at <a href="https://github.com/oden-ao/laundry-in">LaundryIn's GitHub page.</a></p>

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>

      <IonAlert isOpen={startUpdateProfile} 
            header= "Profile Update"
            message={profileStatus}
            buttons={[
                {text: 'Ok', role: 'confirm', handler: () => {setIsEditingPassword(false)}}
            ]}/>

      <IonAlert isOpen={startUpdatePassword} 
            header= "Password Update"
            message={passwordStatus}
            buttons={[
                {text: 'Ok', role: 'confirm', handler: () => {setIsEditingPassword(false)}}
            ]}/>

    <IonModal isOpen={openCoins}>
    <IonHeader>
            <IonToolbar color='primary'>
              <IonButtons slot='start'>
              <IonButton fill="clear" onClick={closeCoins}>
              <IonIcon icon={close} slot="icon-only"></IonIcon>
              </IonButton>
              </IonButtons>
              <IonTitle>Coin History</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          {coinsHistoryList.length === 0?<IonGrid>
            <br/>
            <IonRow>
              <IonCol className='ion-text-center'>
                You haven't earned any coins!
              </IonCol>
            </IonRow>
          </IonGrid>:
          <IonGrid>
            {coinsHistoryList.map(history=> (
              <IonItem key={history.id}>
                <IonLabel>
                {history.date} <br/>
                <b>Earned {history.coins} coins </b>
                <br/>
                {!history.num?"from Gift":
                <div>from Order ID #{history.num}</div>
                }
                
                </IonLabel>
              </IonItem>
            ))}
          </IonGrid>
          }
          </IonContent>
         
    </IonModal>


      <IonModal isOpen={isEditing}>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
          <IonButton fill="clear" onClick={stopEditHandler}>
          <IonIcon icon={close} slot="icon-only"></IonIcon>
          </IonButton>
          </IonButtons>
          <IonTitle>Update Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
        
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
              <br/>
          <IonItem>
            <IonLabel><b>Display Name</b></IonLabel>
            <IonInput type='text' ref={nameRef} value={user?.displayName}></IonInput>
          </IonItem>
          <br/>
              </IonCol>
            </IonRow>
            <IonRow className='ion-text-center'>
              <IonCol>
              <IonLabel><b>Profile Picture</b>
              </IonLabel><input type="file" onChange={fileChangeHandler}/><br/>
              </IonCol>
            </IonRow>
          </IonGrid>
         
        </IonContent>
        <IonFooter>
            <IonToolbar>
            <IonButton onClick={insertHandler} expand="block">Update Profile</IonButton>
            </IonToolbar>
          </IonFooter>
      </IonModal>

      <IonModal isOpen={editingPassword}>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot='start'>
          <IonButton fill="clear" onClick={stopUpdatePasswordHandler}>
          <IonIcon icon={close} slot="icon-only"></IonIcon>
          </IonButton>
          </IonButtons>
          <IonTitle>Update Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonGrid>
        <br/>
        <IonRow>
          <IonCol>
          <IonItem>
            <IonLabel><b>New Password</b></IonLabel>
            <IonInput type='text' ref={passwordRef}></IonInput>
          </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonFooter>
            <IonToolbar>
            <IonButton onClick={confirmUpdatePasswordHandler} expand="block">Update Password</IonButton>
            </IonToolbar>
          </IonFooter>
      </IonModal>


      <IonContent>

        <IonGrid>
          <IonRow>
            <IonCol size-sm='8' offset-sm='2' size-md="6" offset-md="3">
            <IonCard>
              <IonCardHeader>
              <div className='edit'>
                <IonButton fill='clear' onClick={editHandler}><IonIcon icon={createOutline} slot='icon-only'></IonIcon></IonButton>
              </div>
              </IonCardHeader>
          
            <IonCardContent>
            <IonRow>
              <IonCol size='auto'>
                <IonAvatar><img src={user?.photoURL?user.photoURL:avatar1}/></IonAvatar>
              </IonCol>
              <IonCol size='auto'>
                <h1>{user?.displayName?user?.displayName:username}</h1>
                {user?.phoneNumber?user?.phoneNumber:phoneNum} <br/>
                {user?.email}
              </IonCol>
              

              
            </IonRow>
            </IonCardContent>

              
          </IonCard>

          <IonCard color='primary'>
            
            <IonCardHeader>
              Your Coins
              <div className='coinbtn'>
            <IonButton className='btncolor' fill='clear'><IonIcon slot="icon-only" icon={addCircle}></IonIcon></IonButton>
            <IonButton onClick={openCoinsHandler} className='btncolor' fill='clear'><IonIcon slot="icon-only" icon={wallet}></IonIcon></IonButton>
            </div>
            </IonCardHeader>
            <IonCardContent>
                <IonCardTitle>{coins} Coins</IonCardTitle>
            </IonCardContent>
          </IonCard>

          <br/>

          <IonCard>
            <IonCardHeader>
            <IonCardTitle>Settings</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
            <IonList>
              <IonItem onClick={updatePasswordHandler}>
                <IonIcon icon={lockClosedOutline}></IonIcon>
                <IonLabel>Change Password</IonLabel>
              </IonItem>
              <IonItem onClick={openPrivacy}>
                <IonIcon icon={documentTextOutline}></IonIcon>
                <IonLabel>Privacy Policy</IonLabel>
              </IonItem>
              <IonItem onClick={openTerms}>
                <IonIcon icon={listOutline}></IonIcon>
                <IonLabel>Terms and Conditions</IonLabel>
              </IonItem>
              <IonItem onClick={openAbout}>
                <IonIcon icon={informationCircleOutline}></IonIcon>
                <IonLabel>About</IonLabel>
              </IonItem>
              <IonItem onClick={openHelp}>
                <IonIcon icon={helpCircleOutline}></IonIcon>
                <IonLabel>Help</IonLabel>
              </IonItem>
            </IonList>
            <IonRow className='ion-text-center'>
              <IonCol>
              <IonButton onClick={signOut}>Log Out</IonButton>
              </IonCol>
            
            </IonRow>

            
            </IonCardContent>
            
          </IonCard>
            </IonCol>
          </IonRow>
          

        </IonGrid>

       
       
      </IonContent>
    </IonPage>

    
  );
};

export default Profile;
