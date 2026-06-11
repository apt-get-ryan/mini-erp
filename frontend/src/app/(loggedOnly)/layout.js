import Header from '@/components/Layout/Header/Header';
import ContentBox from '@/components/Layout/ContentBox/ContentBox';
import { Notifications } from '@mantine/notifications';
import Breadcrumbs from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import 'mantine-datatable/styles.layer.css';
import Footer from '@/components/Layout/Footer/Footer';

export const metadata = {
  title: {
    template: "%s | Mini-ERP",
    default: "Mini-ERP"
  }
}

const Layout = async ({children}) => {

  return (
    <div className='grid grid-rows-[auto_auto_1fr_auto] min-h-dvh bg-base-400'>
      <Header/>
      <div className='mx-auto min-h-7 container mt-2 ml-4'>
        <Breadcrumbs/>
      </div>
      <ContentBox className={"mx-auto container py-3  mt-1 mb-2.5"}>
        {children}
      </ContentBox>
      <Footer/>
      <Notifications/>
    </div>
  )
}

export default Layout