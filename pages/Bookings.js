import Layout from "../components/Layout";
import Head from "next/head";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";

const Bookings = (props) => {
  const setHouseBooked = useStoreActions(
    (actions) => actions.user.setHouseBooked
  );
  const setUser = useStoreActions((actions) => actions.user.setUser);
  const data = useStoreState((state) => state.user.houseBooked);

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
              `https://polar-refuge-69571.herokuapp.com/api/house/bookings/list/${data.id}`,
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
                console.log("res", res);
                setHouseBooked(res);
                setUser();
              });
          }
        })
        .catch((err) => console.log("err", err));
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
            <title>Your bookings</title>
          </Head>
          <h2>Your bookings</h2>

          <div className="bookings">
            {data && data.bookings && data.bookings.length > 0 ? (
              data.bookings.map((booking, index) => {
                return (
                  <div className="booking" key={index}>
                    <img src={booking.house.picture} alt="House picture" />
                    <div>
                      <h2>
                        {booking.house.title} in {booking.house.town}
                      </h2>
                      <p>
                        Booked from{" "}
                        {new Date(booking.booking.startDate).toDateString()} to{" "}
                        {new Date(booking.booking.endDate).toDateString()}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>no House booked</div>
            )}
          </div>

          <style jsx>{`
            .bookings {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              grid-gap: 40px;
            }
            .booking {
              display: grid;
              grid-template-columns: 100%;
              grid-gap: 40px;
              margin-top: 60px;
            }

            .booking img {
              width: 180px;
            }
          `}</style>
        </div>
      }
    />
  );
};

export default Bookings;
