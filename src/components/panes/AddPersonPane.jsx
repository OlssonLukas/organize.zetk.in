import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import PaneBase from './PaneBase';
import PersonForm from '../forms/PersonForm';
import Button from '../misc/Button';
import { createPerson } from '../../actions/person';


@connect(state => state)
@injectIntl
export default class AddPersonPane extends PaneBase {
    getPaneTitle(data) {
        return this.props.intl.formatMessage({ id: 'panes.addPerson.title' });
    }

    renderPaneContent(data) {
        const initialData = {
            first_name: this.getParam(0),
            last_name: this.getParam(1),
            email: this.getParam(2),
        };

        return (
            <PersonForm ref="personForm" person={ initialData }
                onSubmit={ this.onSubmit.bind(this) }/>
        );
    }

    renderPaneFooter(data) {
        return (
            <Button className="AddPersonPane-saveButton"
                labelMsg="panes.addPerson.saveButton"
                onClick={ this.onSubmit.bind(this) }/>
        );
    }

    onSubmit(ev) {
        ev.preventDefault();

        var form = this.refs.personForm;
        var values = form.getValues();

        this.props.dispatch(createPerson(values, this.props.paneData.id));
    }
}
