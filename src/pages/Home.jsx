import React from 'react'
import Container from '../components/Container'
import SiteBar from '../components/helpers/SiteBar';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <section className='pb-12 pt-6'>
      <Container>
        <div className='flex gap-x-6'>
          <div className='border border-gray-200 rounded w-1/4 h-fit'>
            <SiteBar />
          </div>
          <div className='border border-gray-200 rounded w-3/4 py-6 px-4'>
            <Outlet />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Home
