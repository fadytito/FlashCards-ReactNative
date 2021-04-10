import { primary, white } from "../styles/colors";

const StackHeaderStyles = (title) => {
  return {
    title: title,
    headerStyle: {
      backgroundColor: primary,
    },
    headerTintColor: white,
  };
};

export default StackHeaderStyles;
