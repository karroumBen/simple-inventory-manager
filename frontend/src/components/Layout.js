import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useOutlet, useNavigate } from "react-router-dom";
import Chatbot from './Chatbot';

function Layout() {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const toggleChat = () => {
    setIsVisible(!isVisible);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
  }, [])

  return (
    <div>
      <Header />
      {outlet}
      <Footer />
      <button className='chatbot-btn' onClick={toggleChat}>Need help?</button>
      {isVisible && <Chatbot />}
    </div>
  )
}

export default Layout;