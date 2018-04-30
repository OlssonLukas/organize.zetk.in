import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import PaneBase from './PaneBase';
import SurveyForm from '../forms/SurveyForm';
import Button from '../misc/Button';
import DeleteButton from '../misc/DeleteButton';
import LoadingIndicator from '../misc/LoadingIndicator';
import { getListItemById } from '../../utils/store';
import { deleteSurvey, retrieveSurvey, updateSurvey }
    from '../../actions/survey';

const mapStateToProps = (state, props) => ({
    surveyItem: getListItemById(
        state.surveys.surveyList,
        props.paneData.params[0]),
});

@connect(mapStateToProps)
@injectIntl
export default class EditSurveyPane extends PaneBase {
    componentDidMount() {
        super.componentDidMount();

        let surveyId = this.getParam(0);
        this.props.dispatch(retrieveSurvey(surveyId));
    }

    getPaneTitle(data) {
        const formatMessage = this.props.intl.formatMessage;
        const { surveyItem } = this.props;

        if (surveyItem && !surveyItem.isPending) {
            return formatMessage(
                { id: 'panes.editSurvey.title' },
                { title: surveyItem.data.title });
        }
        else {
            return null;
        }
    }

    renderPaneContent(data) {
        const { surveyItem } = this.props;
        if (surveyItem && !surveyItem.isPending) {
            const survey = surveyItem.data;
            return [
                <SurveyForm key="form" ref="form"
                    survey={ survey }
                    onSubmit={ this.onSubmit.bind(this) }/>,
                <DeleteButton key="deleteButton"
                    onClick={ this.onDeleteClick.bind(this) }/>,
            ];
        }
        else {
            return <LoadingIndicator />;
        }
    }

    renderPaneFooter(data) {
        return (
            <Button className="EditSurveyPane-saveButton"
                labelMsg="panes.editSurvey.saveButton"
                onClick={ this.onSubmit.bind(this) }/>
        );
    }

    onSubmit(ev) {
        ev.preventDefault();

        let surveyId = this.getParam(0);
        let values = this.refs.form.getChangedValues();

        this.props.dispatch(updateSurvey(surveyId, values));
        this.closePane();
    }

    onDeleteClick() {
        let surveyId = this.getParam(0);

        this.props.dispatch(deleteSurvey(surveyId));
    }
}
