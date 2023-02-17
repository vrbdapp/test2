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
  const [levelName, setLevelName] = useState("LEVEL 1")
  const [datas, setDatas] = useState("")
  const [increaseNumber, setIncreaseNumber] = useState(1)


  const router = useRouter();


  useEffect(() => {
    
    getLevelDatas()
    
  }, [])



  const getLevelDatas = () =>{

    const userData = sessionStorage.getItem("jwt")
    const parse = JSON.parse(userData)

    console.log("LEV => 1")


    try {
      axios.post("/api/getLevelData/levelData", {
        id: parse.datam._id,
        level: "1"
      })
        .then((acc) => {
          console.log(acc.data)
          setDatas(acc.data)
        
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    }










  }



  const getLevelData = (texts) =>{


    console.log("LEV => "+texts)

    const userData = sessionStorage.getItem("jwt")
    const parse = JSON.parse(userData)

    try {
      axios.post("/api/getLevelData/levelData", {
        id: parse.datam._id,
        level: texts,
        nums:increaseNumber
      })
        .then((acc) => {
          console.log(acc.data)
          setDatas(acc.data)
        
        })
        .catch((err) => {
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
      axios.post("/api/CarreerReward/getCareerRewardData", {
        id: parse.datam._id
      })
        .then((acc) => {
          console.log("updated")
          
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





  const handleLev = (name) =>{

 

    setLevelName(name)



  }


  return (
    <>
      <Head>
        <title>Deposit Coins</title>
      </Head>



      <Container maxWidth="lg">

      










<div className="row">
  <div className="col-sm-6">
  <h2 style={{ marginTop: 35 }}>Level Income</h2>
  </div>
  <div className="col-sm-6 ">
    <div style={{textAlign:'right',marginTop:35}} className='text-right'>
  <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   {levelName}
  </button>
  {/* setLevelName("LEVEL 1") */}
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" onClick={()=>{handleLev("LEVEL 1"),getLevelData("1")}} href="#">LEVEL 1</a></li>
    <li><a className="dropdown-item" onClick={()=>{handleLev("LEVEL 2"),getLevelData("2")}} href="#">LEVEL 2</a></li>
    <li><a className="dropdown-item" onClick={()=>{handleLev("LEVEL 3"),getLevelData("3")}} href="#">LEVEL 3</a></li>
    <li><a className="dropdown-item" onClick={()=>{handleLev("LEVEL 4"),getLevelData("4")}} href="#">LEVEL 4</a></li>
    <li><a className="dropdown-item" onClick={()=>{handleLev("LEVEL 5"),getLevelData("5")}} href="#">LEVEL 5</a></li>
    <li><a className="dropdown-item" onClick={()=>{handleLev("LEVEL 6"),getLevelData("6")}} href="#">LEVEL 6</a></li>
    <li><a className="dropdown-item" onClick={()=>{handleLev("LEVEL 7"),getLevelData("7")}} href="#">LEVEL 7</a></li>
    <li><a className="dropdown-item" onClick={()=>{handleLev("LEVEL 8"),getLevelData("8")}} href="#">LEVEL 8</a></li>
    <li><a className="dropdown-item" onClick={()=>{handleLev("LEVEL 9"),getLevelData("9")}} href="#">LEVEL 9</a></li>
    <li><a className="dropdown-item" onClick={()=>{handleLev("LEVEL 10"),getLevelData("10")}} href="#">LEVEL 10</a></li>
    <li><a className="dropdown-item" onClick={()=>{handleLev("LEVEL 11"),getLevelData("11")}} href="#">LEVEL 11</a></li>
    <li><a className="dropdown-item" onClick={()=>{handleLev("LEVEL 12"),getLevelData("12")}} href="#">LEVEL 12</a></li>
    <li><a className="dropdown-item" onClick={()=>{handleLev("LEVEL 13"),getLevelData("13")}} href="#">LEVEL 13</a></li>
    <li><a className="dropdown-item" onClick={()=>{handleLev("LEVEL 14"),getLevelData("14")}} href="#">LEVEL 14</a></li>
    <li><a className="dropdown-item" onClick={()=>{handleLev("LEVEL 15"),getLevelData("15")}} href="#">LEVEL 15</a></li>
  </ul>
</div>
    </div>
  </div>
</div>














        <div style={{ marginTop: 50 }}>

          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ color: "white" }} scope="col">S.N.</th>
                <th style={{ color: "white" }} scope="col">Level Earned</th>
                <th style={{ color: "white" }} scope="col">Coin Earned</th>
                <th style={{ color: "white" }} scope="col">Earned Percantage</th>
                <th style={{ color: "white" }} scope="col">Reward From</th>
                <th style={{ color: "white" }} scope="col">Date</th>
              </tr>
            </thead>
            <tbody>

              {
               datas&&datas.map((hit, index) => {
                  return <tr key={hit.key}>
                    <th style={{ color: "white" }} scope="row">{index + 1}</th>
                    <td style={{ color: "white" }}>{hit.LevelEarned}</td>
                    <td style={{ color: "white" }}>{hit.coinEarned}</td>
                    <td style={{ color: "white" }}>{hit.EarnedPercantage}</td>
                    <td style={{ color: "white" }}>{hit.rewardGetFromName}</td>
                    <td style={{ color: "white" }}>{String(new Date(hit.createdAt))}</td>
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
