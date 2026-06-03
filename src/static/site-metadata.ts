interface ISiteMetadataResult {
  siteTitle: string;
  siteUrl: string;
  description: string;
  logo: string;
  navLinks: {
    name: string;
    url: string;
  }[];
}

const getBasePath = () => {
  const baseUrl = import.meta.env.BASE_URL;
  return baseUrl === '/' ? '' : baseUrl;
};

const data: ISiteMetadataResult = {
  siteTitle: "ganxin's Running Page",
  siteUrl: 'https://hation.github.io/running_page',
  logo: 'https://avatars.githubusercontent.com/u/你的GitHub用户ID?v=4',
  description: 'Personal running data visualization and tracking',
  navLinks: [
    {
      name: 'Summary',
      url: `${getBasePath()}/summary`,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/hation',
    },
    {
      name: 'About',
      url: 'https://github.com/hation/running_page',
    },
  ],
};

export default data;
