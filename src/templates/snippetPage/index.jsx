import React from 'react';
import { connect } from 'react-redux';
import SnippetCard from 'organisms/snippetCard';
import { LinkBackAnchor } from 'atoms/anchor';
import Meta from 'atoms/meta';
import { Snippet as SnippetPropType } from 'typedefs';
import PropTypes from 'prop-types';
import Shell from 'organisms/shell';
import RecommendationList from 'organisms/recommendationList';
import _ from 'lang';
const _l = _('en');

// Used to produce a description
const templateData = {
  pageType: 'snippet',
};

const SnippetPage = ({
  pageContext: {
    snippet,
    logoSrc,
    splashLogoSrc,
    cardTemplate,
    recommendedSnippets,
  },
  lastPageTitle,
  lastPageUrl,
}) => {
  return (
    <>
      <Meta
        title={ snippet.title }
        description={ _l`site.pageDescription${{...templateData, snippetName: snippet.title, snippetLanguage: snippet.language.long }}` }
        logoSrc={ splashLogoSrc }
      />
      <Shell
        logoSrc={ logoSrc }
        isSearch={ false }
        isListing={ false }
        externalUrl={ snippet.url }
      >
        <LinkBackAnchor
          link={ {
            url: lastPageUrl,
            internal: true,
          } }
        >
          { _l`Back to${lastPageTitle}` }
        </LinkBackAnchor>
        <SnippetCard
          cardTemplate={ cardTemplate }
          snippet={ snippet }
          toastContainer='toast-container'
        />
        <RecommendationList snippetList={ recommendedSnippets } />
        <div id="toast-container"/>
      </Shell>
    </>
  )
  ;
};

SnippetPage.propTypes = {
  /** pageContext is passed from Gatsby to the page */
  pageContext: PropTypes.shape({
    /** Snippet data for the card */
    snippet: SnippetPropType.isRequired,
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
    /** URI for the splash logo image */
    splashLogoSrc: PropTypes.string.isRequired,
    /** Card template for the snippet card of this page */
    cardTemplate: PropTypes.string,
    /** List of recommended snippets */
    recommendedSnippets: PropTypes.arrayOf(SnippetPropType),
  }),
  /** Title of the last page */
  lastPageTitle: PropTypes.string.isRequired,
  /** URL of the last page */
  lastPageUrl: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    lastPageTitle: state.navigation.lastPageTitle,
    lastPageUrl: state.navigation.lastPageUrl,
  }),
  null
)(SnippetPage);
