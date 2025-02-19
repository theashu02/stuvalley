'use client';

import { useState, useEffect } from 'react';
import { ResearchContribution } from '@/schemas/schema';
import { Button } from './ui/button';

export default function Research() {
  const [research, setResearch] = useState<ResearchContribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    try {
      const response = await fetch('/api/research');
      const data = await response.json();
      setResearch(data.research_contributions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching research:', error);
      setLoading(false);
    }
  };

  const deleteResearch = async (id: string) => {
    try {
      await fetch(`/api/research/${id}`, {
        method: 'DELETE',
      });
      fetchResearch();
    } catch (error) {
      console.error('Error deleting research:', error);
    }
  };

  if (loading) return <div>Loading research...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Research Contributions</h2>
      <div className="grid gap-4">
        {research.map((item) => (
          <div key={item._id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <div className="flex gap-2 mt-2">
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">{item.year}</span>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">{item.type}</span>
            </div>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <a
              href={item.doi}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline block mt-2"
            >
              View Publication
            </a>
            <Button
              variant="destructive"
              className="mt-4"
              onClick={() => deleteResearch(item._id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 