import './loader.css';

function Loader(): JSX.Element {
  return (
    <div className="loaderContainer">
      <div className="loader"></div>
      <p>Загрузка...</p>
    </div>
  );
}

export default Loader;
