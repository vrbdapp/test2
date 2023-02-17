import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CurrentWallete from '../../../src/components/CurrentWallete';
import ABI from '../../../src/Web3Resources/ABI';
import Web3 from 'web3';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function DashboardTasks() {
  const [input, setInput] = useState(0);
  const [fetchData, setFetchData] = useState(false);
  const [wallete, setWallete] = useState("")
  const [showWall, setShowWall] = useState(false)
  const [walleteAddress, setWalleteAddress] = useState("")
  const [mainLaykaValue, setMainLaykaValue] = useState("")
  const [datas, setDatas] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [gotDepositVusd, setGotDepositVusd] = useState("")


  const [avalibleBalance, setAvalibleBalance] = useState("")


  const [withdrawableTokens, setWithdrawableTokens] = useState("")

  const [tillWithdrawed, setTillWithdrawed] = useState("")



  const router = useRouter();

  useEffect(() => {

    const datas = sessionStorage.getItem("jwt")
    const parseIt = JSON.parse(datas)


    // if(window.ethereum){

    //   window.ethereum.request({method:'eth_requestAccounts'})
    //   .then(res=>{
    //           // Return the address of the wallet
    //         console.log(res[0])
    //         console.log(parseIt.WalletAddress)

    //         if (parseIt.WalletAddress !== res[0]) {
    //           sessionStorage.clear()
    //           router.push("/")
    //         }


    //   })
    // }else{
    //   alert("install metamask extension!!")
    // }


  }, [])


  const handleWithdraw = () => {
    // setIsLoading(true)
    console.log('hello');
    const val = sessionStorage.getItem('jwt');
    const parsedVal = JSON.parse(val);


    console.log("below is my address ====> ")
    console.log(parsedVal.datam.WalletAddress)


    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async (accounts) => {
          const privateKey =
            "7f441cfa292407fee212dfcc719538a5466c7f9f86bf105515706babb2989230";
          const web3 = new Web3(window.ethereum);
          const tokenAddress = "0x7bb90728d8c1EbaC3e9066D3204fB49ab7f22D18";
          const fromAddress = "0x65CEE19959DAb959126efbD965005FC4F77513Cb";
          const contract = new web3.eth.Contract(ABI, tokenAddress, {
            from: fromAddress,
          })
          var sums = Number(withdrawableTokens)*10
          let amount = web3.utils.toHex(web3.utils.toWei(String(sums*90/100)));
          let data = contract.methods
            .transfer(parsedVal.datam.WalletAddress, amount)
            .encodeABI();

          function sendErcToken() {
            let txObj = {
              gas: web3.utils.toHex(100000),
              to: tokenAddress,
              value: "0x00",
              data: data,
              from: fromAddress,
            };
            web3.eth.accounts.signTransaction(
              txObj,
              privateKey,
              (err, signedTx) => {
                if (err) {
                  return callback(err);
                } else {
                  console.log(signedTx);
                  return web3.eth.sendSignedTransaction(
                    signedTx.rawTransaction,
                    (err, res) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(res);

                        const vals = sessionStorage.getItem("jwt")
                        const parseIt = JSON.parse(vals)

                        toast.loading('Withdrawal Done. Please Wait', {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          });



                        try {
                          axios.post("/api/withdraw/withdraw", {
                            id: parseIt.datam._id,
                            amount: Number(withdrawableTokens),
                            hash: res
                          })
                            .then((acc) => {
                              console.log("updated")
                              router.reload()
                            })
                            .catch((err) => {
                              console.log(err)
                              
                          toast.error('Something Went Wrong.', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });

                            })
                        } catch (error) {
                          console.log(error)


                          toast.error('Something Went Wrong.', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });




                        }

















                      }
                    }
                  );
                }
              }
            );
          }

          sendErcToken();

        });
    } else {
      alert("install metamask extension!!");



      
      toast.error('install metamask extension!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });




    }



  };


  if (typeof window !== 'undefined') {
    if (!sessionStorage.getItem('jwt')) {
      router.push('/');
    }
  }


  useEffect(() => {

    const datas = sessionStorage.getItem("jwt")
    const parseData = JSON.parse(datas)

    axios.post("/api/MyRecords/findMyWithdraw", {
      id: parseData.datam._id
    })
      .then((acc) => {
        console.log(acc.data)
        setDatas(acc.data)

      })
      .catch((err) => {
        console.log(err)
      })



  }, [])


  useEffect(() => {

    const datas = sessionStorage.getItem("jwt")
    const parseData = JSON.parse(datas)

    axios.post("/api/dashboardData/dashData", {
      id: parseData.datam._id
    })
      .then((acc) => {
        console.log( "this is my => "+ acc.data.Total_Earned_Income)
        setAvalibleBalance(acc.data.Total_Earned_Income)

      })
      .catch((err) => {
        console.log(err)
      })
  
  }, [])
  

  useEffect(() => {

    const getUserS = sessionStorage.getItem("jwt")
    const parseItNow = JSON.parse(getUserS)

    console.log(parseItNow.datam.WalletAddress)


    try {
      
      axios.get(`https://vrblocksscan.io/api?module=account&action=tokenbalance&contractaddress=0x155bdd944F2f37725C15C3B99bDae28537b64054&address=${parseItNow.datam.WalletAddress}`)
      .then((acc)=>{
        console.log(acc.data)
        setGotDepositVusd(acc.data.result.lenght >2 ? acc.data.result.slice(0,-18):acc.data.result)
      })
      .catch((err)=>{
        console.log(err)
      })


    } catch (error) {
      console.log(error)
    }
    
  
    


  }, [])



  useEffect(() => {

    const findDats = sessionStorage.getItem("jwt")
    const parseIt = JSON.parse(findDats)
    

    console.log("this is parsed data => "+parseIt.datam._id)


    try {
      
      axios.post("/api/WalletWithdrawalCalculation/WalletCalculation",{
        id:parseIt.datam._id
      })
      .then((acc)=>{
        console.log(acc.data)
        setWithdrawableTokens(acc.data.firstData)
        setTillWithdrawed(acc.data.totalwithdraw)
      })
      .catch((err)=>{
        console.log(err)
      })



    } catch (error) {
      console.log(error)
    }
    
  
   
  }, [])
  

  return (
    <>
      <Head>
        <title>Withdraw VR PAY</title>
      </Head>


      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />

      {
        isLoading ?

          <div style={{ textAlign: 'center', marginTop: 20 }}>

            <img style={{ width: 200, height: 200 }} src='https://mir-s3-cdn-cf.behance.net/project_modules/max_632/04de2e31234507.564a1d23645bf.gif' />

            <div>
              <h4 style={{ fontWeight: 'bold' }}>Transaction Is In Process</h4>
              <p>Please wait until this transaction completes.</p>
            </div>



          </div>


          :


          <div
style={{
  borderColor: '#9c27b0',
  backgroundColor: '#020e22f2',
  borderWidth: 2,
  borderStyle: 'solid',
  borderRadius: 20,
  paddingTop:25,
  paddingBottom:25,
  marginLeft:20,
  marginRight:20,
  marginTop:20
}}
>






          <Container maxWidth="lg">

            <h2 style={{ marginTop: 35 ,textAlign:"center",marginBottom:10}}>Withdraw VR PAY</h2>
            {/* <h5 style={{ marginTop: 35 ,textAlign:"right",marginBottom:10}}>Avalible Balance : {avalibleBalance}</h5> */}

            {/* <TextField
              onChange={(e) => {
                setInput(e.target.value);
              }}
              label="Enter VUSD"
              type="Enter VUSD"
              fullWidth
            /> */}



            <h4 className='text-center'>{Number(withdrawableTokens).toFixed(2)} VUSD</h4>

            <div style={{ textAlign: 'center', marginTop: 30 }}>
              {
                wallete == "null" ?
                  <>
                    <Button
                      onClick={() => setShowWall(true)}
                      style={{ padding: 10 }}
                      variant="outlined"
                      size="small"
                    >
                      Add Wallete Address
                    </Button>

                  </>



                  :

                  <>
                  
                  
{/* 
                  <Button
                    onClick={handleWithdraw}
                    style={{ padding: 10 }}
                    variant="outlined"
                    size="small"
                  >
                    Withdraw
                  </Button> */}



                  <p className='container'>Minimum withdraw 25 VUSD. Max withdraw = 3X DEPOSIT AMOUNT
Withdrawal fee : 10%</p>


                    
                  <>
                  {
                     withdrawableTokens > 0? 

<div style={{cursor:"pointer"}}  onClick={handleWithdraw}>
<img src='/btnImage.png' style={{width:"90px",height:"50px"}} />

<h6 style={{marginTop:-35,color:"black",fontWeight:"bold"}}>Withdraw</h6>
                    </div>

                    :
<div style={{cursor:"pointer"}}  onClick={()=>alert("0 Cannot Be Withdraw")}>
<img src='/btnImage.png' style={{width:"90px",height:"50px"}} />

<h6 style={{marginTop:-35,color:"black",fontWeight:"bold"}}>Withdraw</h6>
                    </div>


                  }





                    <div className='row mt-5'>


                    <div className="col">
                  <div
                    style={{
                      backgroundImage: `url("/intro-bg.png.png")`,
                      backgroundColor: '#020e22f2',
                      padding: 20,
                      margin: 10,
                      borderColor: '#ffffff66f',
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderRadius: 10,
                      textAlign: 'center'
                    }}
                  >
                    <h6 style={{ fontWeight: 'bold', fontSize: 20 }}>
                    
                    {(Number(withdrawableTokens)*10).toFixed(2)} VRPAY
                    </h6>
                  </div>
                </div>
                      <div className='col'>

{/* <h5 className='text-center mt-5' style={{fontWeight:"bolder"}}>{input} X 10 = {input*10}</h5> */}
<div className="col">
                  <div
                    style={{
                      backgroundImage: `url("/intro-bg.png.png")`,
                      backgroundColor: '#020e22f2',
                      padding: 20,
                      margin: 10,
                      borderColor: '#ffffff66f',
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderRadius: 10,
                      textAlign: 'center'
                    }}
                  >
                    <h6 style={{ fontWeight: 'bold', fontSize: 20 }}>
                    
                    Total Withdrawal : {tillWithdrawed}
                    </h6>
                  </div>
                </div>
                      </div>




                    </div>




                      </>




                    </>
              }

            </div>













            {/* <CurrentWallete fetchData={fetchData} /> */}











          



















          </Container>


</div>


      }



      {
        isLoading ? 


      <></>


        :


        <div style={{marginLeft:20,marginRight:20,marginTop:5}}>


<div style={{ marginTop: 50 }}>



<h4 style={{ fontWeight: "bold" }}>Withdraw History</h4>




<table className="table">
  <thead>
    <tr>
      <th style={{ color: "white" }} scope="col">S.N.</th>
      <th style={{ color: "white" }} scope="col">Withdraw VUSD</th>
      <th style={{ color: "white" }} scope="col">Withdraw VRPAY</th>
      <th style={{ color: "white" }} scope="col">Date</th>
      <th style={{ color: "white" }} scope="col">HASH</th>
    </tr>
  </thead>
  <tbody>
    {datas && datas.map((hit, index) => {
      return <tr key={hit._id}>
        <th style={{ color: "white" }} scope="row">{index + 1}</th>
        <td style={{ color: "white" }}>{hit.WithdrawAmount}</td>
        <td style={{ color: "white" }}>{hit.WithdrawAmount*10}</td>
        <td style={{ color: "white" }}>{String(new Date(hit.createdAt))}</td>
        <td style={{ color: "white" }}><a target="__blank" href={`https://vrblocksscan.io/tx/${hit.TransactionHash}`}><button className='btn btn-primary'>HASH</button></a></td>
      </tr>
    })
    }


  </tbody>
</table>


















</div>
        
        
        
        </div>
      }








    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
