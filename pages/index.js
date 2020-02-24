import houses from "./houses.json";
import House from "../components/House";
import Layout from "../components/Layout";

const content = (
  <div>
    <h1>Houses to stay</h1>
    <div className="houses">
      {houses.map((house, idx) => {
        return <House key={idx} {...house} />;
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
    ;
  </div>
);

const Index = () => <Layout content={content} />;

export default Index;
