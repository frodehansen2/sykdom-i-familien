import React from 'react';
import ReactDOM from 'react-dom';
import Panel from 'nav-frontend-paneler';
import Chevron from 'nav-frontend-chevron';
import classnames from 'classnames';
import bemUtils from '../../../../utils/bemUtils';
import { Tab } from '../Tabs';
import './select.less';
import { guid } from 'nav-frontend-js-utils';

const bem = bemUtils('select');

interface OwnProps {
    selected: Tab;
    onChoiceSelect: (choice: number) => void;
    choices: Tab[];
    panelBkg: string;
}

type SelectProps = OwnProps;

interface SelectState {
    open: boolean;
}

class Select extends React.Component<SelectProps, SelectState> {
    buttonId: string;
    menuId: string;
    mounted: boolean;
    selectRef: React.RefObject<HTMLDivElement>;

    constructor(props: SelectProps) {
        super(props);
        this.buttonId = guid();
        this.menuId = `${this.buttonId}_menu`;

        this.state = {
            open: false
        };
    }

    componentDidMount = () => {
        this.mounted = true;
        this.selectRef = React.createRef<HTMLDivElement>();

        document.addEventListener('keydown', this.handleKeyPressEvent, { passive: true });
        document.addEventListener('click', this.handleDocumentClick, { passive: true });
    };

    componentWillUnmount = () => {
        this.mounted = false;

        document.removeEventListener('keydown', this.handleKeyPressEvent);
        document.removeEventListener('click', this.handleDocumentClick);
    };

    focusOnSelf = () => {
        const node = this.selectRef && this.selectRef.current ? this.selectRef.current : undefined;
        if (node) {
            node.focus();
        }
    };

    closePopup = () => {
        this.setState({
            open: false
        });
    };

    handleKeyPressEvent = (e: KeyboardEvent) => {
        if (e.keyCode === 27) {
            this.closePopup();
        }
    };

    handleDocumentClick = (e: MouseEvent) => {
        if (this.mounted) {
            const node = ReactDOM.findDOMNode(this);
            if (node && !node.contains(e.target as HTMLElement)) {
                this.closePopup();
            }
        }
    };

    onChoiceClick = (index: number) => {
        this.focusOnSelf();
        this.closePopup();
        this.props.onChoiceSelect(index);
    };

    onClick = () => {
        this.setState({
            open: !this.state.open
        });
    };

    render = () => (
        <div className={'tabs__select'} key="select">
            <div style={{ position: 'relative' }}>
                <div
                    id={this.buttonId}
                    role="button"
                    aria-haspopup={true}
                    aria-controls={this.menuId}
                    aria-expanded={this.state.open}
                    tabIndex={0}
                    ref={this.selectRef}
                    onClick={this.onClick}
                    onKeyPress={this.onClick}
                    className={classnames(bem.block, {
                        [bem.modifier('open')]: this.state.open
                    })}>
                    <div className={bem.element('selected')}>
                        {this.props.selected.illustration && (
                            <div className={bem.element('selectedIcon')}>{this.props.selected.illustration}</div>
                        )}

                        {this.props.selected.label}
                    </div>
                    <Chevron type={this.state.open ? 'opp' : 'ned'} />
                </div>
                <div className={bem.element('arrowSelector')} style={{ backgroundColor: this.props.panelBkg }} />
                <div
                    role="menu"
                    id={this.menuId}
                    className={this.state.open ? bem.element('popUp', 'open') : bem.element('popUp')}
                    aria-labelledby={this.buttonId}>
                    <div className={bem.element('shadow')}>
                        {this.props.choices.map((choice, index) => (
                            <Panel
                                role="menuitem"
                                key={choice.label}
                                border={true}
                                onClick={() => {
                                    this.onChoiceClick(index);
                                }}
                                onKeyPress={() => {
                                    this.onChoiceClick(index);
                                }}
                                className={classnames(bem.element('choice'), {
                                    [bem.element('choice', 'selected')]: this.props.selected.label === choice.label
                                })}
                                tabIndex={0}>
                                {choice.label}
                            </Panel>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Select;
