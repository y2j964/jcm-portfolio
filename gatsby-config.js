module.exports = {
  siteMetadata: {
    title: `Justin Mooney`,
    author: {
      name: `Justin Mooney`,
      summary: `software engineer with a concentration in Javascript. He is currently looking for work.`,
      github: `https://github.com/y2j964`,
      linkedIn: `https://www.linkedin.com/in/justin-mooney-306683111/`,
    },
    description: `Justin Mooney is a software developer who specializes in frontend development and all things JavaScript`,
    siteUrl: `https://sleepy-villani-cf0ac0.netlify.app`,
    googleSiteVerification: `-R2Ca8vugorOBuTJ9zlAVzRKjpPTcLK3DSKpZW2OyBE`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/data`,
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: 'Montserrat',
              variants: ['300', '400'],
              fontDisplay: 'block',
            },
          ],
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-plugin-postcss`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
    },

    {
      resolve: `gatsby-plugin-sitemap`,
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Justin Mooney Portfolio`,
        short_name: `JCM Portfolio`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ff759b`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
