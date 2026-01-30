import Contact from './view/contact';
import { Categories } from './view/Cartegories';
import { Toplistsection } from './view/Toplistsection';
import { Brandshowcase } from './view/brandShowcase';
import { Heart, RefreshCcw, Sparkle,StickyNote } from 'lucide-react';
import { PlatformFeatures } from './view/platformFeatures';
import { PgManagement } from './view/pgManagement';
import { Hero } from './view/hero';
import { UserRoleModal } from './view/user-role-model';
// import { Search } from '../../components/view/SearchSection';
const Home = () => {
  return (
    <section className='h-auto'>
      <UserRoleModal/>
      <Hero/>
      <Brandshowcase />
      <PlatformFeatures/>
      <PgManagement/>
      {/* <Categories /> */}
      <Toplistsection />
      <Contact />
    </section>
  )
}

export default Home