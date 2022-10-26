import React from 'react';

import { Link } from 'react-router-dom';

import { Episode } from '../../../../../../models/episode';
import { formatDate, millisToTime } from '../../../../../../utils/date';

export interface EpisodesTableProps {
  episodes: Episode[];
}

export function EpisodesTable({ episodes }: EpisodesTableProps) {
  return (
    <table className="episodes-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        {episodes.map((episode) => (
          <tr key={episode.id}>
            <td>
              <Link to={`episode/${episode.id}`}>{episode.title}</Link>
            </td>
            <td>{formatDate(new Date(episode.date))}</td>
            <td className="duration">{millisToTime(episode.duration)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
