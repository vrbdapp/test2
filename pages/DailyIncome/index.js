import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import CurrentWallete from '../../../src/components/CurrentWallete';
// import ABI from '../../../src/Web3Resources/ABI';
import Web3 from 'web3';
import { useRouter } from 'next/router';


function DashboardTasks() {
  const [input, setInput] = useState('');
  const [fetchData, setFetchData] = useState(false);
  const [wallete, setWallete] = useState("")
  const [showWall, setShowWall] = useState(false)
  const [walleteAddress, setWalleteAddress] = useState("")
  const [mainLaykaValue, setMainLaykaValue] = useState("")
  const [data, setData] = useState("")


  
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)








  const router = useRouter();



  useEffect(() => {



    getData()
    
  
   
  }, [])


  const getData = (num) =>{
      
    
    
    
    const data = sessionStorage.getItem('jwt');

    const parser = JSON.parse(data);


    console.log(parser)


    try {
      

      axios.post(`/api/MyRecordsData/DailyRoi?page=${num?num:page}`,{
        id:parser.datam._id
      })
      .then((acc)=>{
        console.log(acc.data)
        setData(acc.data)
        setPageCount(acc.data.pageCount)

      })
      .catch((err)=>{
        console.log(err)
      })

    } catch (error) {
      console.log(error)
    }

  }
  







  const handleUpdateWallete = () => {


    const userData = sessionStorage.getItem("jwt")
    const parse = JSON.parse(userData)

    try {
      axios.post("/api/updateWalletes", {
        id: parse._id,
        address: walleteAddress
      })
        .then((acc) => {
          console.log("updated")
          router.reload()
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    }





  }







  if (typeof window !== 'undefined') {
    if (!sessionStorage.getItem('jwt')) {
      router.push('/');
    }
  }

  const handleWithdraw = () => {

  };




  const datas = [

    { "key": "1", "ewg": "weg" },
    { "key": "2", "ewg": "weg" },
    { "key": "3", "ewg": "weg" },
    { "key": "4", "ewg": "weg" },
    { "key": "5", "ewg": "weg" },
    { "key": "6", "ewg": "weg" },
    { "key": "7", "ewg": "weg" },
    { "key": "10", "ewg": "weg" },
    { "key": "11", "ewg": "weg" },
    { "key": "12", "ewg": "weg" },
    { "key": "13", "ewg": "weg" },
    { "key": "14", "ewg": "weg" },
    { "key": "15", "ewg": "weg" }

  ]



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
        <title>Deposit Coins</title>
      </Head>



      <Container maxWidth="lg">

        <h2 style={{ marginTop: 35 }}>Daily Income</h2>


        <div style={{ marginTop: 50 }}>

<table className="table table-striped">
  <thead>
    <tr>
      <th style={{ color: "white" }} scope="col">S.N.</th>
      {/* <th style={{ color: "white" }} scope="col">Steps Walked</th> */}
      <th style={{ color: "white" }} scope="col">ROI Coin</th>
      <th style={{ color: "white" }} scope="col">Percantage</th>
      {/* <th style={{ color: "white" }} scope="col">Package</th> */}
      <th style={{ color: "white" }} scope="col">Date</th>
     

    </tr>
  </thead>
  <tbody>

    {
     data&& data.findMyPackage.map((hit, index) => {
        return <tr key={hit.key}>
          <th style={{ color: "white" }} scope="row">{index + 1}</th>
          {/* <td style={{ color: "white" }}>{hit.StepsWalked}</td> */}
          <td style={{ color: "white" }}>{hit.GiveRoiCoin}</td>
          <td style={{ color: "white" }}>{hit.GiveRoiPercantage}</td>
          {/* <td style={{ color: "white" }}>{hit.PurchasedPackageName}</td> */}
          <td style={{ color: "white" }}>{String(new Date(hit.createdAt))}</td>
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





      </Container>
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
