const Category = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div id="shade" className="w-16 h-16 bg-purple-800 rounded-full"></div>
      <footer>
        <p className="text-purple-300 mt-2">{name}</p>
      </footer>
    </div>
  );
};

export default Category;
