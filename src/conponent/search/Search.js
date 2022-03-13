import "./search.css"
import { useState } from "react"
import { getDownloadURL, ref as sRef, getStorage, uploadBytesResumable } from "firebase/storage";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";


export default function Search() {

    const [image, setImage] = useState(null);
    const { user } = useContext(AuthContext);

    const options = [
        { id: "rice", api: "/rice", pic: "rice.jpg" },
        { id: "Tomato", api: "/tomato", pic: "tomato.jpg" },
        { id: "rice", api: "/rice", pic: "rice.jpg" }
    ];

    const optionItems = () => {
        let list = "";
        options.map(e => list += `<div id=${e.id} style="background-image:${e.pic};" className="plantOptions">${e.id}</div>`);
        console.log(list);
        return list;
    };

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
        set(dbRef(db, `test_uploads/${user.uid}` ), {
            time: new Date(),
            url: path
        });
    }


    return (
        <div className="searchContainer">
            <div className="plantOption">
                <label htmlFor="input-btn">
                    <img style={{ "height": "10%", "width": "10%" }} src="https://image.shutterstock.com/image-photo/wooden-bowl-rice-on-ears-260nw-1714464100.jpg"></img>
                </label>
                <input
                    className="input-bt"
                    id="input-btn"
                    type="file"
                    accept="image/*"
                    capture="camera"
                    onChange={filePathHandler}></input>
                <button onClick={handleImageUpload}>upload</button>
            </div>

        </div>
    )
}
