'use client'

import Navbar from '../../../components/Navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostReview from '../../../components/PostReview';

interface Campaign {
  id: string;
  name: string;
  description: string;
}

const CampaignReview: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://influencers-campaigns-bn.onrender.com/api/campaigns/${id}`)
        .then(response => setCampaign(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);

  if (!campaign) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl font-bold mb-4">{campaign.name}</h1>
        <PostReview campaignId={id as string} />
      </div>
    </div>
  );
};

export default CampaignReview;
