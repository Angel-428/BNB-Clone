import houses from "./houses.json";
import House from "../components/House";
const Index = () => (
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

export default Index;
