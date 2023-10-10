'use client';
import { fetchAllUser } from '@/src/libs/getCustomers';
import { useEffect, useState } from 'react'
import CollapsibleTable from './createData';

export const DashboardCustomer = () => {

  const [customer, setCustomer] = useState([])
  console.log('customer:', customer);

  // Function to fetch data
  const fetchData = () => {
    fetchAllUser()
      .then((data) => {
        console.log('data:', data);
        setCustomer(data);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <div>
        <CollapsibleTable rows={customer} />
      </div>
    </div>
  )
}