import React, { useState } from "react"; 
import { TopNav } from '../LandingPage/TopNav/TopNav';
import { SubNav } from '../NavBar/SubNav/SubNav';
import {Label,Button,TextArea,Input_price,Input_title} from './Form';
import { BrowseContent } from "../LandingPage/BrowseContent/BrowseContent";
import styles from '../LandingPage/LandingPage.module.css';
import FileUpload from './Fileupload'
import Axios from 'axios';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    // const [Images, setImages] = useState([])
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [ContinentValue, setContinentValue] = useState(1)

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
    const onTitleChange = (event)=> {
        setTitleValue(event.currentTarget.value)
    }
    const onDescriptionChange = (event)=> {
        setDescriptionValue(event.currentTarget.value)
    }
    const onPriceChange = (event)=> {
        setPriceValue(event.currentTarget.value)
    }
    const onContinentsSelectChange = (event) => {
        setContinentValue(event.currentTarget.value)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !PriceValue ||
            !ContinentValue || !image) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: image,
            continents: ContinentValue,
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })
        }

    return (
        <>
    <div> <TopNav/></div>
   
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Label > Upload Product</Label>
            </div>


            <form onSubmit={onSubmit} >

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
                <label style={{fontSize: "20px" }}>Title of your post</label>
                    <Input_title onChange={onTitleChange}
                    value={TitleValue} type='text' />

                <label  style={{fontSize: "20px" }}>Description</label>
                    <TextArea style={{margin: "1rem 0"}} onChange={onDescriptionChange}
                    value={DescriptionValue} type='text'/>

                <div className={styles.temp}>
                <span style={{marginRight: "15rem",fontSize: "20px"}}>Price(Tk)</span>
                <Input_price onChange={onPriceChange}
                    value={PriceValue} type='number' />
                <label style={{fontSize: "20px" }}> Location </label>
                <select style={{marginLeft: "1.5em",width: "120px",height: "30px", marginTop: "15px",borderRadius: "0.3em"}}onChange={onContinentsSelectChange} value={ContinentValue}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                </div>

               
                <br/>
                <Button onClick={onSubmit}>
                    Submit
                </Button>
            </form>
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
    )
}

export default Product_upload;