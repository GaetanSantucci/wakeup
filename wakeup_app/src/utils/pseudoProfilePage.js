import { useState, useEffect } from 'react';

const Pseudo = ({ user }) => {
  const [pseudo, setPseudo] = useState('');

  useEffect(() => {
    const firstnameLetter = user?.firstname?.charAt(0);
    const lastnameLetter = user?.lastname?.charAt(0);
    const result = `${lastnameLetter}${firstnameLetter}`.toUpperCase();
    setPseudo(result);
  }, [user?.firstname, user?.lastname]);

  return pseudo;
};

export default Pseudo;
