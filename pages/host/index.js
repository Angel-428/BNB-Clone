import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import Layout from "../../components/Layout";

const Host = (props) => {
  const setDataBook = useStoreActions(
    (actions) => actions.user.setMyBookedHouse
  );
  const dataBook = useStoreState((state) => state.user.dataBook);
  const setHouse = useStoreActions((actions) => actions.user.setMyHouses);
  const dataHouse = useStoreState((state) => state.user.dataHouse);

  const fetchingDataOnMount = () => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch("https://polar-refuge-69571.herokuapp.com/api/login", {
        method: "post",
        headers: {
          "content-type": "application/json",
          authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.id) {
            fetch(
              `https://polar-refuge-69571.herokuapp.com/api/house/host/list/${data.id}`,
              {
                method: "get",
                headers: {
                  "content-type": "application/json",
                  authorization: token,
                },
              }
            )
              .then((response) => response.json())
              .then((res) => {
                setDataBook(res.bookings);
                setHouse(res.houses);
              });
          }
        });
    }
  };

  useEffect(() => {
    fetchingDataOnMount();
  }, []);

  return (
    <Layout
      content={
        <div>
          <Head>
            <title>Your houses</title>
          </Head>
          <div className="container">
            <div className="houses">
              <h2>Your houses</h2>

              <div className="list">
                {dataHouse && dataHouse.length > 0 ? (
                  dataHouse.map((house, index) => {
                    return (
                      <div className="house" key={index}>
                        <img src={house.picture} alt="House picture" />
                        <div>
                          <h2>
                            {house.title} in {house.town}
                          </h2>
                          <p>
                            <Link href={`/houses/${house.id}`}>
                              <a>View house page</a>
                            </Link>
                          </p>
                          <p>
                            <Link href={`/host/${house.id}`}>
                              <a>Edit house details</a>
                            </Link>
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>No Houses Owned</div>
                )}
              </div>
            </div>
            <div className="bookings">
              <h2>Your bookings</h2>

              <div className="list">
                {dataBook && dataBook.length > 0 ? (
                  dataBook.map((booking, index) => {
                    return (
                      <div className="booking" key={index}>
                        <div>
                          <h2>
                            {booking.house.title} in {booking.house.town}
                          </h2>
                          <p>
                            Booked from{" "}
                            {new Date(booking.booking.startDate).toDateString()}{" "}
                            to{" "}
                            {new Date(booking.booking.endDate).toDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>No house booked</div>
                )}
              </div>
            </div>
          </div>
          <style jsx>{`
            .container {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              grid-gap: 50px;
            }

            .list {
              display: grid;
              grid-template-columns: 100%;
              grid-gap: 40px;
              margin-top: 60px;
            }

            .house {
              display: grid;
              grid-template-columns: 30% 70%;
              grid-gap: 40px;
            }

            .house img {
              width: 100px;
            }
          `}</style>
        </div>
      }
    />
  );
};

export default Host;
