import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, author, keywords }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <Toaster/>
      <main style={{ minHeight: '80vh' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
    title:"Ecommerce app -shop now",
    description:"mern stack project",
    keywords:"mongodb , react , node , express",
    author:"Technifocity"
}
export default Layout;
