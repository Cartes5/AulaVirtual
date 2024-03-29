import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <small className={classes.small}>
        Abraham Cartes {new Date().getFullYear()} Copyrights
      </small>
    </footer>
  );
};

export default Footer;