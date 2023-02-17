import React, { useState, useEffect } from 'react';
import { Box, Card, styled } from '@mui/material';
import { CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import BaseLayout from 'src/layouts/BaseLayout';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useRouter } from 'next/router'
import MyButton from "../MyButton"






const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userWalletId, setUserWalletId] = useState("")
  const [connectedToMetamask, setConnectedToMetamask] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)
  const [isLoadingUpdateWallet, setIsLoadingUpdateWallet] = useState(false)
  const router = useRouter()


  useEffect(() => {

   console.log(router.query) 
   setEmail(router.query.id)
    
  
 
  }, [router.isReady])
  




  const handleLogin = () => {
    setIsLoading(true);

    try {
      axios
        .post('/api/authentication/login', {
          wallAddress:userWalletId,
          upperline:email
        })
        .then((acc) => {
          sessionStorage.setItem("makeApirequest","true")
          // setConnectedToMetamask(false)
          console.log(acc.data);
          setIsLoading(false)
          sessionStorage.setItem("jwt", JSON.stringify(acc.data))

          if (acc.data.goToAddWallet) {
            setAccountCreated(true)
            
          }else{
            
          sessionStorage.setItem("jwt", JSON.stringify(acc.data))
          router.push("/dash")

          }


        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };




  const handleUpdateWallet = () => {
    setIsLoadingUpdateWallet(true);

    try {
      axios
        .post('/api/authentication/updateUpperLine', {
          wallAddress:userWalletId,
          upperline:email?email.toLowerCase():email
        })
        .then((acc) => {
          // setConnectedToMetamask(false)
          console.log(acc.data);
          setIsLoadingUpdateWallet(false)
          setAccountCreated(true)

          sessionStorage.setItem("jwt", JSON.stringify(acc.data))
          router.push("/dash")



        })
        .catch((err) => {
          console.log(err);
          setIsLoadingUpdateWallet(false);


          alert(err.response.data.message)




        });
    } catch (error) {
      console.log(error);
    }
  };



  const handleFourceLogin = () => {
    setIsLoading(true);

    try {
      axios
        .post('/api/authentication/login', {
          wallAddress:userWalletId,
          upperline:email
        })
        .then((acc) => {
          console.log(acc.data);
          setIsLoading(false)

          sessionStorage.setItem("jwt", JSON.stringify(acc.data))
          router.push("/dash")
          

        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };



  const connectWallet = () =>{


    if(window.ethereum){
      
      window.ethereum.request({method:'eth_requestAccounts'})
      .then(res=>{
              // Return the address of the wallet
              setConnectedToMetamask(true)
              console.log(res) 
              setUserWalletId(res[0])
      })


    }else{
      alert("install metamask extension!!")
    }



    
  }



  return (
    <Card style={{ backgroundImage: `url("/banner_bg.png")`, width: "100%", backgroundSize: "cover", height: "100%" }}>
      <div style={{ marginRight: 20 }}>
        {/* <div className="row mt-5">
          <div className="col-sm-6" >

          </div>
          <div className="col-sm-6" >
            <div style={{ right: 10 }}>
              <div style={{ textAlign: "right" }}>
                <button onClick={connectWallet} className='btn btn-primary m-2'>CONNECT</button>
                {
                  userWalletId ? 

                  <button  onClick={handleFourceLogin} className='btn btn-primary m-2'>{userWalletId.slice(0,5)+"-"+userWalletId.slice(-5)}</button>
                  :

                  <></>
                }
              </div>
            </div>

          </div>
        </div> */}
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',


        }}
      >




        <Card style={{ borderColor: "red", borderWidth: 2 }}>









          <CardContent style={{ borderColor: "red", borderWidth: 2 ,width:400}}>


            <div style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
              <img style={{ width: 80, height: 50 }} src='http://www.vrblocksyield.com/assets/img/Vrblocks.png' />
            </div>


            {/* <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label="Email"
              type="email"
              fullWidth
            /> */}

            {/* <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{ marginTop: 20 }}
              label="Upperline"
              type="Upperline"
              fullWidth
            /> */}
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              {/* {
            isLoading ? 
            <Button
               
                style={{ padding: 10 }}
                variant="outlined"
                size="small"
              >
                LOADING ...
              </Button>


            :
          
              <Button
                onClick={handleLogin}
                style={{ padding: 10 }}
                variant="outlined"
                size="small"
              >
                REGISTER
              </Button>
         




          } */}

          {
            !connectedToMetamask &&
          // <button onClick={connectWallet} className='btn btn-warning' style={{fontWeight:"bolder"}}>CONNECT METAMASK</button>
          <div style={{cursor:"pointer"}} onClick={connectWallet}>
          <img src='/btnImage.png' style={{width:"220px",height:"50px"}} />
          
          <h6 style={{marginTop:-35,color:"black",fontWeight:"bold"}}>CONNECT METAMASK</h6>
                              </div>
        }


          {
            connectedToMetamask && !accountCreated&&
            <>
              <button className='btn btn-warning' style={{fontWeight:"bolder"}}>{userWalletId.slice(0,15)}...</button> <br/>
            {
              isLoading ? 

              // <button className='btn  mt-2' style={{fontWeight:"bolder",borderColor:"#FFC61D",borderWidth:2,borderStyle:"solid",color:"white"}}>LOADING...</button>
              <div style={{cursor:"pointer",marginTop:10}}>
              <img src='/btnImage.png' style={{width:"90px",height:"50px"}} />
              
              <h6 style={{marginTop:-35,color:"black",fontWeight:"bold"}}>LOADING...</h6>
                                  </div>
              :


            // <button onClick={handleLogin} className='btn  mt-2' style={{fontWeight:"bolder",borderColor:"#FFC61D",borderWidth:2,borderStyle:"solid",color:"white"}}>REGISTER / LOGIN</button>
            <div style={{cursor:"pointer",marginTop:10}} onClick={handleLogin}>
            <img src='/btnImage.png' style={{width:"90px",height:"50px"}} />
            
            <h6 style={{marginTop:-35,color:"black",fontWeight:"bold"}}>REGISTER</h6>
                                </div>
            }
            </>
          }


          {
            accountCreated &&
            <>
            
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{ marginTop: 20 }}
              label="Upline Wallet Address"
              type="Upline Wallet Address"
              fullWidth
              value={email}
            /> <br/>
            {
              isLoadingUpdateWallet ?

              <button className='btn  mt-4' style={{fontWeight:"bolder",borderColor:"#FFC61D",borderWidth:2,borderStyle:"solid",color:"white"}}>LOADING...</button>


              :

              // <button onClick={handleUpdateWallet} className='btn  mt-4' style={{fontWeight:"bolder",borderColor:"#FFC61D",borderWidth:2,borderStyle:"solid",color:"white"}}>SUBMIT</button>

              <div style={{cursor:"pointer"}} onClick={handleUpdateWallet}>
<img src='/btnImage.png' style={{width:"90px",height:"50px"}} />

<h6 style={{marginTop:-35,color:"black",fontWeight:"bold"}}>SUBMIT</h6>
                    </div>

            }


            </>
          }


          



              <div style={{ marginTop: 50 }}>

                

              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </Card>
  );
};

export default Login;
