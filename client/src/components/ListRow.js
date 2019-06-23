import React from 'react';
import { convertTimes } from '../helpers';

class ListRow extends React.Component {
	render() {
        const {
			ArtsVisionFork: { SessionName, SessionDate, StartTime, EndTime, EventID, SessionLocation }
        } = this.props.data;
        let type = this.props.type;
        if (type === 'location') {
            return (
                <tr>
                    <td>{EventID}</td>
                    <td>{SessionDate}</td>
                    <td>{SessionName}</td>
                    <td>
                        {convertTimes(StartTime)} - {convertTimes(EndTime)}
                    </td>
                </tr>
            );
        } else if (type === 'date') {
            return (
                <tr>
                    <td>{EventID}</td>
                    <td>{SessionLocation}</td>
                    <td>{SessionName}</td>
                    <td>{convertTimes(StartTime)} - {convertTimes(EndTime)}</td>
                </tr>
            )
        } else if (type === 'type') {
            return (
                <tr>
                    <td>{SessionDate}</td>
                    <td>{EventID}</td>
                    <td>{SessionLocation}</td>
                    <td>{SessionName}</td>
                    <td>{convertTimes(StartTime)} - {convertTimes(EndTime)}</td>
                </tr>
            )
        }
    }
}

export default ListRow;
