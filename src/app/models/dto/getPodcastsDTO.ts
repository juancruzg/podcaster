export interface PodcastDTO {
  'im:image': [
    {
      label: string;
      attributes: {
        height: string;
      };
    },
  ];
  title: {
    label: string;
  };
  'im:artist': {
    label: string;
  };
  id: {
    attributes: {
      'im:id': string;
    };
  };
}

export interface PodcastsDTO {
  feed: {
    entry: PodcastDTO[];
  };
}
