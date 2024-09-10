const StockInfo = ({ index, koreanName }) => {
  return (
    <>
      <p>
        {index + 1} {koreanName}
      </p>
    </>
  );
};

export default StockInfo;
