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
import useSWR from 'swr'


function DashboardTasks() {
  const [input, setInput] = useState('');
  const [fetchData, setFetchData] = useState(false);
  const [wallete, setWallete] = useState("")
  const [showWall, setShowWall] = useState(false)
  const [walleteAddress, setWalleteAddress] = useState("")
  const [mainLaykaValue, setMainLaykaValue] = useState("")
  const [datas, setDatas] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [gotDepositVusd, setGotDepositVusd] = useState("")


  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)




  const router = useRouter();





  const handleClick = () => {
    setIsLoading(true)
    const val = sessionStorage.getItem('jwt');
    const parsedVal = JSON.parse(val);
    // console.log(parsedVal);

    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async (accounts) => {
          const web3 = new Web3(window.ethereum);
          const contract = new web3.eth.Contract(
            ABI,
            '0x155bdd944F2f37725C15C3B99bDae28537b64054'
          ); ////block token
          let amount = web3.utils.toWei(input.toString());
          var met1 = await contract.methods
            .approve('0x9d0490cD055569Ea17ec203b10A63a18010E881a', amount)
            .send({ from: accounts[0] });
          var met2 = await contract.methods
            .transfer('0x9d0490cD055569Ea17ec203b10A63a18010E881a', amount)
            .send({ from: accounts[0] });
          try {


            // console.log(met1)
            // console.log(met2)



            const handleUpdateWallete = () => {


              const userData = sessionStorage.getItem("jwt")
              const parse = JSON.parse(userData)

              try {
                axios.post("/api/deposit/depositYourFund", {
                  id: parse.datam._id,
                  amount: input,
                  hash: met2.blockHash
                })
                  .then((acc) => {
                    setIsLoading(false)
                    // console.log("updated")
                    router.reload()
                  })
                  .catch((err) => {
                    console.log(err)
                    setIsLoading(false)

                  })
              } catch (error) {
                console.log(error)
                setIsLoading(false)

              }





            }


            handleUpdateWallete()






          } catch (error) {
            console.log(error);
            setIsLoading(false)

          }
        })
        .catch((errs) => {
          setIsLoading(false)
        })
    } else {
      alert('install metamask extension!!');
      setIsLoading(false)
    }
  };


  if (typeof window !== 'undefined') {
    if (!sessionStorage.getItem('jwt')) {
      router.push('/');
    }
  }






  useEffect(() => {

    const datas = sessionStorage.getItem("jwt")
    const parseIt = JSON.parse(datas)


    if (window.ethereum) {

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(res => {
          // Return the address of the wallet
          // console.log(res[0])
          // console.log(parseIt.WalletAddress)

          // if (parseIt.WalletAddress !== res[0]) {
          //   sessionStorage.clear()
          //   router.push("/")
          // }


        })
    } else {
      alert("install metamask extension!!")
    }


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




   


    getData()





  }, [])


  const getData = (num) =>{


    

    const datas = sessionStorage.getItem("jwt")
    const parseData = JSON.parse(datas)

    axios.post(`/api/MyRecords/findMyDeposits?page=${num?num:page}`, {
      id: parseData.datam._id
    })
      .then((acc) => {
        console.log(acc.data)
        setDatas(acc.data)
        setPageCount(acc.data.pageCount)

      })
      .catch((err) => {
        console.log(err)
      })





  }





  const handleDeny = () =>{

    toast.error('Minimum You Need To Deposit 100 VUSD', {
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







  
const handlePrevious = () =>{

  // if (page === 1) {
  //   return 
  // }else{
    setPage(page-1)
    getData(page-1)
  // }
  
  }
  
  
  
  const handleNext = () =>{
  
  
  
    // // if (6 === 5) {
    // if (page === pageCount) {
    //   return
    // }else{
      setPage(page+1)
      getData(page+1)
    // }
  
  
  
    
  
  
  }
  
  








  return (
    <>
      <Head>
        <title>Deposit VUSD</title>
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

            <img style={{ width: 200, height: 200 }} src='https://icon-library.com/images/loading-gif-icon/loading-gif-icon-14.jpg' />

            <div>
              <h4 style={{ fontWeight: 'bold' }}>Transaction Is In Process</h4>
              <p>Please wait until this transaction completes.</p>
            </div>



          </div>


          :

          <>
          
          
          




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

            <h2 style={{ marginTop: 35,textAlign:"center",marginBottom:20 }}>Deposit VUSD</h2>

            <TextField
              onChange={(e) => {
                setInput(e.target.value);
              }}
              label="Enter Coins"
              type="Enter Coins"
              fullWidth
            />


            <div>


   <div className="container mt-3">
  <div className="row">
    <div className="col" >
      <div style={{textAlign:"right"}}>
     <img   src='../mainlogo.png' style={{width:80,height:50}} />
      </div>
    </div>
    <div className="col" >
     <div>
      <h5>VUSD Balance</h5>
      <h5 style={{marginLeft:25,color:"#FFAB11"}}>{gotDepositVusd.slice(0,-18)}</h5>
     </div>
    </div>
  </div>
</div>












              <h6 className='text-center text-white mt-4'>Minimum Deposit 100 VUSD</h6>

              <div style={{ textAlign: 'center', marginTop: 30 }}>

                {
                  input && input >= 100 ?

                  <>

<div style={{cursor:"pointer"}} onClick={handleClick}>
<img src='/btnImage.png' style={{width:"90px",height:"50px"}} />

<h6 style={{marginTop:-35,color:"black",fontWeight:"bold"}}>Deposit</h6>
                    </div>




                      </>
                    :
                    <>

                    <div style={{cursor:"pointer"}} onClick={handleDeny}>
<img src='/btnImage.png' style={{width:"90px",height:"50px"}} />

<h6 style={{marginTop:-35,color:"black",fontWeight:"bold"}}>Deposit</h6>
                    </div>
                    
                    

                    {/* <Button
                      onClick={() => alert("Please Enter Value Grater Than 100")}
                      style={{ padding: 10 }}
                      variant="outlined"
                      size="small"
                      src='./btn-Image.png'
                    >
                      Deposit
                    </Button> */}

                    </>

                }


              </div>





            </div>









       

















            {/* <CurrentWallete fetchData={fetchData} /> */}
          </Container>











</div>




{
  isLoading ? 


  <>
  
  
  </>
  



  :


<div style={{ marginTop: 50,marginLeft:20,marginRight:20 }}>



<h4 style={{ fontWeight: "bold" }}>Desposit History</h4>




<table className="table">
  <thead>
    <tr>
      <th style={{ color: "white" }} scope="col">S.N.</th>
      <th style={{ color: "white" }} scope="col">Deposit Amount</th>
      <th style={{ color: "white" }} scope="col">Date</th>
      <th style={{ color: "white" }} scope="col">HASH</th>
    </tr>
  </thead>
  <tbody>
    {
      datas && datas.findData.map((hit, index) => {

        return <tr key={hit._id}>
          <th style={{ color: "white" }} scope="row">{index + 1}</th>
          <td style={{ color: "white" }}>{hit.DepositAmount}</td>
          <td style={{ color: "white" }}>{String(new Date(hit.createdAt))}</td>
          <td style={{ color: "white" }}><a target="__blank" href={`https://vrblocksscan.io/block/${hit.TransactionHash}`}><button className='btn btn-primary'>HASH</button></a></td>
        </tr>
      })
    }


  </tbody>
</table>



<div className='container' style={{marginTop:50}}>

  <div className='row'>

    <div className='col-6'>
      <button disabled={page === 1} onClick={handlePrevious} className='btn btn-primary'>PREVIEW</button>
    </div>
    <div className='col-6'>
      <div style={{textAlign:"right"}} className='text-right'>
      <button onClick={handleNext} disabled={page === pageCount} className='btn btn-primary'>NEXT</button>
      </div>
    </div>







  </div>





  
</div>



















</div>










}

</>













      }
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
