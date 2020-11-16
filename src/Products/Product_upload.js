import React, { useState } from "react"; 
import { TopNav } from '../LandingPage/TopNav/TopNav';
import { SubNav } from '../NavBar/SubNav/SubNav';
import { useMutation } from "@apollo/react-hooks";
import { useLazyQuery, gql } from "@apollo/client";
import {Label,Button,TextArea,Input_price,Input_title} from './Form';
import { BrowseContent } from "../LandingPage/BrowseContent/BrowseContent";
import styles from '../LandingPage/LandingPage.module.css';
import FileUpload from './Fileupload'
import Axios from 'axios';
import { useQuery } from "@apollo/react-hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { withApollo } from "@apollo/react-hoc";
import { useHistory } from "react-router-dom";
import { ActionSearch } from "material-ui/svg-icons";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const INSERT_PRODUCT_MOD = gql
`
mutation ($name:String!,$description:String!,$userId:String!,$moderator_id:String!,$Link:String!,$Link1:String!) {
    insert_products(objects:[{Name:$name, Description:$description, user_id:$userId, moderator_id:$moderator_id,store_location_link:$Link,Product_picture_link:$Link1}])
    {
      affected_rows
    }
  }
 ` 


 const INSERT_PRODUCT = gql
 `
 mutation ($name:String!,$description:String!,$userId:String!,$Link:String!) {
     insert_products(objects:[{Name:$name, Description:$description, user_id:$userId,store_location_link:$Link}])
     {
       affected_rows
     }
   }
  ` 

 const FIND_MOD = gql
 `
 query  {
    user(where: {user_type: {_eq: "moderator"}}) {
      id
    }
  }`
  ;


  const CHANGE_MOD_STATUS = gql
  `
  mutation ($id:String!) {
    update_user(where: {id: {_eq: $id}}, _set: {product_status: false}) {
      returning {
        product_status
      }
    }
  }
   `
   ;

const PRODUCT_ID = gql `
query MyQuery {
    products( order_by: {Product_id: desc}, limit: 1) {
      Product_id
    }
  }
  
`;

   let current_mod=-1;
let total_mods = 0;

const Continents = [
    { key: 1, value: "Dhaka" },
    { key: 2, value: "Chittagong" },
    { key: 3, value: "Khulna" },
    { key: 4, value: "Sylhet" },
    { key: 5, value: "Barishal" },
    { key: 6, value: "Rajshahi" },
    { key: 7, value: "Rangpur" }
]
export function Product_upload(props){
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    // const [Images, setImages] = useState([])
    const [image, setImage] = useState("");
    const history = useHistory();
    // const {user} = useAuth0();
    const [name, setTitleValue] = useState("");
    const [description, setDescriptionValue] = useState("");
    const [Link, setLinkValue] = useState("");
    const [PriceValue, setPriceValue] = useState(0);
    const [ContinentValue, setContinentValue] = useState(1);
    const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   // const [moderator_id, setModeratorId] = useState(1);
    
    
    // const updateImages = (newImages) => {
    //     setImages(newImages)
    // }
    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'konta-productimg')
        setLoading(true)
        const res = await fetch(
          '	https://api.cloudinary.com/v1_1/dr1xdii7w/image/upload',
          {
            method: 'POST',
            body: data
          }
        )
        const file = await res.json()
    
        setImage(file.secure_url)
        setLoading(false)
    }
   

    const onTitleChange = (e)=> {
        setTitleValue(e.target.value)
    }
    const onDescriptionChange = (e)=> {
        setDescriptionValue(e.target.value)
    }
    const onPriceChange = (e)=> {
        setPriceValue(e.target.value)
    }
    const onContinentsSelectChange = (e) => {
        setContinentValue(e.currentTarget.value)
    }
    const [insert_product] = useMutation(INSERT_PRODUCT);
    const [insert_product_mod] = useMutation(INSERT_PRODUCT_MOD);
 
    const [change_mod_status] = useMutation(CHANGE_MOD_STATUS);   
    
    const {data} = useQuery(FIND_MOD);
    const product_id =  useQuery(PRODUCT_ID)  
    // if (loading1) return "Loading...";
    // if (error1) return `Error! ${error.message}`;
  
   // console.log(product_id)
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error :(</p>;
           
        
  
    const onSubmit = (e) => {
       
        e.preventDefault();
        

        if (!name || !description  || !image) {
            return alert('fill all the mandatory fields first!')
        }
      
        
        // const variables = {
        //     writer: user.sub,
        //     title: TitleValue,
        //     description: DescriptionValue,
        //     price: PriceValue,
        //     images: image,
        //     continents: ContinentValue,
        // }

        // Axios.post('/api/product/uploadProduct', variables)
        //     .then(response => {
        //         if (response.data.success) {
        //             alert('Product Successfully Uploaded')
        //             props.history.push('/')
        //         } else {
        //             alert('Failed to upload Product')
        //         }
        //     })

        let mod_id = new Array();
        {data.user.map(({id},index) => (
            mod_id[index]=id
          ))}
          console.log(total_mods);
          total_mods = mod_id.length;
        
        const unassigned = "unassigned"; 
        if(current_mod<total_mods){
            current_mod++
        }
        else
        {
            current_mod=0
        }
        
            insert_product_mod({
                variables : {name, description, userId:props.match.params.id,moderator_id: mod_id[current_mod],Link:Link,Link1:image }
          
    
            }).catch(function(error){
                console.log(error);
                setError(error.toString());
            });
            change_mod_status({
            
                variables : {id:mod_id[current_mod] }
                
            }).catch(function(error){
                console.log(error);
                setError(error.toString());
            });
           
           
        setDescriptionValue('');
        setTitleValue('');  
       
        }
        const Redirect = ()=> {
            
          let product_id_var;
          product_id.data.products.map(({Product_id})=>(
             product_id_var = Product_id+1 
          ))
          history.push('/product/'+product_id_var) ;
      
        }   
    return (
        <>
    <div> <TopNav/></div>
   {isAuthenticated &&   (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Label > Upload Product</Label>
            </div>


            <form onSubmit={(e) => {onSubmit(e);Redirect()}} >

                {/* <FileUpload refreshFunction={updateImages} /> */}
                <div style={{display:'flex', alignItems: 'center' }}>
                {/* <FontAwesomeIcon icon="plus-circle" style={{fontSize: "5rem"}} onClick={uploadImage}/> */}
                <span> <input style={{}}
                    type="file"
                    name="file"
                    placeholder="Upload an image"
                    onChange={uploadImage}
                /></span>
                {loading ? (
                    <h3>Loading...</h3>
                ) : (
                    <img src={image} style={{ width: '250px', height:'320px'}} />
                )}
                </div>
                
                <br />
                <label style={{fontSize: "20px" }}>Name of your Product *</label>
                    <Input_title onChange={e=> setTitleValue(e.target.value)}
                    value={name} type='text' />

                <label  style={{fontSize: "20px" }}>Description *</label>
                    <TextArea style={{margin: "1rem 0"}} onChange={e=> setDescriptionValue(e.target.value)}
                    value={description} type='text'/>
                 <label  style={{fontSize: "20px" }}>Google map/Website Link</label>
                    <TextArea style={{margin: "1rem 0"}} onChange={e=> setLinkValue(e.target.value)}
                    value={Link} type='text'/>
                <div className={styles.temp}>
                <span style={{marginRight: "15rem",fontSize: "20px"}}>Price(Tk)</span>
                <Input_price onChange={onPriceChange}
                    value={PriceValue} type='number' />
                <label style={{fontSize: "20px" }}> Location </label>
                <select style={{marginLeft: "1.5em",width: "120px",height: "30px", marginTop: "15px",borderRadius: "0.3em"}} onChange={onContinentsSelectChange} value={ContinentValue}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                </div>

               
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>)
}
     

                <div className={styles.landing4}>
                        <div className={styles['font']}>
                            <p>Footer</p>
                        </div>
                </div>
        </>
    )
}

export default withApollo(Product_upload);