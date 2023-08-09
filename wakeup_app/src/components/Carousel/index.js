'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import './carousel.scss';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const HomepageCarousel = ({ items }) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = (index) => {
    if (index < 0 || index >= items.length) {
      return;
    }
    setCurrentIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      goTo((currentIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handlePrev = () => {
    goTo(currentIndex - 1);
  };

  const handleNext = () => {
    goTo((currentIndex + 1) % items.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {items.map((image, i) => (
          <div
            key={i}
            className={`carousel-item ${i === currentIndex ? 'active' : ''}`}
          >
            <Image src={`/images/${image}.webp`} alt="carousel de photo de brunch" width={640} height={455} priority />
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <div className="carousel-control carousel-control-prev" onClick={handlePrev}>
          <ArrowBackIosNewOutlinedIcon />
        </div>
        <div className="carousel-control carousel-control-next" onClick={handleNext}>
          <ArrowForwardIosOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

const AddonCarousel = ({ products }) => {
  let addon = []
  products.forEach(element => {
    if (element.category === 'boisson' || element.category === 'decoration') {
      addon.push(element)
    }
  });
  console.log('addon:', addon);
  const [items, setItems] = useState(products);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = (index) => {
    if (index < 0 || index >= items.length) {
      return;
    }
    setCurrentIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      goTo((currentIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handlePrev = () => {
    goTo(currentIndex - 1);
  };

  const handleNext = () => {
    goTo((currentIndex + 1) % items.length);
  };

  return (
    <div className="carousel-addon">
      <div className="carousel-addon-inner">
        {addon.map((item, i) => {

          const price = item.price.toString().replace('.', ',');
          return (
            <div key={i} className={`carousel-addon-item ${i === currentIndex ? 'active' : ''}`}>
              <Image src={`/images/${item.image}.webp`} alt={item.name} width={250} height={230} priority />
              <div className='carousel-addon-item-description'>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span>{price} €</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="carousel-addon-controls">
        <div className="carousel-addon-control carousel-addon-control-prev" onClick={handlePrev}>
          <ArrowBackIosNewOutlinedIcon />
        </div>
        <div className="carousel-addon-control carousel-addon-control-next" onClick={handleNext}>
          <ArrowForwardIosOutlinedIcon />
        </div>
      </div>
    </div>
  );
}

export { HomepageCarousel, AddonCarousel };