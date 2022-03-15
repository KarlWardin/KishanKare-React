import "./search.css"
import { useState } from "react"
import { getDownloadURL, ref as sRef, getStorage, uploadBytesResumable } from "firebase/storage";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import upload_logo from "../../images/upload_logo.png"


export default function Search() {

    const [image, setImage] = useState(null);
    const [ type, setType ] = useState("");
    const { user } = useContext(AuthContext);

    const options = [
        { id: "rice", api: "/rice", pic: "rice.jpg" },
        { id: "Tomato", api: "/tomato", pic: "tomato.jpg" },
        { id: "rice", api: "/rice", pic: "rice.jpg" }
    ];

    const filePathHandler = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            console.log(image);
        }
    }

    // UPLOADING IMAGE TO FIREBASE
    const handleImageUpload = () => {
        if (image == null) return;

        const storage = getStorage();
        const storageRef = sRef(storage, `images/${image.name}`);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
            (snapshot) => { },                 //uploading
            (err) => { console.log(err); },    //error
            () => {                            //successful
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    handlePathUpload(downloadURL);
                });
            }
        );
    }

    // UPLOADING FILE PATH TO REALTIME FIRESTORE
    const handlePathUpload = (path) => {
        const db = getDatabase();
        set(dbRef(db, `test_uploads/${user.uid}`), {
            time: new Date(),
            url: path
        });
    }


    return (
        <div className="container">

            <form className="searchContainer">
                <label htmlFor="input_file">
                    <img id="upload_img" src={upload_logo} alt="upload the file here"></img>
                </label>
                <input
                    id="input_file"
                    type="file"
                    accept="image/*"
                    capture="camera"
                    onChange={filePathHandler}>
                </input>
                {image ? 
                     <p style={{color:"green"}}>{image.name}</p> 
                     : <p style={{color:"red"}}>**please Select an Image</p>
                }

                <select className="selectInput" onChange={e=>setType(e.target.value)}>
                    <option value={"rice"}>rice</option>
                    <option value={"tomato"}>tomato</option>
                    <option value={"wheat"}>wheat</option>
                </select>

                <button onClick={handleImageUpload}>Let's find</button>
            </form>

            <div className="resultContainer">
                result to be shown here
            </div>
        </div>
    )
}
