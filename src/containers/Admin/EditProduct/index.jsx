import { yupResolver } from '@hookform/resolvers/yup';
import { Image } from '@phosphor-icons/react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Container,
  Form,
  InputGrup,
  Label,
  Input,
  LabelUpload,
  Select,
  SubmitButton,
  ErrorMessage,
  ContainerCheckbox,
} from './styles';
import { toast } from 'react-toastify';
import { Pending } from '@mui/icons-material';

const schema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  price: yup
    .number()
    .positive('O preço deve ser positivo')
    .required('O preço é obrigatório')
    .typeError('O preço é obrigatório'),
  category: yup.object().required('A categoria é obrigatória'),
  offer: yup.bool(),
});

export function EditProduct() {
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const {
    state: { product },
  } = useLocation();

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    }
    loadCategories();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const productFormData = new FormData();

    productFormData.append('name', data.name);
    productFormData.append('price', data.price * 100);
    productFormData.append('category_id', data.category.id);
    productFormData.append('file', data.file[0]);
    productFormData.append('offer', data.offer);

    await toast.promise(api.put(`/products/${product.id}`, productFormData), {
      Pending: 'Editando produto',
      success: 'Produto editado com sucesso',
      error: 'Falha ao editar produto',
    });

    setTimeout(() => {
      navigate('/admin/produtos');
    }, 3000);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGrup>
          <Label>Nome</Label>
          <Input
            type="text"
            {...register('name')}
            defaultValue={product.name}
          />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputGrup>

        <InputGrup>
          <Label>Preço</Label>
          <Input
            type="number"
            step="0.01"
            {...register('price')}
            defaultValue={product.price / 100}
          />
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
        </InputGrup>

        <InputGrup>
          <Controller
            name="file"
            control={control}
            render={({ field: { onChange } }) => (
              <LabelUpload>
                <Image />
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    setFileName(e.target.files[0]?.name);
                    onChange(e.target.files[0]);
                  }}
                />
                {fileName || 'Upload do Produto'}
              </LabelUpload>
            )}
          />
          <ErrorMessage>{errors?.file?.message}</ErrorMessage>
        </InputGrup>

        <InputGrup>
          <Label>Categoria</Label>
          <Controller
            name="category"
            control={control}
            defaultValue={product.category}
            render={({ field }) => (
              <Select
                {...field}
                options={categories}
                getOptionLabel={(category) => category.name}
                getOptionValue={(category) => category.id}
                placeholder="Categorias"
                menuPortalTarget={document.body}
                defaultValue={product.category}
              />
            )}
          />
          <ErrorMessage>{errors?.category?.message}</ErrorMessage>
        </InputGrup>
        <InputGrup>
          <ContainerCheckbox>
            <input
              type="checkbox"
              defaultChecked={product.offer}
              {...register('offer')}
            />
            <Label>Produto em Oferta ?</Label>
          </ContainerCheckbox>
        </InputGrup>
        <SubmitButton type="submit">Editar Produto</SubmitButton>
      </Form>
    </Container>
  );
}
