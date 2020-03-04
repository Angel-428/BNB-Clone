// import houses from "../houses.json";
import Head from "next/head";
import Layout from "../../components/Layout";
import DateRangePicker from "../../components/DateRangePicker";
import { useStoreActions, useStoreState, useStore } from "easy-peasy";
import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import axios from "axios";

const calcNumberOfNightsBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate); //clone
  const end = new Date(endDate); //clone
  let dayCount = 0;

  while (end > start) {
    dayCount++;
    start.setDate(start.getDate() + 1);
  }

  return dayCount;
};

const canBook = async (houseId, startDate, endDate, userEmail) => {
  try {
    const response = await axios.post("http://localhost:4000/api/house/check", {
      houseId,
      startDate,
      endDate,
      userEmail
    });

    if (response.data.message === "busy") {
      alert(response.data.message);
      return;
    }

    return true;
  } catch (error) {
    console.log(error);
    return;
  }
};
const getBookedDates = async id => {
  try {
    let datesArray = [];
    const response = await axios.post(
      "http://localhost:4000/api/house/booked",
      {
        houseId: id
      }
    );
    if (response.data.status === "error") {
      alert(response.data.message);
      return;
    }
    return response.data.dates;
  } catch (error) {
    console.log(error);
  }
};

const House = props => {
  const [dateChosen, setDateChosen] = useState(false);
  const [numberOfNightsBetweenDates, setNumberOfNightsBetweenDates] = useState(
    0
  );
  const setShowLoginModal = useStoreActions(
    actions => actions.modals.setShowLoginModal
  );
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const user = useStoreState(state => state.user.user);
  // const setUser = useStoreActions(actions => actions.user.setUser);

  const content = (
    <div className="container">
      <Head>
        <title>{props.house.title}</title>
      </Head>
      <article>
        <img src={props.house.picture} width="100%" alt="House picture" />
        <p>
          {props.house.type} - {props.house.town}
        </p>
        <div>
          {props.house.rating}{" "}
          {props.house.reviewsCount ? (
            <div className="reviews">
              <h3>{props.house.reviewsCount} Reviews</h3>

              {props.house.reviews.map((review, index) => {
                return (
                  <div key={index}>
                    <p>{new Date(review.createdAt).toDateString()}</p>
                    <p>{review.comment}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </article>
      <aside>
        <h2>Add dates for prices</h2>
        <DateRangePicker
          datesChange={(startDate, endDate) => {
            setNumberOfNightsBetweenDates(
              calcNumberOfNightsBetweenDates(startDate, endDate)
            );
            setDateChosen(true);
            setStartDate(startDate);
            setEndDate(endDate);
          }}
          bookedDates={props.responseDate}
        />
        {dateChosen && (
          <div>
            <h2>Price per night</h2>
            <p>${props.house.price}</p>
            <h2>Total Price for booking</h2>
            <p>
              ${(numberOfNightsBetweenDates * props.house.price).toFixed(2)}
            </p>
            {user ? (
              <button
                className="reserve"
                onClick={async () => {
                  if (!(await canBook(props.house.id, startDate, endDate))) {
                    alert("The date choosen are not valid");
                    return;
                  }
                  try {
                    const response = await axios.post(
                      "http://localhost:4000/api/house/reserve",
                      {
                        houseId: props.house.id,
                        startDate,
                        endDate,
                        user
                      }
                    );
                    if (response.data.status === "error") {
                      alert(response.data.message);
                      return;
                    }
                    console.log(response.data);
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                Reserve
              </button>
            ) : (
              <button
                className="reserve"
                onClick={() => {
                  setShowLoginModal();
                }}
              >
                Reserve
              </button>
            )}
          </div>
        )}
      </aside>

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 60% 40%;
          grid-gap: 30px;
        }

        aside {
          border: 1px solid #ccc;
          padding: 20px;
        }
        button {
          background-color: rgb(255, 90, 95);
          color: white;
          font-size: 13px;
          width: 100%;
          border: none;
          height: 40px;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
  return <Layout content={content} />;
};

House.getInitialProps = async ({ query }) => {
  const { id } = query;

  const res = await fetch(`http://localhost:4000/api/house/${id}`);
  const house = await res.json();
  const responseDate = await getBookedDates(id);

  return {
    house,
    responseDate
  };
};

export default House;
