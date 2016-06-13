import React from 'react';
import cx from 'classnames';

import { componentClassNames } from '../..';
import DraggableAvatar from '../DraggableAvatar';


export default class PeopleListItem extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.person !== this.props.person
            || nextProps.onSelect !== this.props.onSelect);
    }

    render() {
        const person = this.props.person;

        var mailLink = null;
        if (person.email) {
            const mailto = 'mailto:' + person.email;
            mailLink = <a href={ mailto }>{ person.email }</a>;
        }

        return (
            <li className={ cx(componentClassNames(this)) }
                onClick={ this.props.onSelect }>

                <DraggableAvatar person={ person }/>
                <div className="PeopleListItem-col">
                    <span className="PeopleListItem-firstName">
                        { person.first_name }</span>
                    <span className="PeopleListItem-lastName">
                        { person.last_name }</span>
                </div>
                <div className="PeopleListItem-col">
                    <span className="PeopleListItem-email">
                        { mailLink }</span>
                    <span className="PeopleListItem-phone">
                        { person.phone }</span>
                </div>
            </li>
        );
    }
}

PeopleListItem.propTypes = {
    onSelect: React.PropTypes.func,
    person: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        first_name: React.PropTypes.string.isRequired,
        last_name: React.PropTypes.string.isRequired,
        email: React.PropTypes.string,
        phone: React.PropTypes.string
    }).isRequired
};