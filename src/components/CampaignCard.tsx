'use client';

interface CampaignCardProps {
  title: string;
  description: string;
}

const CampaignCard = ({ title, description }: CampaignCardProps) => (
  <div className="p-4 bg-secondary rounded-md shadow-md">
    <h2 className="font-bold">{title}</h2>
    <p>{description}</p>
  </div>
);

export default CampaignCard;
