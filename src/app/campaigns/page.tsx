'use client'

import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CampaignList from '../../components/CampaignList';

interface Campaign {
  id: string;
  name: string;
  description: string;
}

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:4000/campaigns')
      .then(response => {
        if (Array.isArray(response.data)) {
          console.log('RESPONSE DATA: ', response.data);
          setCampaigns(response.data);
        } else {
          setError('Invalid data format');
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl font-bold mb-4">All Campaigns</h1>
        <CampaignList campaigns={campaigns} />
      </div>
    </div>
  );
};

export default Campaigns;
