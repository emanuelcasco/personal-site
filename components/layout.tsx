import Container from './container';
import Footer from './footer';
import Header from './header';
import Meta from './meta';

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <div>
      <Meta />
      <Header />
      <Container>
        <div className="min-h-screen">
          <main>{children}</main>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
