// import fetch from "isomorphic-unfetch";
import House from "../components/House";
import Layout from "../components/Layout";
import axios from "axios";
const Index = props => {
  console.log("props", props);
  return (
    <Layout
      content={
        <div>
          <h2>Places to stay</h2>

          <div className="houses">
            {props.houses.map((house, index) => {
              return <House key={index} {...house} />;
            })}
          </div>

          <style jsx>{`
            .houses {
              display: grid;
              grid-template-columns: 50% 50%;
              grid-template-rows: 300px 300px;
              grid-gap: 40px;
            }
          `}</style>
        </div>
      }
    />
  );
};

Index.getInitialProps = async () => {
  const houses = await axios.get(`http://localhost:4000/api/house`);
  return {
    houses
  };
};

export default Index;
