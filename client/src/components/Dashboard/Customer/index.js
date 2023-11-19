'use client';
import { fetchAllUser } from '@/src/libs/getCustomers';
import { useEffect, useState } from 'react'
import CollapsibleTable from './createData';
import useMediaQuery from '@mui/material/useMediaQuery';

export const DashboardCustomer = () => {

  const isMobile = useMediaQuery('(max-width:768px)');

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
        <CollapsibleTable rows={customer} isMobile={isMobile}/>
  )
}