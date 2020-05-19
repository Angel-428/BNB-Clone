import Link from "next/link";

const House = (props) => {
  return (
    <div>
      <Link href="/houses/[id]" as={"/houses/" + props.id}>
        <a>
          <img src={props.picture} width="100%" alt="House picture" />
          <p>{props.type}</p>
          <p>{props.title}</p>
          <p>{props.rating}</p>
        </a>
      </Link>
    </div>
  );
};

export default House;
