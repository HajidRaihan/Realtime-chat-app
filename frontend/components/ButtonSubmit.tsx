import React from "react";
import { Button } from "./ui/button";
import { VscLoading } from "react-icons/vsc";

interface ButtonSubmitProps {
  isLoading: boolean;
  title: string;
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ isLoading, title }) => {
  return (
    <Button type="submit" className="w-full font-bold gap-2" disabled={isLoading}>
      {isLoading && <VscLoading className="animate-spin" size={15} />}
      {title}
    </Button>
  );
};

export default ButtonSubmit;
