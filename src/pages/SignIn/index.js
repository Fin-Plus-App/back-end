import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ButtonForm from '../../components/Form/Button';
import InputForm from '../../components/Form/Input';
import UserContext from '../../contexts/UserContext';
import useSignIn from '../../hooks/api/useSignIn';

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const { signInLoading, signIn } = useSignIn();
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      navigate('/dashboard');
    }
  }, [userData]);

  function handleForm(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  async function submit(event) {
    event.preventDefault();

    try {
      const body = {
        email: form.email,
        password: form.password,
      };

      const user = await signIn(body);
      setUserData(user);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Não foi possível fazer o login!');
    }
  }

  return (
    <>
      Sign-in
      <form onSubmit={submit}>
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
          required
        />
        <ButtonForm type="submit" disabled={signInLoading}>
          Entrar
        </ButtonForm>
      </form>
    </>
  );
}
