'use client';
import { fetchAllUser } from '@/src/libs/getCustomers';
import { useEffect, useState } from 'react'

export const DashboardCustomer = () => {

  const [customer, setCustomer] = useState('')

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
      <h2>Page client</h2>
      <div>
        {
          customer.map(elem => {
            return (
              <p>{elem.lastname} - {elem.firstname} </p>
            )
          })
        }
      </div>
    </div>
  )
}