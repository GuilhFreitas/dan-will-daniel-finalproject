import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import "./style/style.css";

export default function Footer(){
    return (
        <div className="footer">
           <ul>
             <li><a href="https://github.com/GuilhFreitas/dan-will-daniel-finalproject"><GitHubIcon sx={{ fontSize: 30 }}/></a></li>
             <li><a href="mailto:email@quizTime.com"><EmailIcon sx={{ fontSize: 30 }}/></a></li>
           </ul>
           <p>Quiz <span className="script-font">Time &copy; 2023</span> </p>
        </div>
    )
}   