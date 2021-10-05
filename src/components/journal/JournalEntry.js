import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {
    const dispatch = useDispatch();
    const noteDate = moment(date);

    const handleEntryClick = () => {
        dispatch(activeNote(id, {
            title,
            body,
            url,
            date,
        }));
    }

    return (
        <div
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick={ handleEntryClick }
        >
            {
                url &&
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundImage: `url(${ url })`,
                        backgroundSize: 'cover'
                    }}
                >
                </div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title">{ title }</p>
                <p className="journal__entry-content">{ body }</p>
            </div>
            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('Do') }</h4>
            </div>
        </div>
    )
}
