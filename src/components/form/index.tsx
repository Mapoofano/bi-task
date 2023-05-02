import { Props } from './types';

const Form = (props: Props) => {
  return (
    <form
      {...props}
      className="flex flex-col justify-center items-center space-y-2"
    >
      {props.children}
      <button
        disabled={props.disabled}
        className={`${
          props.disabled
            ? 'pointer-events-none bg-blue-300'
            : 'bg-blue-700 hover:bg-blue-800'
        } w-1/2 text-white  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2`}
      >
        {props.buttonTitle}
      </button>
    </form>
  );
};

export default Form;
