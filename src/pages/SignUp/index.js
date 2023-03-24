import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ButtonForm from '../../components/Form/Button';
import InputForm from '../../components/Form/Input';
import useSignUp from '../../hooks/api/useSignUp';

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const { signUpLoading, signUp } = useSignUp();

  function handleForm(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  async function submit(event) {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('As senhas devem ser iguais!');
    } else {
      try {
        const body = {
          name: form.name,
          email: form.email,
          password: form.password,
        };

        await signUp(body);
        toast.success('Inscrito com sucesso! Por favor, faça login.');
        navigate('/sign-in');
      } catch (error) {
        toast.error('Não foi possível fazer o cadastro!');
      }
    }
  }

  return (
    <>
      Sign-up
      <form onSubmit={submit}>
        <InputForm
          label="Nome"
          id="name"
          name="name"
          value={form.name}
          onChange={handleForm}
          type="text"
          placeholder="Digite seu nome"
          required
        />
        <InputForm
          label="Email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleForm}
          type="email"
          placeholder="exemplo@email.com"
          required
        />
        <InputForm
          label="Senha"
          id="password"
          name="password"
          value={form.password}
          onChange={handleForm}
          type="password"
          placeholder="Digite a senha"
          minLength={6}
          required
        />
        <InputForm
          label="Confirmar senha"
          id="confirmPassword"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleForm}
          type="password"
          placeholder="Confirme sua senha"
          minLength={6}
          required
        />
        <ButtonForm type="submit" disabled={signUpLoading}>
          Cadastrar
        </ButtonForm>
      </form>
    </>
  );
}
