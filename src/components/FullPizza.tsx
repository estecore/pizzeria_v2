import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://65bd679cb51f9b29e93367d0.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
        alert("Не удалось прогрузить информацию о пицце..");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }
  return (
    <div className="container">
      <h3>Не смотрите, данный раздел ещё в разработке...</h3>
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};
