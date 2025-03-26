import { FC } from 'react';
import { Helmet } from 'react-helmet';

interface SchemaOrgProps {
  url: string;
  title: string;
  description: string;
  imageUrl: string;
  datePublished?: string;
  dateModified?: string;
}

const SchemaOrg: FC<SchemaOrgProps> = ({
  url,
  title,
  description,
  imageUrl,
  datePublished = '2025-03-26',
  dateModified = '2025-03-26',
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      // Person schema
      {
        '@type': 'Person',
        '@id': `${url}#person`,
        name: 'Elin',
        jobTitle: 'Business Intelligence Analyst',
        url: url,
        sameAs: [
          'https://www.linkedin.com/in/e-andersson/',
          'https://github.com/AnderssonElin',
          // Add more profiles if they exist
        ],
      },
      // WebSite schema
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        url: url,
        name: title,
        description: description,
        publisher: {
          '@id': `${url}#person`,
        },
      },
      // WebPage schema
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url: url,
        name: title,
        description: description,
        isPartOf: {
          '@id': `${url}#website`,
        },
        datePublished: datePublished,
        dateModified: dateModified,
        about: {
          '@id': `${url}#person`,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          contentUrl: imageUrl,
          url: imageUrl,
        },
      },
      // ProfilePage schema (for portfolio)
      {
        '@type': 'ProfilePage',
        '@id': `${url}#profilepage`,
        isPartOf: {
          '@id': `${url}#website`,
        },
        mainEntity: {
          '@id': `${url}#person`,
        },
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default SchemaOrg; 