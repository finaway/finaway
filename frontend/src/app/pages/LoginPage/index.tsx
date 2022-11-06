import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { PageWrapper } from 'app/components/PageWrapper';

export function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login Page</title>
        <meta
          name="description"
          content="Login to Finaway to start your session"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>Hello World</PageWrapper>
    </>
  );
}
