import React from 'react';
import cx from 'classnames';

import List from './List';
import SurveySubmissionListItem from './items/SurveySubmissionListItem';


export default class SurveySubmissionList extends React.Component {
    static propTypes = {
        enablePagination: React.PropTypes.bool,
        onItemClick: React.PropTypes.func,
        onLoadPage: React.PropTypes.func,
        submissionList: React.PropTypes.shape({
            error: React.PropTypes.object,
            isPending: React.PropTypes.bool,
            items: React.PropTypes.array,
        }).isRequired,
    }

    render() {
        let columns = [
            {
                'submitted':
                    'lists.surveySubmissionList.header.time',
            },
            {
                'first_name':
                    'lists.surveySubmissionList.header.respondent',
                'survey.title':
                    'lists.surveySubmissionList.header.survey',
            },
            {
                'is_connected':
                    'lists.surveySubmissionList.header.connected'
            }
        ];

        return (
            <List className="SurveySubmissionList"
                enablePagination={ this.props.enablePagination }
                headerColumns={ columns }
                itemComponent={ SurveySubmissionListItem }
                list={ this.props.submissionList }
                onItemClick={ this.props.onItemClick }
                onLoadPage={ this.props.onLoadPage }
                />
        );
    }
}
