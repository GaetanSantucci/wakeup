import { ScrollToTop, UserProfile } from '@/components';

export default function profilePage({ params}) {
  console.log('params: ', params);

  return (
    <>
      <ScrollToTop />
        <UserProfile />
    </>
  )
}
