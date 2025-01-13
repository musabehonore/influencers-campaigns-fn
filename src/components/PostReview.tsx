'use client'

import { useState } from 'react';
import axios from 'axios';

interface PostReviewProps {
  campaignId: string;
}

const PostReview: React.FC<PostReviewProps> = ({ campaignId }) => {
  const [influencerId, setInfluencerId] = useState('');
  const [postId, setPostId] = useState('');
  const [status, setStatus] = useState('');

  const handleReview = () => {
    const token = localStorage.getItem('token');
    axios.put(`https://influencers-campaigns-bn.onrender.com/api/campaigns/${campaignId}/review`, {}, {
      headers: { Authorization: `Bearer ${token}` },
      params: { influencerId, postId, status }
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div className="space-y-4">
      <input type="text" value={influencerId} onChange={(e) => setInfluencerId(e.target.value)} placeholder="Influencer ID" className="border p-2 rounded w-full" />
      <input type="text" value={postId} onChange={(e) => setPostId(e.target.value)} placeholder="Post ID" className="border p-2 rounded w-full" />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded w-full">
        <option value="">Select Status</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>
      <button onClick={handleReview} className="bg-blue-500 text-white px-4 py-2 rounded">Review Post</button>
    </div>
  );
};

export default PostReview;
