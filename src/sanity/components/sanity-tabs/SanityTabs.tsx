import React from 'react';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Locale } from '../../../i18n/locale';
import { getLocale } from '../../../utils/inltUtils';
import InlineSVG from '../../../components/elements/inline-svg/InlineSVG';
import Tabs, { TabsProps, PresentationMode } from '../../../components/elements/tabs/Tabs';
import { TabsObject } from '../../types/objects';
import { getOptionalLocaleString, getLocaleString } from '../../utils';
import { SanityContentHeadingLevel } from '../../types';

interface Props {
    tabs: TabsObject;
    headingLevel: SanityContentHeadingLevel;
}

export const extractTabsData = (
    tabs: TabsObject,
    headingLevel: SanityContentHeadingLevel,
    locale: Locale
): TabsProps => {
    const { title, presentation } = tabs;
    const tabsData: TabsProps = {
        presentation: presentation === 'dropdown' ? PresentationMode.dropdown : PresentationMode.tabs,
        title: getOptionalLocaleString(title),
        bgcolor: tabs.bgcolor,
        headingLevel,
        tabs: tabs.content.map((tab, index: number) => ({
            index,
            label: getLocaleString(tab.title, locale),
            illustration:
                tab.tabIllustration && tab.tabIllustration.svg ? (
                    <InlineSVG illustration={tab.tabIllustration.svg} width="3.5rem" />
                ) : (
                    undefined
                ),
            contentTitle: tab.contentTitle ? getLocaleString(tab.contentTitle, locale) : undefined,
            content: tab.content
        }))
    };
    return tabsData;
};

const SanityTabs: React.FunctionComponent<Props & InjectedIntlProps> = ({ tabs, headingLevel, intl }) => {
    const tabsData = extractTabsData(tabs, headingLevel, getLocale(intl));
    return <Tabs {...tabsData} />;
};

export default injectIntl(SanityTabs);
