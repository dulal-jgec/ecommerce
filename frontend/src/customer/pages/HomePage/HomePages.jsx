import React from "react";
import MainCarousel from "../../components/homeCarousel/MainCarousel";
import HomeSectionCarosel from "../../components/HomeSectionCarosel/HomeSectionCarosel";

import { mens_kurta } from "../../../Data/mens_Kurta";



const HomePages = () => {
  return (
   <>
    <div>
      <MainCarousel />
    </div>
    <div>
      <HomeSectionCarosel  data={mens_kurta}
        sectionTitle="Men's Clothing"/>
        <HomeSectionCarosel  data={mens_kurta}
        sectionTitle="Women's Clothing"/>
        <HomeSectionCarosel  data={mens_kurta}
        sectionTitle="Men's Shoes"/>
    </div>
   </>
  );
};

export default HomePages;