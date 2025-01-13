import React from 'react';

interface Campaign {
  id: string;
  name: string;
  description: string;
}

interface CampaignListProps {
  campaigns: Campaign[];
}

const CampaignList: React.FC<CampaignListProps> = ({ campaigns }) => {
  if (campaigns.length === 0) {
    return <div>No campaigns available.</div>;
  }

  return (
    <div className="space-y-4">
      {campaigns.map(campaign => (
        <div key={campaign.id} className="bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-bold">{campaign.name}</h2>
          <p>{campaign.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CampaignList;
