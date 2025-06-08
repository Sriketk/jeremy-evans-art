export interface HomePageContent {
  homePageImages: {
    fields: {
      title: string;
      artDescription: string;
      image: {
        fields: {
          file: {
            url: string;
          };
        };
      };
      year: string;
      category: string;
      slug: string;
      about: string;
    };
  }[];
}

export interface Artwork {
  title: string;
  description: string;
  image: string;
  year: string;
  category: string;
  slug: string;
  about: string;
}



