import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import SEO from '../components/seo';

const About = ({ data, location }) => {
  const author = data.site.siteMetadata.author.name;
  const pageDescription = `Background information about ${author}`;

  return (
    <Layout title="About Me">
      <SEO title="About Me" description={pageDescription} location={location} />
      <section className="container">
        <h2 className="section-title mb-8">Who Am I?</h2>
        <p className="mb-8">
          Do you still feel like you don&#39;t know me? I feel like you really
          ought to know me by now. Or maybe not. You don&#39;t live in my head.
          Maybe you could never know me. Maybe we can never know anyone.
        </p>
        <p className="mb-8">But I suppose we must try.</p>
        <p className="mb-8">
          So you know I&#39;m software engineer, and you know I&#39;m a frontend
          specialist. But I didn&#39;t always used to be those things.
        </p>
        <p className="mb-8">
          I went to college for Accounting, Bachelor’s of Science. I like
          numbers, you know? But beyond the mathematics of it all, I never
          really had an appreciation for the work of an accountant. I could
          never take pride in that work.
        </p>
        <p className="mb-8">
          What I did take pride in was art. So that’s what I did for a while. I
          was the lead guitarist, songwriter, and producer of a band. We gigged
          locally. We recorded some stuff. I was also simultaneously writing
          articles for two different websites. I wrote television criticism back
          in a time when people marginally cared about television criticism.
        </p>
        <p className="mb-8">
          I dug all of it. I found great joy in creating something from nothing,
          working through what that something is, and molding it to it’s lean
          essence. That work rewired my brain. I learned to stop thinking, “Can
          we do this?”, and start thinking, “What would happen if we do this?”
        </p>
        <p className="mb-8">
          But Van Gogh never made any money and neither did I. Self-promotion
          never didn’t feel odious to me. And at a certain point you either lop
          your ear off or your reorient yourself to the world.
        </p>
        <p className="mb-8">
          When I began teaching myself to code at the dawn of 2018, I thought
          coding would be a neat thing to learn, as it seemed to be the perfect
          vertex of my artistic work and my collegiate work. And it was
          extremely gratifying working through textbooks, blog posts, and
          youtube videos. But when I discovered frontend engineering, things
          really blossomed. I began forging my own path, learning by building
          the things that I was passionate about.
        </p>
        <p className="mb-8">
          And that&#39;s what I&#39;ve been doing. And that&#39;s what I am
          doing. And now the words stop.
        </p>
      </section>
    </Layout>
  );
};

About.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default About;

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        author {
          name
        }
      }
    }
  }
`;
