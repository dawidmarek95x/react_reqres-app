import { FC } from "react";

type SpinnerProps = {
  containerClassName?: string;
  size?: number;
};

export const Spinner: FC<SpinnerProps> = ({
  containerClassName,
  size = 50,
  ...props
}: SpinnerProps) => {
  return (
    <div className={`${containerClassName}`}>
      <div
        className={`loading loading-spinner text-black`}
        style={{
          width: size,
          height: size,
        }}
        {...props}
      ></div>
    </div>
  );
};
