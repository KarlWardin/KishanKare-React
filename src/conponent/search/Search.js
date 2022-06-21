import "./search.css"
import { useState } from "react"
import axios from "axios";
import { getDownloadURL, ref as sRef, getStorage, uploadBytesResumable } from "firebase/storage";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import upload_logo from "../../images/upload_logo.png"



export default function Search() {

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("Please Upload an image of diseased plant Leaf");
    const [description, setDescription] = useState(``);
    const [prevent, setPrevent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [uploadedImg, setUploadedImg] = useState(upload_logo);
    const { user } = useContext(AuthContext);

    const filePathHandler = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            //console.log(image);
        }
    }

    const getDiseaseInfo = async (downloadURL) => {
        try {
            const data = new FormData();
            data.append('file', image );
            const res = await axios.post(`http://127.0.0.1:5000/submit`,data);
            //console.log(res);
            setTitle(res.data.title);
            setDescription(res.data.description);
            setPrevent(res.data.prevent);
            setImageUrl(res.data.image_url);
            //setUploadedImg(image);
        } catch (err) {
            console.log(err);
        }
    }

    /*
    // UPLOADING IMAGE TO FIREBASE
    const handleImageUpload = () => {
        if (image == null) return;
        console.log("uploading to firebase....")
     
        try{
        const storage = getStorage();
        const storageRef = sRef(storage, `images/${image.name}`);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
            (snapshot) => { },                 //uploading
            (err) => { console.log(err); },    //error
            () => {                            //successful
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    diseaseInfo(downloadURL);
                    handlePathUpload(downloadURL);
                });
            }
        );
        }catch(err){
            console.log(err);
            setDescription("Something went wrong please try again")
        }
        
    }

    // UPLOADING FILE PATH TO REALTIME FIRESTORE
    const handlePathUpload = (path) => {
        const db = getDatabase();
        set(dbRef(db, `test_uploads/${user.uid}`), {
            time: new Date(),
            url: path
        });
    }
    */


    return (
        <div className="container">

            <form className="searchContainer">
                <label htmlFor="input_file">
                    <img id="upload_img" src={uploadedImg} alt="upload the file here"></img>
                </label>
                <input
                    id="input_file"
                    type="file"
                    accept="image/*"
                    capture="camera"
                    onChange={filePathHandler}>
                </input>
                {image ?
                    <p style={{ color: "green" }}>{image.name}</p>
                    : <p style={{ color: "red" }}>**please Select an Image</p>
                }

                <button type="button" onClick={getDiseaseInfo}>Let's find</button>
            </form>

            <div className="resultContainer">
                <img className="plantImage" src={imageUrl} alt="" />
                <h1>{title}</h1>
                <hr style={{marginTop: "30px"}} />
                {description ? <h3 style={{ color: "white" }}>Description of the disease:</h3> : <></>}
                <p>{description}</p>
                <hr style={{marginTop: "30px"}}/>
                {prevent ? <h3 style={{ color: "white" }}>How to prevent the disease?</h3> : <></>}
                <p>{prevent}</p>
            </div>
        </div>
    )
}
