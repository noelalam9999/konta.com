import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        Axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {

                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])
                    alert('Image saved')

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}>
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '150px',
                        height: '150px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginLeft: '100px',
                        marginTop: '45px',
                    }}
                        {...getRootProps()}>
                        {console.log('getRootProps', { ...getRootProps() })}
                        {console.log('getInputProps', { ...getInputProps() })}
                        <input {...getInputProps()} />
                        <FontAwesomeIcon icon="plus-circle" style={{fontSize: "5rem"}} />

                    </div>
                )}
            </Dropzone>

                    <div style={{ display: 'flex', 
                        width: '350px', 
                        height: '240px', 
                        overflowX: 'scroll', 
                        border: '1px solid lightgray',
                        }}>

                        {Images.map((image, index) => (
                            <div onClick={() => onDelete(image)}>
                                <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:3000/${image}`} alt={`productImg-${index}`} />
                            </div>
                        ))}

                    </div>

        </div>
    )
}

export default FileUpload;