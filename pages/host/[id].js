import axios from "axios";
import Head from "next/head";
import Layout from "../../components/Layout";
import HouseForm from "../../components/HouseForms";

const EditHouse = (props) => {
  return (
    <Layout
      content={
        <>
          <Head>
            <title>Edit house</title>
          </Head>

          <HouseForm edit={true} house={props.house} />
        </>
      }
    />
  );
};

EditHouse.getInitialProps = async ({ query }) => {
  const { id } = query;
  const response = await axios.get(
    `https://polar-refuge-69571.herokuapp.com/api/house/${id}`
  );
  return {
    house: response.data,
  };
};

export default EditHouse;
