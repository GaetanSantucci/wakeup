'use client'
import React, { useEffect } from 'react';
import { useSearchParams } from "next/navigation";

export default function UnsubscribePage () {
    
    useEffect(async () => {
      const searchParams = useSearchParams();
      const email = searchParams.get('email');
      if (email) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT_LOCAL_TEST}/customers/newsletter`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
          });
          console.log(await response.json());
        } catch (error) {
          console.log(error);
        }
      }
    }, []);

        return (
            <div>
                <h1>Vous êtes maintenant désinscrit de la newsletter WAKE UP.</h1>
                <p>Vous pouvez à tout moment la réactiver via votre page profile</p>
            </div>
        );
    };
