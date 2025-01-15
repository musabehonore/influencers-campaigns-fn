'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

type Campaign = {
  name: string;
  brandOwner: string;
  image: string;
  deadline: string;
  influencers: Array<{
    _id: string;
    name: string;
    joiningDate: string;
    numberOfPosts: number;
    posts: Array<{ link: string; status: string }>;
  }>;
};

type Influencer = {  
  _id: string;
  name: string;
  joiningDate: string;
  numberOfPosts: number;
  posts: Array<{ link: string; status: string }>;
}

type decodedToken = {
  id: string,
  name: string,
  role: string,
  email: string,
  iat: number,
  exp: number
}

const CampaignDetails = () => {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [postLink, setPostLink] = useState('');
  const [myPosts, setMyPosts] = useState<Array<{ link: string; status: string }>>([]);
  // const router = useRouter();
  const searchParams = useSearchParams();
  const campaignId = searchParams?.get('campaignId');

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!campaignId) {
        toast.error('Invalid campaign ID.');
        return;
      }

      try {
        const response = await fetch(
          `https://influencers-campaigns-bn.onrender.com/campaigns/${campaignId}`
        );
        const data = await response.json();

        if (data.success) {
          setCampaign(data.data);
          toast.success('Campaign loaded!');

          // const influencerId = localStorage.getItem('influencerId');
          const token = localStorage.getItem('token');
          if (!token) {
            toast.error('You must be logged in to join a campaign.');
            return;
          }
          const decoded = jwtDecode(token) as decodedToken;
          const influencerName = decoded.name;
          const joinedInfluencer = data.data.influencers.find(
            (influencer: Influencer) => influencer.name === influencerName
          );

          if (joinedInfluencer) {
            setIsJoined(true);
            setMyPosts(joinedInfluencer.posts || []);
          }
        } else {
          toast.error(data.message || 'Failed to fetch campaign.');
        }
      } catch (error) {
        console.error('Error fetching campaign:', error);
        toast.error('An error occurred while fetching campaign.');
      } finally {
        setLoading(false);
      }
    };

    const userRole = localStorage.getItem('role');
    setRole(userRole);
    fetchCampaign();
  }, [campaignId]);

  const handleJoinCampaign = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You must be logged in to join a campaign.');
        return;
      }

      const response = await fetch(
        `https://influencers-campaigns-bn.onrender.com/campaigns/${campaignId}/join`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        toast.success(data.message || 'Successfully joined the campaign!');
        setIsJoined(true);
      } else if (data.message === 'You have already joined this campaign.') {
        toast.error(data.message || 'Failed to join the campaign.');
        setIsJoined(true);
      } else {
        toast.error(data.message || 'Failed to join the campaign.');
      }
    } catch (error) {
      console.error('Error joining campaign:', error);
      toast.error('An error occurred while joining the campaign.');
    }
  };

  const handleSubmitPost = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You must be logged in to submit a post.');
        return;
      }

      const response = await fetch(
        `https://influencers-campaigns-bn.onrender.com/campaigns/${campaignId}/post`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ link: postLink }),
        }
      );
      const data = await response.json();

      if (data.success) {
        toast.success(data.message || 'Post submitted successfully!');
        setPostLink('');

        // Add new post to "My Posts"
        setMyPosts((prevPosts) => [...prevPosts, { link: postLink, status: 'Pending' }]);
      } else {
        toast.error(data.message || 'Failed to submit post.');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      toast.error('An error occurred while submitting post.');
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Loading campaign...</p>;
  }

  if (!campaign) {
    return <p className="text-center mt-20">Campaign not found.</p>;
  }

  return (
    <div className="container mx-auto mt-12 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">{campaign.name}</h1>
      <div className="shadow-lg p-6 rounded bg-white">
        <img
          src={campaign.image || '/default-campaign.jpg'}
          alt={campaign.name}
          className="w-full h-64 object-cover rounded mb-6"
        />
        <p className="text-gray-600 mb-4">
          <strong>Brand:</strong> {campaign.brandOwner}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Deadline:</strong>{' '}
          {new Date(campaign.deadline).toLocaleDateString()}
        </p>

        {role === 'manager' ? (
          <div>
            <h2 className="text-xl font-bold mb-2">Influencers who joined this campaign</h2>
            {campaign.influencers.map((influencer, index) => (
              <div key={index} className="mb-4">
                <p>
                  <strong>Name </strong> {influencer.name}
                </p>
                <p className="w-[223px] whitespace-nowrap overflow-hidden">
                  <strong>Date joined </strong> {influencer.joiningDate}
                </p>
                <p>
                  <strong>Number of Posts </strong> {influencer.numberOfPosts}
                </p>
                {influencer.posts.map((post, index) => (
                      <li key={index} className="mb-2">
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {post.link}
                        </a>{' '}
                        - <span className="text-gray-600 bg-lime-200 p-1">{post.status}</span>
                      </li>
                    ))}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mb-4">
            Join this campaign to contribute and see more details!
          </p>
        )}

        {role === 'influencer' && (
          <div className="mt-6">
            {isJoined ? (
              <>
                <h2 className="text-2xl font-bold mb-4">My Posts</h2>
                {myPosts.length > 0 ? (
                  <ul>
                    {myPosts.map((post, index) => (
                      <li key={index} className="mb-2">
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {post.link}
                        </a>{' '}
                        - <span className="text-gray-600 bg-lime-200 p-1">{post.status}</span>
                      </li>
                    ))}
                  </ul>                  
                ) : (
                  <p className="text-gray-600">You have not submitted any posts yet.</p>
                )}
                <input
                  type="url"
                  placeholder="Enter your post link"
                  value={postLink}
                  onChange={(e) => setPostLink(e.target.value)}
                  className=" bg-[#d3e2ff] focus:outline-none shadow-lg p-2 mb-4 w-full text-black"
                />
                <button
                  onClick={handleSubmitPost}
                  className=" shadow-lg p-2 bg-[#2B71F0] text-white hover: active:bg-[#7ca8f9] hover:bg-[#0246c3]"
                >
                  Submit Post
                </button>
              </>
            ) : (
              <button
                onClick={handleJoinCampaign}
                className="shadow-lg p-2 bg-[#2B71F0] text-white hover: active:bg-[#7ca8f9] hover:bg-[#0246c3]"
              >
                Join Campaign
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDetails;
