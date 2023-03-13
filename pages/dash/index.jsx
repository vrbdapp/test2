import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { CopyToClipboard } from "react-copy-to-clipboard";


function DashboardTasks() {
  const [input, setInput] = useState('');
  const [fetchData, setFetchData] = useState(false);
  const [wallete, setWallete] = useState('');
  const [showWall, setShowWall] = useState(false);
  const [walleteAddress, setWalleteAddress] = useState('');
  const [mainLaykaValue, setMainLaykaValue] = useState('');
  const [data, setData] = useState('');
  const [myRef, setMyRef] = useState('');
  const [datass, setDatass] = useState('');


  const router = useRouter();

  if (typeof window !== 'undefined') {
    if (!sessionStorage.getItem('jwt')) {
      router.push('/');
    }
  }

  useEffect(() => {
    getData();

    const getDatas = sessionStorage.getItem('jwt');
    const parseIt = JSON.parse(getDatas);
    setMyRef(parseIt.datam.WalletAddress);

    const getApiPullrec = sessionStorage.getItem('makeApirequest');

    // if (getApiPullrec) {
    //   try {
    //     axios
    //       .post('/api/dailyreward', {
    //         user_id: parseIt.datam._id,
    //         wallet_id: parseIt.datam.WalletAddress
    //       })
    //       .then((acc) => {
    //         sessionStorage.removeItem('makeApirequest');
    //         console.log(acc.data);
    //         // alert(acc.data.data.reward.reward_granted);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }, []);
  useEffect(() => {
    
    getData()
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
          setData(acc.data);
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
        <title>Deposit Coins</title>
      </Head>

      <Container>
        <h2 style={{ marginTop: 35 }}>Dashboard</h2>
        {myRef ? (

          <div
            style={{
              borderColor: '#9c27b0',
              backgroundColor: '#020e22f2',
              borderWidth: 2,
              borderStyle: 'solid',
              borderRadius: 20,
              paddingTop: 25,
              paddingBottom: 25,
            }}
          >

            <CopyToClipboard text={`https://vrbstaking.vercel.app?id=${myRef}`} onCopy={() => alert("Copied")}>

              <h5

                className="m-3"
                
                style={{  color: 'white' ,fontSize:15}}
              >
                Referral Link : <a style={{ color: "yellow" ,fontSize:15}}> https://vrbstaking.vercel.app?id={myRef.slice(0, 10)}...</a>


                <a style={{ marginLeft: 5 }}><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                </svg>
                </a>



              </h5>
            </CopyToClipboard>

{/* 
            xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px */}


{/* 
            <h5

              className="text-center mt-3"
              style={{  color: 'white' }}
            >
              Contract Link :<a className='xs:0 sm:576px lg:992px xl:1200px xxl: 1400px' style={{ color: "yellow" }}> 0xEE9...KH78</a>




            </h5> */}

<h5

className=" m-3"
style={{  color: 'white' ,fontSize:15}}
>
Daily ROI : <a style={{ color: "yellow" }}>0.5%</a>

</h5>


            <h5

              className=" m-3"
              style={{  color: 'white' ,fontSize:15}}
            >
              Rank : <a style={{ color: "yellow" }}>{Number(data.Totan_Direct_Number) == 0 ? "No Rank" : Number(data.Totan_Direct_Number) > 50 ? "Diamond Star"  : "Gold Star"}</a>

            </h5>


          </div>



        ) : (
          <></>
        )}

        {data ? (
          <>
            <div
              style={{
                borderColor: '#9c27b0',
                backgroundColor: '#020e22f2',
                borderWidth: 2,
                borderStyle: 'solid',
                borderRadius: 20,
                marginTop: 20
              }}
            >
              <div className="row" style={{ marginTop: 10 }}>
                <div className="col-sm-3">
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
                      // background: url(/intro-bg.png.png)
                    }}
                  >
                    <h6 style={{  fontSize: 20 }}>
                      Staking Reward
                    </h6>
                    <h6 style={{ color: "yellow" }}>{Number(data.Total_Staking).toFixed(2)}</h6>
                  </div>
                </div>
                <div className="col-sm-3">
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
                    <h6 style={{  fontSize: 20 }}>
                      Level Reward
                    </h6>
                    <h6 style={{ color: "yellow" }}>{Number(data.Team_Roi_Level).toFixed(2)}</h6>
                  </div>
                </div>
                

                <div className="col-sm-3">
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
                    <h6 style={{  fontSize: 20 }}>
                    Available Balance
                    </h6>
                    {/* <h6 style={{ color: "yellow" }}>{Number(data.Real_Availible).toFixed(2)}</h6> */}
                    <h6 style={{ color: "yellow" }}>{Number(data.Real_Availible) < 0 ? 0 :Number(data.Real_Availible).toFixed(2)}</h6>
                  </div>
                </div>
                <div className="col-sm-3">
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
                    <h6 style={{  fontSize: 20 }}>
                      Total Staked
                    </h6>
                    <h6 style={{ color: "yellow" }}>{Number(data.Total_Deposit).toFixed(2)}</h6>
                  </div>
                </div>
                {/* <div className="col-sm-3">
                  <div
                    style={{
                      backgroundImage: `url("/intro-bg.png.png")`,
                      backgroundColor: '#020e22f2',
                      padding: 20,
                      margin: 10,
                      borderColor: '#ffffff66f',
                      borderWidth: 1,
                      borderStyle: 'outset',
                      borderRadius: 10,
                      textAlign: 'center'
                    }}
                  >
                    <h6 style={{  fontSize: 20 }}>
                      Total Team Number
                    </h6>
                    <h6>{Number(data.Team_Number).toFixed(2)}</h6>
                  </div>
                </div> */}
              </div>
              <div className="row" style={{ marginTop: 2 }}>
                {/* <div className="col-sm-3">
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
                    <h6 style={{  fontSize: 20 }}>
                      Total Team Business
                    </h6>
                    <h6>{Number(data.Team_Busines).toFixed(2)}</h6>
                  </div>
                </div> */}
               
                <div className="col-sm-3">
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
                    <h6 style={{  fontSize: 20 }}>
                      Total Earned
                    </h6>
                    <h6 style={{ color: "yellow" }}>{Number(data.Total_Earned_Income).toFixed(2)}</h6>
                  </div>
                </div>
                <div className="col-sm-3">
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
                    <h6 style={{  fontSize: 20 }}>
                      Total Direct Number
                    </h6>
                    <h6 style={{ color: "yellow" }}>{Number(data.Totan_Direct_Number).toFixed(2)}</h6>
                  </div>
                </div>
                <div className="col-sm-3">
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
                    <h6 style={{  fontSize: 20 }}>
                      Total Direct Business
                    </h6>
                    <h6 style={{ color: "yellow" }}>{Number(data.Total_Direcct_Business).toFixed(2)}</h6>
                  </div>
                </div>

                <div className="col-sm-3">
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
                    <h6 style={{  fontSize: 20 }}>
                      Lap Income
                    </h6>
                    <h6 style={{ color: "yellow" }}>{Number(data.Lap_Wallet).toFixed(2)}</h6>
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginTop: 2 }}>
                
                <div className="col-sm-3">
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
                    <h6 style={{  fontSize: 20 }}>
                      Total Withdrawal
                    </h6>
                    <h6 style={{ color: "yellow" }}>{Number(data.Total_Withdrawal).toFixed(2)}</h6>
                  </div>
                </div>

                <div className="col-sm-3">
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
                    <h6 style={{  fontSize: 20 }}>
                      Total Team Number
                    </h6>
                    <h6 style={{ color: "yellow" }}>{Number(data.Team_Number).toFixed(2)}</h6>
                  </div>
                </div>

                <div className="col-sm-3">
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
                    <h6 style={{  fontSize: 20 }}>
                      Total Team Business
                    </h6>
                    <h6 style={{ color: "yellow" }}>{Number(data.Team_Busines).toFixed(2)}</h6>
                  </div>
                </div>



               



               





              </div>
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-center mt-5">Loading Data...</h1>
          </div>
        )}
      </Container>
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
