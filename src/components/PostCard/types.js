import PropTypes from "prop-types"

const fieldsInterface = {
  slug: PropTypes.string.isRequired,
}

const frontMatterInterface = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string,
}

const postInterface = {
  excerpt: PropTypes.string.isRequired,
  frontmatter: PropTypes.shape(frontMatterInterface),
  fields: PropTypes.shape(fieldsInterface),
}

const postCardInterface = {
  ...frontMatterInterface,
  ...fieldsInterface,
}

export { postInterface, postCardInterface }
