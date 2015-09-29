'use strict';

import React from 'react';
import find from 'lodash/collection/find';
import get from 'lodash/object/get';
import ModuleRenderer from '../_lib/module-renderer';
import getFeaturedImage from '../_lib/get-featured-image';
import getScrollTrackerMixin from '../_lib/get-scroll-tracker-mixin';

import WorkItem from '../components/work-item';
import Hero from '../components/hero';

const PageWhatWeDo = React.createClass({
  mixins: [getScrollTrackerMixin('what-we-do')],
  render() {
    const { page: pageData } = this.props;
    const caseStudiesModule = find(get(pageData, 'page_builder', []), 'name', 'case_studies');
    const image = getFeaturedImage(pageData);

    return (
      <article className="page-work">
        <Hero title={get(pageData, 'display_title')} sizes={get(image, 'media_details.sizes')} eventLabel='what-we-do' showDownChevron={true} />
        {get(pageData, 'page_builder', []).map(this.getModuleRenderer(get(pageData, 'colors')))}
        <ul className="page-work__list">
          {get(caseStudiesModule, 'attr.case_studies.value', '').split(',').map(caseStudyName => {
            const caseStudyData = find(get(pageData, '_embedded.ustwo:case_studies', []), 'slug', caseStudyName);
            return <WorkItem key={caseStudyName} className="page-work__list__item" data={caseStudyData} attachments={get(pageData, '_embedded.wp:attachment', [])} />;
          })}
        </ul>
      </article>
    );
  },
  getModuleRenderer(colours) {
    return (moduleData) => {
      return ModuleRenderer(moduleData, colours, () => true);
    };
  }
});

export default PageWhatWeDo;
