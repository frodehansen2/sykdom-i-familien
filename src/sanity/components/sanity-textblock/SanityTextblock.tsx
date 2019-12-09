import React from 'react';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Undertittel } from 'nav-frontend-typografi';
import SanityBlock from '../sanity-block/SanityBlock';
import { getOptionalLocaleString, getLocaleBlockContent, getHeadingTag } from '../../utils';
import { TextblockObject } from '../../types/objects';
import bemUtils from '../../../utils/bemUtils';
import CheckBullet from './assets/CheckBullet';
import { SanityContentHeadingLevel } from '../../types';

import './sanityTextblock.less';

interface Props {
    textblock: TextblockObject;
    headingLevel: SanityContentHeadingLevel;
}

const bem = bemUtils('textblock');

const SanityTextblock: React.FunctionComponent<Props & InjectedIntlProps> = ({ textblock, headingLevel, intl }) => {
    const title = getOptionalLocaleString(textblock.title, intl.locale);
    const content = getLocaleBlockContent(textblock.content, intl.locale);

    return (
        <div
            className={bem.classNames(
                bem.block,
                bem.modifierConditional(textblock.layout, textblock.layout !== undefined)
            )}>
            {textblock.layout === 'step' && (
                <span className={bem.element('stepBullet')}>
                    <CheckBullet />
                </span>
            )}
            {title && <Undertittel tag={getHeadingTag(headingLevel)}>{title}</Undertittel>}
            <SanityBlock content={content} />
        </div>
    );
};

export default injectIntl(SanityTextblock);
