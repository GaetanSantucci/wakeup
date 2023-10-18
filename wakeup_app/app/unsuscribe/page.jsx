'use client'
import React, { useEffect } from 'react';
import { useSearchParams } from "next/navigation";

const UnsubscribePage = () => {
        const searchParams = useSearchParams();
        const email = searchParams.get('email');

        useEffect(() => {
            if (email) {
                fetch('/customers/newsletter', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(email)
                })
                    .then(response => {
                        console.log(response.json());
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }, [email]);

        return (
            <div>
                <h1>Vous êtes maintenant désinscrit de la newsletter WAKE UP.</h1>
                <p>Vous pouvez à tout moment la réactiver via votre page profile</p>
            </div>
        );
    };
