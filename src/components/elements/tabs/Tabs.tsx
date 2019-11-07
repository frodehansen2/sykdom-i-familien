import React, { useState } from 'react';
import bemUtils from '../../../utils/bemUtils';
import TabButton from './tab-button/TabButton';
import TabPanel from './tab-panel/TabPanel';

import './tabs.less';
import Select from './select/Select';
import { Undertittel } from 'nav-frontend-typografi';

export interface Tab {
    index: number;
    label: string;
    illustration?: React.ReactNode;
    content: string | string[];
}

export interface TabsProps {
    title?: string;
    tabs: Tab[];
    presentation: 'tabs' | 'dropdown';
}

const bem = bemUtils('tabs');

const Tabs: React.FunctionComponent<TabsProps> = ({ tabs, presentation, title }: TabsProps) => {
    const [selectedTab, selectTab] = useState({ index: 0 });

    return (
        <div className={bem.block}>
            {presentation === 'tabs' ? (
                <div role="tablist" className={bem.element('tabs')}>
                    {tabs.map((tab) => (
                        <TabButton
                            key={tab.index}
                            label={tab.label}
                            icon={tab.illustration}
                            onSelect={() => selectTab({ index: tab.index })}
                            isSelected={selectedTab.index === tab.index}
                        />
                    ))}
                </div>
            ) : (
                <div className={bem.modifier('tabsSelect')}>
                    {title && (
                        <Undertittel tag="h3" className={bem.element('title')}>
                            {title}
                        </Undertittel>
                    )}
                    <Select
                        choices={tabs}
                        onChoiceSelect={(index) => selectTab({ index })}
                        selected={tabs[selectedTab.index]}
                    />
                </div>
            )}
            {tabs.map((tab) => (
                <TabPanel key={tab.index} tab={tab} selected={tab.index === selectedTab.index} />
            ))}
        </div>
    );
};

export default Tabs;
