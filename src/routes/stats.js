import {useEffect, useState} from 'react';
import Nav from "../components/Nav";
import ChartRecentCampaigns from "../components/ChartRecentCampaigns";
import StatsCampaignsOverview from "../components/StatsCampaignsOverview";
import StatsActiveCampaigns from "../components/StatsActiveCampaigns";

import { getDocs, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getApps, getApp } from 'firebase/app';
import { cfg } from '../utils/firebaseConfig';
import { getAuth } from 'firebase/auth';

const auth = getAuth();


function App() {

  // Initialize Firebase
  const app = initializeApp(cfg);
  const db = getFirestore(app);

  const [campaigns, setCampaigns] = useState([]);
  const [allCampaignsLength, setAllCampaignsLength] = useState(null);
  const [activeCampaignsLength, setActiveCampaignsLength] = useState(null);
  const [campaignsWeekly, setCampaignsWeekly] = useState([]);
  const [showDashboard, setShowDashboard] = useState(null);

  const logoutHandler = () => {
    auth.signOut().then(() => {
      setShowDashboard(null);
      window.open('/', '_self')
    }).catch((error) => {
      console.log(error)
    });
  }

  const filterActiveHandler = (campaigns) => {
    const activeCampaigns = campaigns.filter((campaign) => campaign.status === "active");
    return activeCampaigns;
  }

  useEffect(() => {
    const userCheck = auth.onAuthStateChanged((user) => {
      if(user){
        // console.log(user)
        setShowDashboard(true);
      } else {
        setShowDashboard(null);
      }
    });
    return () => userCheck();
  }, [])

  useEffect(() => {
    const getAllCampaigns = async () => {
      const collectionRef = collection(db, "chippin");
      const documents = await getDocs(collectionRef);
      
      const campaignsPromises = documents.docs.map(async (doc) => {
        const campaignCollectionRef = collection(doc.ref, "campaigns");
        const campaignsSnapshot = await getDocs(campaignCollectionRef);
        return campaignsSnapshot.docs.map((campaignDoc) => ({
          ...campaignDoc.data(),
          uid: doc.id,
          cid: campaignDoc.id
        }));
      });
      
      const allCampaigns = (await Promise.all(campaignsPromises)).flat();
      
      setCampaigns(allCampaigns);
      setActiveCampaignsLength(filterActiveHandler(allCampaigns).length);
      setAllCampaignsLength(allCampaigns.length);
    };
  
    getAllCampaigns();
  }, [db, showDashboard]);

  useEffect(() => {
    const campaignsCreatedThisWeek = campaigns.filter((campaign) => {
      const today = new Date();
      const campaignDate = new Date(campaign.createdAt);
      const diffTime = Math.abs(today - campaignDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays <= 7;
    })
    console.log(campaignsCreatedThisWeek)
    setCampaignsWeekly(campaignsCreatedThisWeek);
    
  }, [campaigns])

  return (
    <>
    {!showDashboard ? <h1>Not Logged in</h1> : 
    <div className="flex flex-col md:h-screen md:flex-row">
      <Nav logout={() => logoutHandler()} />
      <div id="dash-container">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-5/12">
          <h1>Recent Campaigns</h1>
          <ChartRecentCampaigns data={campaignsWeekly} />
          </div>

          <div className="w-full md:w-6/12 mt-10 md:mt-0">
          <h1>Campaigns Overview</h1>
          <StatsCampaignsOverview total={allCampaignsLength} active={activeCampaignsLength} />
          </div>
        </div>

        <div className="mt-20">
          <h1>Active Campaigns Info</h1>
          <StatsActiveCampaigns campaigns={filterActiveHandler(campaigns)} />
        </div>

      </div>
    </div>
    }
    </>
  );
}

export default App;
