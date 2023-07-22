import { ReactNode } from "react";
import "./style.sass";

interface ISearchInputProps extends React.HTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
}
export const SearchInput = ({
  endIcon,
  startIcon,
  style,
  disabled,
  ...props
}: ISearchInputProps) => {
  return (
    <div className="input-wrapper" style={style}>
      {startIcon && <div className="start icon">{startIcon}</div>}
      <input disabled={disabled} type="text" {...props} />
      {endIcon && <div className="end icon">{endIcon}</div>}
    </div>
  );
};
