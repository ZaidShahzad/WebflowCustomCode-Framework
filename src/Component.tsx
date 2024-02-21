import ReactDOM from 'react-dom';
import "./index.css";

const Component = () => {

  return (
    <div>
      <p>WebflowCustomCode-Framework</p>
      <p className='text-red-500'>Red</p>
      <p className='text-green-500'>Green</p>
      <p className='text-blue-500'>Blue</p>
    </div>
  );
};


let webflowComponentElementID = "root";
ReactDOM.render(<Component/>, document.getElementById(webflowComponentElementID));