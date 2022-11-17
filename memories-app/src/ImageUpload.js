import React, { useState, useEffect, useRef } from 'react';
import './ImageUpload.css'
import {Button} from "react-bootstrap";
import {MdModeEdit} from "react-icons/md";

function ImageUpload(props){
    const [file, setFile] = useState();
    const [previewUrl, setpreviewUrl]=useState();
    const filePickerRef = useRef();

    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload=()=>{
            setpreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    function pickedHandler(event){
        let pickedFile;
        if(event.target.files && event.target.files.length===1){
            pickedFile=event.target.files[0];
            setFile(pickedFile);
        }
        console.log("Inside pickedHandler" + `${previewUrl}`);

    }
    function pickedImageHandler(event){
        filePickerRef.current.click();
        let pickedFile;
        if(event.target.files && event.target.files.length===1){
            pickedFile=event.target.files[0];
            setFile(pickedFile);
            console.log("pickedImageHandler");
        }
    }

    return(
        <div className="user-note-collection-main cent">
        <input
        id={props.id}
        ref={filePickerRef}
        style={{display:"none"}}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
        />
        <div className={`image-upload ${props.center && "center"}`}>
            <div className="image-upload__preview">
                {previewUrl && <img src={previewUrl} alt= "preview"/>}
                {!previewUrl &&(
                    <div className="center">
                    <Button className="image-upload-button" type="button" onClick = {pickedImageHandler}> + </Button>
                    </div>
                )}
            </div>
            <div>
                {previewUrl &&(
                    <div className="center">
                    <Button className="image-upload-button" type="button" onClick = {pickedImageHandler}>
                    <MdModeEdit className="icon"></MdModeEdit>
                    </Button>
                    </div>
                )}
            </div>

        </div>
        </div>

    )
}
export default ImageUpload;