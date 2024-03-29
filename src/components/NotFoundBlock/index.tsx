import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <span>🥺</span>
      <h1>Ничего не найдено..</h1>
      <p>К сожалению, данная страница отсутствует в нашем магазине...</p>
    </div>
  );
};
