import { ThreeDots } from "react-loader-spinner";

const LoadingThree = () => {
  return (
    <div className="">
      <ThreeDots
        visible={true}
        height="60"
        width="60"
        color="#bdbdbe"
        radius="6"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoadingThree;
