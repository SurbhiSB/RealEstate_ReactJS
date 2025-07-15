
import { useEffect, useState } from 'react';
import StatCard from './StatCard';

export default function TotalListingsStatCard() {
  const [totalListings, setTotalListings] = useState(0);

  useEffect(() => {
    const fetchTotalListings = async () => {
      try {
        const res = await fetch('/api/listing/get');
        const data = await res.json();
        if (data) {
          setTotalListings(data.length);
        }
      } catch (error) {
        console.error('Error fetching total listings:', error);
      }
    };

    fetchTotalListings();
  }, []);

  return <StatCard title="Total Listings" value={totalListings} />;
}
