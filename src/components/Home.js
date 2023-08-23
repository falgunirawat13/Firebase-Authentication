import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { auth  } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { signInWithPopup , GoogleAuthProvider , FacebookAuthProvider , GithubAuthProvider} from 'firebase/auth';
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  GitHub as GithubIcon,
} from '@mui/icons-material'; 
import { useNavigate   } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
    const [googleLoggedIn, setGoogleLoggedIn] = useState(false);
    const handleGoogleLogin =  async () =>{
    const provider = new GoogleAuthProvider()  
    const result = await signInWithPopup(auth , provider)
    const user = result.user;
    
    
    console.log(user)
    console.log("Logged in successfully")
    setGoogleLoggedIn(true);
    
    }
    const [facebookLoggedIn, setFacebookLoggedIn] = useState(false);
    const handleFacebookLogin = async () => {
      const facebookProvider = new FacebookAuthProvider();
      
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
        console.log(user);
        console.log("Logged in with Facebook successfully");
        setFacebookLoggedIn(true);
    }    

    const [GithubLoggedIn, setGithubLoggedIn] = useState(false);
    const handleGithubLogin = async () => {
        const githubProvider = new GithubAuthProvider();
        
          const result = await signInWithPopup(auth, githubProvider);
          const user = result.user;
          console.log(user);
          console.log("Logged in with Github successfully");
          setGithubLoggedIn(true);
    }
  

  const [phone, setPhone] = useState('+91');
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState('');

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      }
    }, auth);
  }

  const handleSend = (event) => {
    event.preventDefault();
    setHasFilled(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  }
  
  const verifyOtp = (event) => {
    let otp = event.target.value;
    setOtp(otp);

    if (otp.length === 6) {
      // verify otp
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        let user = result.user;
        console.log(user);
        alert('User signed in successfully');
        navigate('/signin');
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        alert('User couldn\'t sign in (bad verification code?)');
      });
    }
  }  
  if (facebookLoggedIn){
    alert('logged in with Facebook')
    console.log("okay");
    navigate('/signin');
  return null;
  }

    if (GithubLoggedIn){
      alert('logged in with Github')
      console.log("okay");
      navigate('/signin');
    return null;
    }
     
    if (googleLoggedIn) {
      alert('logged in with Google')
      console.log("okay");
      navigate('/signin');
    return null;
    // Redirect to signin page if Google login is successful
    // return <Link to="/signin" />;
  } else 
  {
  if(!hasFilled){
    return (
      
      <div className='app__container'>
        <Card sx={{ width: '290px'}}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <Typography sx={{ padding: '20px'}} variant='h5' component='div'>Enter your phone number</Typography>
            <form onSubmit={handleSend}>
              <TextField sx={{ width: '240px'}} variant='outlined' autoComplete='off' label='Phone Number' value={phone} onChange={(event) => setPhone(event.target.value)} />
              <Button type='submit' variant='contained' sx={{ width: '240px', marginTop: '20px'}}>Send Code</Button>
            </form>
          </CardContent>
        </Card>        
        <div id="recaptcha"></div>

        <div> <br></br> 
        <p variant='contained' sx={{color:'white'}}>OR</p>
        
          </div> 
        
          <div>
          
        <Button
          onClick={handleGoogleLogin}
          variant='contained'
          sx={{
            backgroundColor: '#4285F4',
            color: 'white',
            marginTop: '20px',
            width: '290px',
          }}
          startIcon={<GoogleIcon />} 
        >
          Login with Google
        </Button>
        
      </div>
      <div>
        <Button
          onClick={handleGithubLogin}
          variant='contained'
          sx={{
            backgroundColor: '#333333',
            color: 'white',
            marginTop: '10px',
            width:  '290px',
          }}
          startIcon={<GithubIcon />} 
        >
          Login with Github
        </Button>
      </div>
      <div>
        <Button
          onClick={handleFacebookLogin}
          variant='contained'
          sx={{
            backgroundColor: '#1877F2',
            color: 'white',
            marginTop: '10px',
            width: '290px',
          }}
          startIcon={<FacebookIcon />} 
        >
          Login with Facebook
        </Button>
      </div>
      
      </div>
    ) 
  } else {
    return (
      <div className='app__container'>
        <Card sx={{ width: '300px'}}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <Typography sx={{ padding: '20px'}} variant='h5' component='div'>Enter the OTP</Typography>
              <TextField sx={{ width: '240px'}} variant='outlined' label='OTP ' value={otp} onChange={verifyOtp} />
          </CardContent>
        </Card>
        <div id="recaptcha"></div>
      </div>
    )
  }
}
}

export default Home;