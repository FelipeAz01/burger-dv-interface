import { useEffect, useState } from 'react';
import {
  Container,
  Banner,
  CategoryMenu,
  ProductsContainer,
  CategoryButton,
} from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/FormatPrice';
import { CardProduct } from '../../components/CardProduct';
import { useLocation, useNavigate } from 'react-router-dom';

export function Menu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [activeCategory, setActiveCategory] = useState(() => {
    const categoryId = +queryParams.get('categoria');
    return categoryId || 0;
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get('/categories');
        const newCategories = [{ id: 0, name: 'Todas' }, ...data];
        setCategories(newCategories);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    }

    async function loadProducts() {
      try {
        const { data } = await api.get('/products');
        const newProducts = data.map((product) => ({
          currencyValue: formatPrice(product.price),
          ...product,
        }));
        setProducts(newProducts);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    }

    loadCategories();
    loadProducts();
  }, []);

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category_id === activeCategory),
      );
    }
  }, [products, activeCategory]);

  return (
    <Container>
      <Banner>
        <h1>
          O MELHOR
          <br />
          HAMBÚRGUER
          <br />
          ESTÁ AQUI!
          <span>Esse cardápio está irresistível!</span>
        </h1>
      </Banner>

      <CategoryMenu>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            $isActiveCategory={category.id === activeCategory}
            onClick={() => {
              setActiveCategory(category.id);
              navigate(
                {
                  pathname: '/cardapio',
                  search: `?categoria=${category.id}`,
                },
                { replace: true },
              );
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryMenu>

      <ProductsContainer>
        {filteredProducts.map((product) => (
          <CardProduct product={product} key={product.id} />
        ))}
      </ProductsContainer>
    </Container>
  );
}
