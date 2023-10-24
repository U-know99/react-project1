import PropType from "prop-type";
import styles from "./Button.module.css";

function Button({ text }) {
  return <button className={styles.btn}>{text}</button>;
}

Button.prototype = {
  text: PropType.toString.isRequired,
};

export default Button;
