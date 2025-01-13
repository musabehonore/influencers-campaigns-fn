'use client'

import { useState } from 'react';
import axios from 'axios';

interface PostFormProps {
  campaignId: string;
}

const PostForm: React.FC<PostFormProps> = ({ campaignId }) => {
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post(`https://influencers-campaigns-bn.onrender.com/api/campaigns/${campaignId}/post`, { link }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Post Link" className="border p-2 rounded w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Post</button>
    </form>
  );
};

export default PostForm;
