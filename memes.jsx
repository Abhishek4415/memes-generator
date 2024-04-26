// import { Button, TextField} from "@mui/material";
// import "./memes.css";
// import { useEffect, useState } from "react";
// import { jsPDF } from "jspdf";

// export default function MemesGenerator(){
//     let m1="https://i.imgflip.com/wxica.jpg";
//     let [memes,setmemes]=useState(m1);
//     let [text,settext]=useState([]);
//     let [Topinputvalue,setTopinputvalue]=useState('');
//     let [Buttoninputvalue,setButtoninputvalue]=useState('');


//     const URL="https://api.imgflip.com/get_memes";

    
//         let getMemes=async ()=>{
//             let response=await fetch(URL);
//             let jsonresponse=await response.json();
//             let index=Math.floor(Math.random()* jsonresponse.data.memes.length);
//             const selectmeme=jsonresponse.data.memes[index];
//             setmemes(selectmeme);
//             console.log(selectmeme);
//         };

        
//         // const onButtonClick = () => {
//         //     if (memes && memes.url) {
//         //         const link = document.createElement('a');
//         //         link.href = memes.url;
//         //         link.download = "meme.jpg"; // You can customize the file name here
//         //         link.style.display = "none"; // Hide the link
//         //         document.body.appendChild(link); // Append the link to the DOM
//         //         link.click(); // Simulate a click on the link
//         //         document.body.removeChild(link); // Remove the link from the DOM
//         //     } else {
//         //         console.error("No meme URL available for download");
//         //     }
//         // };

//         /*==========================
//         FETCH METHOD
//         ============================== */
        
//         const onButtonClick = async () => {
//             if (memes && memes.url) {
//                 try {
//                     const response = await fetch(memes.url);
//                     const blob = await response.blob();
//                     const url = window.URL.createObjectURL(blob);
        
//                     const link = document.createElement('a');
//                     link.href = url;
//                     link.download = "meme.jpg"; // You can customize the file name here
//                     link.style.display = "none"; // Hide the link
//                     document.body.appendChild(link); // Append the link to the DOM
//                     link.click(); // Simulate a click on the link
//                     document.body.removeChild(link); // Remove the link from the DOM
        
//                     // Revoke the object URL to free up resources
//                     window.URL.revokeObjectURL(url);
//                 } catch (error) {
//                     console.error("Error downloading image:", error);
//                 }
//             } else {
//                 console.error("No meme URL available for download");
//             }
//         };
        
        
        


         
            
            

//         let addtext=()=>{
//             if(Topinputvalue.trim() !== '' && Buttoninputvalue.trim() !== ''){
//                 settext([{toptext:Topinputvalue , buttontext:Buttoninputvalue}])
//             }

//             console.log(memes.url);

//             setTopinputvalue('');
//             setButtoninputvalue('');

//         }

//         //get the first memes
//         useEffect(()=>{
//             async function getfirstmemes(){
//                 let response=await fetch(URL);
//                 let jsonresponse=await response.json();
//                 let index=Math.floor(Math.random()* jsonresponse.data.memes.length);
//                 const selectmeme=jsonresponse.data.memes[index];
//                 setmemes(selectmeme);

//             }
//             getfirstmemes();

//         },[]);

     



//     return (
//         <>
//         <h2></h2>
//         <div className="top">
//         <TextField  value={Topinputvalue} onChange={(e)=>setTopinputvalue(e.target.value)} style={{width:"550px",marginRight:"10px"} } 
//         placeholder="Text for top"
//         />
//         <TextField value={Buttoninputvalue} onChange={(e)=>setButtoninputvalue(e.target.value)} style={{width:"550px"}} 
//         placeholder="Text for button"
//         />
//         <button className="button"  onClick={getMemes} >G</button>
//         <button className="button2"  onClick={addtext} >Add</button>
//         </div>
//         <div className="card">
//             <img src={memes && memes.url} alt="memes" />
//             <h2>{memes.name}</h2>
//         </div>
//         <>{text.map(t=>(
//             <>

//               <h2 className="toptext ">{t.toptext.toUpperCase()}</h2>
//               <h2 className="buttontext">{t.buttontext.toUpperCase()}</h2>

//             </>

          
        
//         ) )}





        
          
//         </>
//         <Button type="button" onClick={onButtonClick}>
//                 Download
//         </Button>

    
//         </>




//     );
// }

import { Button, TextField } from "@mui/material";
import "./memes.css";
import { useEffect, useState, useRef } from "react";
import { jsPDF } from "jspdf";

export default function MemesGenerator() {
    let m1 = "https://i.imgflip.com/wxica.jpg";
    let [memes, setmemes] = useState(m1);
    let [text, settext] = useState([]);
    let [Topinputvalue, setTopinputvalue] = useState('');
    let [Buttoninputvalue, setButtoninputvalue] = useState('');
    const canvasRef = useRef(null);

    const URL = "https://api.imgflip.com/get_memes";

    let getMemes = async () => {
        let response = await fetch(URL);
        let jsonresponse = await response.json();
        let index = Math.floor(Math.random() * jsonresponse.data.memes.length);
        const selectmeme = jsonresponse.data.memes[index];
        setmemes(selectmeme);
        console.log(selectmeme);
    };

    const addtext = () => {
        if (Topinputvalue.trim() !== '' && Buttoninputvalue.trim() !== '') {
            settext([{ toptext: Topinputvalue, buttontext: Buttoninputvalue }]);
        }

        console.log(memes.url);

        setTopinputvalue('');
        setButtoninputvalue('');
    };

    useEffect(() => {
        async function getfirstmemes() {
            let response = await fetch(URL);
            let jsonresponse = await response.json();
            let index = Math.floor(Math.random() * jsonresponse.data.memes.length);
            const selectmeme = jsonresponse.data.memes[index];
            setmemes(selectmeme);
        }
        getfirstmemes();
    }, []);

    const mergeTextWithImage = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Draw image onto canvas
        const image = new Image();
        image.crossOrigin = "anonymous"; // Enable cross-origin resource sharing for images
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);

            // Add text to canvas
            text.forEach((t) => {
                ctx.fillStyle = 'white';
                ctx.font = 'bold 36px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(t.toptext.toUpperCase(), canvas.width / 2, 50);
                ctx.fillText(t.buttontext.toUpperCase(), canvas.width / 2, canvas.height - 20);
            });
        };
        image.src = memes.url;
    };

    const onButtonClick = () => {
        mergeTextWithImage();
        setTimeout(() => {
            const canvas = canvasRef.current;
            const link = document.createElement('a');
            link.href = canvas.toDataURL(); // Convert canvas content to data URL
            link.download = "meme_with_text.jpg"; // You can customize the file name here
            link.click();
        }, 500); // Delay to ensure canvas content is ready
    };

    return (
        <>
            <h2></h2>
            <div className="top">
                <TextField
                    value={Topinputvalue}
                    onChange={(e) => setTopinputvalue(e.target.value)}
                    style={{ width: "550px", marginRight: "10px" }}
                    placeholder="Text for top"
                />
                <TextField
                    value={Buttoninputvalue}
                    onChange={(e) => setButtoninputvalue(e.target.value)}
                    style={{ width: "550px" }}
                    placeholder="Text for button"
                />
                <button className="button" onClick={getMemes}>G</button>
                <button className="button2" onClick={addtext}>Add</button>
            </div>
            <div className="card">
                <img src={memes && memes.url} alt="memes" />
                <h2>{memes.name}</h2>
            </div>
            {text.map((t, index) => (
                <div key={index}>
                    <h2 className="toptext ">{t.toptext.toUpperCase()}</h2>
                    <h2 className="buttontext">{t.buttontext.toUpperCase()}</h2>
                </div>
            ))}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <Button type="button" onClick={onButtonClick}>Download</Button>
        </>
    );
}

