import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/UserContext';

import Logo from '../../assets/logo.svg';
import { Button } from '../../components';
import {
  Container,
  Form,
  InputContainer,
  LeftContainer,
  RightContainer,
  Title,
  Link,
} from './styles';

export function Login() {
  const navigate = useNavigate();
  const { putUserData } = useUser();

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Digite um e-mail válido.')
        .required('O e-mail é obrigatório.'),
      password: yup
        .string()
        .min(6, 'A senha deve ter no minimo 6 caracteres')
        .required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await toast.promise(
        api.post('/session', {
          email: data.email,
          password: data.password,
        }),
        {
          pending: 'Verificando seus dados...',
          success: 'Login realizado com sucesso!',
          error: 'E-mail ou senha incorretos! Tente novamente.',
        },
      );

      const { status, data: userData } = response;

      if (status === 200 || status === 201) {
        putUserData(userData);

        setTimeout(() => {
          if (userData?.admin) {
            navigate('/admin/pedidos');
          } else {
            navigate('/');
          }
        }, 2000);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error('😭 Falha no sistema! Tente novamente.');
    }
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="imagem-logo" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Olá, seja bem vindo ao <span> Dev urger!</span>
          <br />
          Acesse com seu <span>Login e senha.</span>
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Email</label>
            <input type="email" {...register('email')} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type="password" {...register('password')} />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <Button type="submit">Entrar</Button>
        </Form>
        <p>
          Não possui conta? <Link to="/cadastro"> Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
