'use client'

import Navbar from '../../../components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CampaignList from '../../../components/CampaignList';

interface Campaign {
  id: string;
  name: string;
  description: string;
}

const OwnedCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://influencers-campaigns-bn.onrender.com/api/campaigns/owned', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setCampaigns(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Owned Campaigns</h1>
        <CampaignList campaigns={campaigns} />
      </div>
    </div>
  );
};

export default OwnedCampaigns;
