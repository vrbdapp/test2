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
  const [datas, setDatas] = useState("")
  const router = useRouter();
  const [datass, setDatass] = useState('');












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





  useEffect(() => {

    getData()

    const datas = sessionStorage.getItem("jwt")
    const parseDats = JSON.parse(datas)

    try {

      axios.post("/api/CarreerReward/getCareerRewardData",{
        id:parseDats.datam._id
      })
      .then((acc)=>{
        console.log(acc.data)
        setDatas(acc.data)
      })
      .catch((err)=>{
        console.log(err)
      })


    } catch (error) {
      console.log(error)
    }
    
  
   
  }, [])
  




  const getData = () => {
    const getData = sessionStorage.getItem('jwt');
    console.log(getData);

    console.log(getData);
    const parseData = JSON.parse(getData);

    console.log(parseData._id);

    try {
      axios
        .post('/api/dashboardData/dashData', {
          id: parseData.datam._id
        })
        .then((acc) => {
          console.log(acc.data);
          setDatass(acc.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };





  return (
    <>
      <Head>
        <title>Career Reward</title>
      </Head>



      <Container maxWidth="lg">

        <h2 style={{ marginTop: 35 }}>Career Reward</h2>



    {
      datass ? 

        <div className="row" style={{ marginTop: 2 }}>
              
                <div className="col-sm-4">
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
                    
                    Total Team Member
                    </h6>
                    <h6>{Number(datass.Team_Number).toFixed(2)}</h6>
                  </div>
                </div>
                <div className="col-sm-4">
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
                    Total Team Business
                    </h6>
                    <h6>{Number(datass.Team_Busines).toFixed(2)}</h6>
                  </div>
                </div>
                <div className="col-sm-4">
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
                    Rank Eligibility
                    </h6>
                    <h6>{datass.Rank_Eigible}</h6>
                  </div>
                </div>

              
              </div>

      :


      <></>
    }






















        <div style={{ marginTop: 50 }}>

<table className="table table-striped">
  <thead>
    <tr>
      <th style={{ color: "white" }} scope="col">S.N.</th>
      {/* <th style={{ color: "white" }} scope="col">Steps Walked</th> */}
      <th style={{ color: "white" }} scope="col">Reward Level</th>
      <th style={{ color: "white" }} scope="col">Reward Granted</th>
      {/* <th style={{ color: "white" }} scope="col">Package</th> */}
      <th style={{ color: "white" }} scope="col">Time Granted</th>
     
    </tr>
  </thead>
  <tbody>

    {
      datas && datas.map((hit,index)=>{

        if (hit.reward_level == "Ineligible") {
          return
        }


        var TodaySumDay = new Date()

        var getdate = TodaySumDay.getDate()
        var getMonth = TodaySumDay.getMonth()+1
        var getYear = TodaySumDay.getFullYear()

        return <tr key={hit._id} >
        <th style={{ color: "white" }} scope="row">{index+1}</th>
        {/* <td style={{ color: "white" }}>{hit.StepsWalked}</td> */}
        <td style={{ color: "white" }}>{hit.reward_level}</td>
        <td style={{ color: "white" }}>{hit.reward_granted}</td>
        {/* <td style={{ color: "white" }}>{hit.PurchasedPackageName}</td> */}
        <td style={{ color: "white" }}>{String(new Date(getMonth+"/"+getdate+"/"+getYear))}</td>
      </tr>




      })
    }

   
    


  </tbody>
</table>





</div>





      </Container>
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
