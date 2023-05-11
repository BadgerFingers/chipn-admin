import Load from "../../img/loader.svg"

const Loader = (props) => {
  return (
    <div>
        <img src={Load} width={props.w} alt="Loader" />
    </div>
  );
};

export default Loader;
