import houses from "../houses.json";
import Head from "next/head";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

const House = props => {
  const content = (
    <div>
      <Head>
        <title>{props.house.title}</title>
      </Head>
      <img src={props.house.picture} width="100%" alt="House picture" />
      <p>
        {props.house.type} - {props.house.town}
      </p>
      <p>
        {props.house.rating} ({props.house.reviewsCount})
      </p>
    </div>
  );
  return <Layout content={content} />;
};

House.getInitialProps = ({ query }) => {
  const { id } = query;
  return {
    house: houses.filter(house => house.id === id)[0]
  };
};

export default House;
