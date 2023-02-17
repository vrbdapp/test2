import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
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


  const router = useRouter();


  useEffect(() => {

    getLevelDatas()

  }, [])



  const getLevelDatas = () => {

    const userData = sessionStorage.getItem("jwt")
    const parse = JSON.parse(userData)

    console.log("LEV => 1")


    try {
      axios.post("/api/LevelData/LevelDatas", {
        // id: "63df95e19ac74a6ff166e884"
        id: parse.datam._id
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



  const getLevelData = (texts) => {


    console.log("LEV => " + texts)

    const userData = sessionStorage.getItem("jwt")
    const parse = JSON.parse(userData)

    try {
      axios.post("/api/getLevelData/levelData", {
        id: parse.datam._id,
        level: texts
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
      axios.post("/api/updateWalletes", {
        id: parse._id,
        address: walleteAddress
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





  const handleLev = (name) => {



    setLevelName(name)



  }


  const datams = [
    {"wewe":"wegwe"},
    {"wewe":"wegwe"},
    {"wewe":"wegwe"},
    {"wewe":"wegwe"},
    {"wewe":"wegwe"},
    {"wewe":"wegwe"},
    {"wewe":"wegwe"},
    {"wewe":"wegwe"},
    {"wewe":"wegwe"},
  ]


  return (
    <>
      <Head>
        <title>Team</title>
      </Head>



      <Container maxWidth="lg">












        <div className="row">
          <div className="col-sm-6">
            <h2 style={{ marginTop: 35 }}>Team</h2>
          </div>

        </div>













        <div>


          <div className="container mt-1">
            <div className="row">

            {
             datas && datas.map((hit,index)=>{
                return <div key={index+1} style={{margin:5}}>

                <div className="accordion accordion-flush text-white" style={{ backgroundColor: "purple" }} id="accordionFlushExample">



                  <div style={{ backgroundColor: "purple" }} className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                      <button style={{ backgroundColor: "purple" }} className="accordion-button collapsed text-white" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseegw${index}`} aria-expanded="false" aria-controls="flush-collapseOne">
                     <a style={{fontWeight:"bolder"}}>LEVEL {index+1} : </a> {hit.WalletId}
                      </button>
                    </h2>
                    <div id={`flush-collapseegw${index}`} className="accordion-collapse collapse text-white" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body text-white">Wallet Balance : {hit.WalletAmount}</div>
                    </div>
                  </div>




                </div>

















              </div>
              })
            }

              










            </div>
          </div>








        </div>





      </Container>
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
