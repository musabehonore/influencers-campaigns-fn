'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

type Campaign = {
  _id: string;
  name: string;
  brandOwner: string;
  image: string;
  deadline: string;
  influencers: Array<{
    influencerId: string;
    name: string;
    joiningDate: string;
    numberOfPosts: number;
    posts: Array<{ link: string; status: string }>;
  }>;
};

const Campaigns = () => {
  const router =  useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('https://influencers-campaigns-bn.onrender.com/campaigns');
        const data = await response.json();

        if (data.success) {
          setCampaigns(data.data);
          toast.success(data.message || 'Campaigns loaded!');
        } else {
          toast.error(data.message || 'Failed to fetch campaigns.');
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        toast.error('An error occurred while fetching campaigns.');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading campaigns...</p>;
  }

  if (campaigns.length === 0) {
    return <p className="text-center mt-20">No campaigns found.</p>;
  }
  const handleCampaignClick = async (campaignId: string) => {
    await router.push(`/campaigns/id?campaignId=${campaignId}`);
  };
  return (
    <div className="container mx-auto mt-12 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">All Campaigns</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.name} className="shadow-lg p-4 rounded bg-white">
            <img
              src={campaign.image || '/default-campaign.jpg'}
              alt={campaign.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{campaign.name}</h2>
            <p className="text-gray-600 mb-2">Brand: {campaign.brandOwner}</p>
            <p className="text-gray-600 mb-2">
              Deadline: {new Date(campaign.deadline).toLocaleDateString()}
            </p>
            <button onClick={ ()=> handleCampaignClick(campaign._id)} className="mt-2 active:bg-[#7ca8f9] bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
