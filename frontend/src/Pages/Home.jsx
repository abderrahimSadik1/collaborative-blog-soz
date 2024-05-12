import { useContext } from 'react';
import { AuthContext } from '../api/AuthContext'; 
import Hero from '../components/Hero'
import BlogSection from './BlogSection'; // Ensure this component is properly imported



function Home() {
  const { isAuth } = useContext(AuthContext); // Destructure `isAuth` from your context

  return (
    <div>
      {isAuth ? <><BlogSection/></>
      :<><Hero /></>}
    </div>
  );
}

export default Home;
