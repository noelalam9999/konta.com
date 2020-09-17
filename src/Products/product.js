import React, { useState } from 'react';
import { TopNav } from '../LandingPage/TopNav/TopNav';
import { SubNav } from '../NavBar/SubNav/SubNav';
import { SearchBar } from '../SearchBar/SearchBar';
import styles1 from './product.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ReviewPostButton,TextArea} from './Form';
import { BrowseContent } from "../LandingPage/BrowseContent/BrowseContent";
import styles from '../LandingPage/LandingPage.module.css';
import LikeButtonDemo from "./reactButton";  
import StarRatingDemo from "./starRating";       
import { useLazyQuery, gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";

const GET_PRODUCT = gql`
query MyQuery($id: Int) {
  products(where: {Product_id: {_eq: $id}}) {
    Name
    Description
    user {
        id
      }
  }
}
`;

export function Product(props) {

    const { loading, error, data } = useQuery(GET_PRODUCT, {
        variables: { id: props.match.params.Product_id}
      });
       if (loading) return "Loading...";
       if (error) return `Error! ${error.message}`;  
return (
<>

   <TopNav/>

   
<br/>
    <div className={styles1.productInfoContainer}>
        <div style={{display: 'flex', flexDirection: 'row', maxWidth: '1800px', paddingLeft: '300px'}}>

            <img src="" className={styles1.userImage}/>

            <div className={styles1.styleinfo_productinfo}>
            {data.products.map((product,index)=>(
                <ul className={styles1.styleinfo_productname}>{product.Name} </ul>
                ))} 
                <ul className={styles1.styleinfo_productlocation}>205/1 Manhattan, New York, NY </ul>
                <ul><StarRatingDemo/></ul> 
                <ul className={styles1.styleinfo_producttime}> Open 10:00 AM-10:00 PM </ul>
            </div> 
            <div className={styles1.styleinfo_productinfo2}>
                <ul className={styles1.menu_itemlist}>
                    <li className={styles1.menuitem}>www.bitcreamery.com/creamery </li>
                </ul>
                <ul className={styles1.menu_itemlist}>
                    <li className={styles1.menuitem}>+01770347361</li>
                </ul>
                <ul className={styles1.menu_itemlist}>
                    <li className={styles1.menuitem}>Get Directions</li>
                </ul>
            </div>           
        </div>
    </div>
    <div className={styles1.productInfoContainer2}>
        <div className={styles1.reviewPostBox}>
            <div className={styles1.PostBox}>
                <ul className={styles1.boxTitle}>Write a Review </ul>
                <TextArea type='text' placeholder='Share your experience with us.'/>
                <ReviewPostButton> Post Review </ReviewPostButton>
            </div>
            <ul className={styles1.boxTitle}>Recommended Reviews</ul>
            <div className={styles1.reviewPanel}>  {/* start for each loop from here for every individual review */}

                <div className={styles1.ReviewBox}>
                    <div className={styles1.reviewerDetailBox}>
                        <div className={styles1.reviewerImage}>
                            <img src="" className={styles1.userImageSmall}/>
                        </div>
                        <div className={styles1.reviewerDetail}>
                            <ul>Fahim Fayaz</ul>
                            <ul>San Fancisco,CA</ul>
                        </div>
                    </div>
                    <div className={styles1.userReviewBox}>
                        <ul><StarRatingDemo/></ul>
                        <ul className={styles1.reviewDate}>7/7/2020</ul>
                        <ul> Seriously the BEST ice cream- even better than Salt & Straw, and I LOVE all the "adult" flavors, 
                            like Honey Lavender and Balsamic Strawberry. A little hack for you- if you were in it for the tastings,
                            we are in the middle of a pandemic, and they won't have them anyways, so you may as well just go across
                            the street to the Bi-Rite grocery and get that pint for cheaper.  Don't forget your spoon, and go eat it 
                            while hanging out in Dolores Park- socially-distanced, of course!
                        </ul>
                        <div><LikeButtonDemo/></div>
                    </div>
                </div>
                <div className={styles1.ReviewBox}>
                    <div className={styles1.reviewerDetailBox}>
                        <div className={styles1.reviewerImage}>
                            <img src="" className={styles1.userImageSmall}/>
                        </div>
                        <div className={styles1.reviewerDetail}>
                            <ul>Noel Alam</ul>
                            <ul>Fort Lauderdale, FL</ul>
                        </div>
                    </div>
                    <div className={styles1.userReviewBox}>
                            <ul><StarRatingDemo/></ul>
                            <ul className={styles1.reviewDate}>28/6/2020</ul>
                        <ul> 
                            HANDS DOWN BEST ICE CREAM IN THE CITY-- really my boyfriend and I came here for the second time after 
                            our little picnic at Mission Dolores Park. The first time we came here before COVID-19, we were able to 
                            try samples and we enjoyed every flavor that we sampled. The second time we went, they do only allow 4 people 
                            in the store at a time and they do have outdoor seating for customers to enjoy their sweet treats. 
                        </ul>
                        <div><LikeButtonDemo/></div>
                    </div>
                </div>                
            </div>
        </div>
        <div className={styles1.suggestionContainer}>
            <ul className={styles1.boxTitle}>You May Also Consider</ul>
            <div className={styles1.suggestionPanel}></div>

            <div className={styles1.productSuggestionBox}>
                    <div className={styles1.SuggestionDetailBox}>
                        <div className={styles1.reviewerImage}>
                            <img src="" className={styles1.userImageSmall}/>
                        </div>
                        <div className={styles1.reviewerDetail}>
                            <ul>White Canary</ul>
                            <div>
                                <ul><StarRatingDemo/></ul>
                            </div>
                        </div>        
                    </div>
                
                <div className={styles1.productSuggestionBox}>
                    <div className={styles1.SuggestionDetailBox}>
                        <div className={styles1.reviewerImage}>
                            <img src="" className={styles1.userImageSmall}/>
                        </div>
                        <div className={styles1.reviewerDetail}>
                            <ul>Cheese Cake Factory</ul>
                            <div>
                                <ul><StarRatingDemo/></ul>
                            </div>
                        </div>        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className={styles.landing3}>
                        <div className={styles['font']}>
                            <p>Browse By Content</p>
                        </div>

                        <div className={styles.landing1}>
                            <BrowseContent/>
                        </div>
                </div>

                <div className={styles.landing4}>
                        <div className={styles['font']}>
                            <p>Footer</p>
                        </div>
                </div>
</>
);
}
export default Product;