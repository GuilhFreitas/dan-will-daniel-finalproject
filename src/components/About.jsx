import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
export default function About(props){
    
    return(

        <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h2" component="div" align= 'center'>
            About
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" align= 'center' gutterBottom>

          Welcome to our About page!
          <br /><br />  
          </Typography>
          <Typography variant="body1">
           We are excited to tell you about our latest project - a Quiz React app.

          Our Quiz React app is a fun and interactive way to test your knowledge on a variety of subjects. Whether you're looking to challenge yourself or just have some fun, our app has something for everyone.
          
          With a sleek and user-friendly design, our app allows you to choose from a range of quizzes covering topics such as history, science, pop culture, and more.  You can even create your own quiz and share it with friends!<br /><br />
         
          One of the best things about our Quiz React app is its responsiveness. It works flawlessly on desktop, tablet, and mobile devices, so you can take your quizzes on the go.
          
          But what sets our app apart from other quiz apps is its use of React technology. React allows us to create a fast and dynamic user interface, which means you can experience seamless navigation through quizzes and get instant feedback on your answers.   
          <br /><br />
          So why not give our Quiz React app a try? Test your knowledge and see how you stack up against others. We hope you enjoy using our app as much as we enjoyed creating it.
            <br />
          </Typography>
          </CardContent>
      </Card>
        
    );
  }
