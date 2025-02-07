import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container, Title, ContainersItems, CategoryButton } from './styles';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export function CategoriesCarousel() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    }
    loadCategories();
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
    desktop: { breakpoint: { max: 3000, min: 1280 }, items: 4 },
    tablet: { breakpoint: { max: 1280, min: 690 }, items: 3 },
    mobile: { breakpoint: { max: 690, min: 0 }, items: 2 },
  };

  return (
    <Container>
      <Title>CATEGORIAS</Title>

      {categories.length === 0 ? (
        <p>Carregando categorias...</p>
      ) : (
        <Carousel
          responsive={responsive}
          infinite={true}
          partialVisible={false}
          itemClass="carousel-item"
        >
          {categories.map((category) => (
            <ContainersItems key={category.id} ImageUrl={category.url}>
              <CategoryButton
                onClick={() => navigate(`/cardapio?categoria=${category.id}`)}
              >
                {category.name}
              </CategoryButton>
            </ContainersItems>
          ))}
        </Carousel>
      )}
    </Container>
  );
}
