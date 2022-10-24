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
}

export interface PodcastsDTO {
  feed: {
    entry: PodcastDTO[];
  };
}
