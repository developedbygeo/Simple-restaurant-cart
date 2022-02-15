import styles from './CurrentMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const MEALS = [
  {
    id: 'm1',
    name: 'Pulled Pork Burger',
    description: 'The best of both worlds.',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Pesto Al Dente',
    description: 'Italian-made pesto, home-made pasta.',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Chicken Tendies',
    description: 'Fresh, tender, spicy, crunchy tenders.',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Greeny Green',
    description: 'Green, healthy & green.',
    price: 18.99,
  },
];

const CurrentMeals = () => {
  const meals = MEALS.map(({ id, name, description, price }) => (
    <MealItem
      key={id}
      id={id}
      name={name}
      description={description}
      price={price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{meals}</ul>
      </Card>
    </section>
  );
};

export default CurrentMeals;
