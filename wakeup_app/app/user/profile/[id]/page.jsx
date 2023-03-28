import { ScrollToTop, UserProfile } from '@/src/components';

export default function profilePage({ params}) {
  console.log('params: ', params);

  return (
    <>
      <ScrollToTop />
        <UserProfile />
    </>
  )
}
