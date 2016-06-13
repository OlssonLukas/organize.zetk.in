import React from 'react';
import cx from 'classnames';

import { componentClassNames } from '../..';
import PeopleListItem from './PeopleListItem';
import ListHeader from '../list/ListHeader';


export default class PeopleList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortField: undefined
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.people !== this.props.people
            || nextState.sortField !== this.state.sortField);
    }

    render() {
        const sortField = this.state.sortField;

        const columns = [
            {
                'first_name': 'First name',
                'last_name': 'Last name',
            },
            {
                'email': 'E-mail address',
                'phone': 'Phone number',
            }
        ];

        var people = this.props.people;

        if (sortField) {
            people = people.concat().sort(function(p0, p1) {
                if (p0[sortField] < p1[sortField]) return -1;
                if (p0[sortField] > p1[sortField]) return 1;
                return 0;
            });
        }

        return (
            <div className={ cx(componentClassNames(this)) }>
                <ListHeader columns={ columns } sortField={ sortField }
                    onFieldClick={ this.onFieldClick.bind(this) }/>
                <ul className="PeopleList-items">
                    {people.map(function(personItem) {
                        let data = personItem.data;
                        let key = data.id;
                        return <PeopleListItem key={ key } person={ data }
                            onSelect={ this.onSelect.bind(this, data) }/>;
                    }, this)}
                </ul>
            </div>
        );
    }

    onSelect(personData) {
        if (this.props.onSelect) {
            this.props.onSelect(personData);
        }
    }

    onFieldClick(field) {
        if (field == this.state.sortField) {
            // Click the same twice? Reset
            field = undefined;
        }

        this.setState({
            sortField: field
        });
    }
}

PeopleList.propTypes = {
    people: React.PropTypes.array.isRequired
}