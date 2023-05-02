interface IForm {
  buttonTitle: string;
}

export interface Props
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLFormElement>,
      HTMLFormElement
    >,
    IForm {}
