import { useState } from "react";
import Navbar from "../../components/Home/Navbar/Navbar";
import SubscriptionModal from "../../components/Home/SubscriptionModal/SubscriptionModal";
import { Contact, Footer } from "../../components/Home/Contact/Contact";
import Features from "../../components/Home/Features/Features";
import Hero from "../../components/Home/Hero/Hero";
import HowItWorks from "../../components/Home/HowItWorks/HowItWorks";
import Pricing from "../../components/Home/Pricing/Pricing";
import StatsBar from "../../components/Home/StatsBar/StatsBar";
import CTA from "../../components/Home/CTA/CTA";

const Home  = ()=>{
      const [modalOpen, setModalOpen] = useState(false);
      const [selectedPlan, setSelectedPlan] = useState(null);
    
      const openModal = (planId = null) => {
        setSelectedPlan(planId);
        setModalOpen(true);
      };
return(
     <>
       <Navbar onSubscribe={() => openModal()} />
       <Hero onSubscribe={() => openModal()} />
        <Features />
       {/* <HowItWorks /> */}
       <Pricing onSubscribe={openModal} />
       <CTA onSubscribe={() => openModal()} />
       <Contact />
       <Footer />
 
       {modalOpen && (
         <SubscriptionModal
           initPlan={selectedPlan}
           onClose={() => setModalOpen(false)}
         />
       )}
     </>
)
}

export default Home;