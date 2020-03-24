import React from 'react';

import Avatar from '../../misc/Avatar';


export default class ImportLogListItem extends React.Component {
    static propTypes = {
        data: React.PropTypes.shape({
            id: React.PropTypes.number.required,
            accepted: React.PropTypes.string.required,
            completed: React.PropTypes.bool,
            status: React.PropTypes.string.required,
            imported_by: React.PropTypes.Object,
            error: React.PropTypes.string,
            report: React.PropTypes.Object,
        })
    }

    render() {
        let log = this.props.data;

        return (
            <div className="ImportListItem"
                onClick={ this.props.onItemClick }>

                <Avatar person={ log.imported_by }/>
                <div className="ImportLogListItem-col">
                    <span className="ImportLogListItem-status">
                        { log.status }</span>
                    <span className="PersonListItem-accepted">
                        { log.accepted }</span>
                    <span className="PersonListItem-email">
                        { log.completed }</span>
                </div>
            </div>
        );
    }
}

