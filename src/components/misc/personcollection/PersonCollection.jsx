import cx from 'classnames';
import React from 'react';
import { DropTarget } from 'react-dnd';
import { FormattedMessage as Msg } from 'react-intl';

import Link from '../Link';
import PersonCollectionItem from './PersonCollectionItem';
import PersonSelectWidget from '../PersonSelectWidget';
import { createSelection } from '../../../actions/selection';


const personTarget = {
    canDrop(props, monitor) {
        let person = monitor.getItem();
        let persons = props.items;
        let duplicate = persons.find(p => (p.id == person.id));

        // Only allow drops if it wouldn't result in duplicate
        return (duplicate === undefined);
    },

    drop(props) {
        return {
            targetType: 'person',
            onDropPerson: p => props.onAdd([ p.id ])
        };
    }
};

function collectPerson(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isPersonOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}


@DropTarget('person', personTarget, collectPerson)
export default class PersonCollection extends React.Component {
    static propTypes = {
        items: React.PropTypes.array.isRequired,
        itemComponent: React.PropTypes.func.isRequired,
        showEditButtons: React.PropTypes.bool,
        showRemoveButtons: React.PropTypes.bool,
        addPersonMsg: React.PropTypes.string,
        selectLinkMsg: React.PropTypes.string,
        dispatch: React.PropTypes.func,
        openPane: React.PropTypes.func,
        onSelect: React.PropTypes.func,
        onRemove: React.PropTypes.func,
        onAdd: React.PropTypes.func,
    };

    static defaultProps = {
        showEditButtons: true,
        showRemoveButtons: true,
    };

    render() {
        let addItem;

        if (this.props.addPersonMsg) {
            // Change key when person count changes, to force the
            // component to be reset when a new person is added
            const key = 'addPerson' + (this.props.items.length + 1);
            addItem = (
                    <PersonSelectWidget person={ null } key={ key }
                        onSelect={ this.onParticipantAdd.bind(this) }/>
            );
        }

        let classes = cx('PersonCollection', {
            'PersonCollection-isPersonOver': this.props.isPersonOver,
        });

        return (
            <ul className={ classes }>
                { addItem }
            { this.props.items.map(i => (
                <li key={ i.id } className="PersonCollection-item">
                    <PersonCollectionItem item={ i }
                        itemComponent={ this.props.itemComponent }
                        showEditButton={ this.props.showEditButtons }
                        showRemoveButton={ this.props.showRemoveButtons }
                        onSelect={ this.onSelect.bind(this, i) }
                        onRemove={ this.onRemove.bind(this, i) }/>
                </li>
            )) }
            </ul>
        );
    }

    onSelect(item) {
        if (this.props.onSelect) {
            this.props.onSelect(item);
        }
    }

    onRemove(item) {
        if (this.props.onRemove) {
            this.props.onRemove(item);
        }
    }

    onParticipantAdd(person) {
        if (this.props.onAdd) {
            this.props.onAdd([person.id]);
        }
    }

    onClickAddPersons(ev) {
        // TODO: Externalize instructions
        // TODO: Add existing people as pre-selection
        let action = createSelection('person', null, null, ids =>
            this.props.onAdd(ids));

        this.props.dispatch(action);
        this.props.openPane('selectpeople', action.payload.id);
    }
}
