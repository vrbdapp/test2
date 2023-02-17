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
        <title>News</title>
      </Head>



      <Container maxWidth="lg">

        <h2 style={{ marginTop: 35 }}>No Data Found</h2>



   



























      </Container>
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
