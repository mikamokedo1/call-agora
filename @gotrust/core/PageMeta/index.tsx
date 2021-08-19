import Head from 'next/head';


interface PageMetaProps {
  title?: string;
  desc?: string;
  canonical?: any;
  css?: any;
  image?: any;
}

const PageMeta: React.FC<PageMetaProps> = ({
  title = 'GoTrust',
  desc = 'Crema is purely based on Material UI components and follows Google’s Material Design guidelines',
  css, image, canonical,
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={desc} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta name="og:description" property="og:description" content={desc} />
    <meta property="og:site_name" content="Proper Noun" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={desc} />
    <meta name="twitter:site" content="@propernounco" />
    <meta name="twitter:creator" content="@propernounco" />
    <link rel="icon" type="image/png" href="/logo-gotrust.png" />
    <link rel="apple-touch-icon" href="/logo-gotrust.png" />
    
    {
      canonical &&
      <meta property="og:url" content={`${canonical}`} />
    }
    {
      css &&
      <link rel="stylesheet" href={`${css}`} />
    }

  </Head>
);
export default PageMeta;
