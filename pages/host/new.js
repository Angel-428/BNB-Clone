import Head from "next/head";
import Layout from "../../components/Layout";
import HouseForms from "../../components/HouseForms";

const NewHouse = () => {
  return (
    <Layout
      content={
        <>
          <Head>
            <title>Add a new house</title>
          </Head>

          <HouseForms edit={false} />
        </>
      }
    />
  );
};

export default NewHouse;
